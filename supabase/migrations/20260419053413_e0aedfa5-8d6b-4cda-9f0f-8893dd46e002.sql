
-- ============================================
-- 1. USER ROLES SYSTEM (separate table)
-- ============================================
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Policies on user_roles
DROP POLICY IF EXISTS "Users view own roles" ON public.user_roles;
CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins manage roles" ON public.user_roles;
CREATE POLICY "Only admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update is_admin_user() to use the new table
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.has_role(auth.uid(), 'admin');
END;
$$;

-- ============================================
-- 2. PROFILES TABLE - prevent privilege escalation
-- ============================================
DROP POLICY IF EXISTS "Allow users to insert new profiles" ON public.profiles;
CREATE POLICY "Users insert own profile only" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid() AND role = 'user');

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users update own profile no role change" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
  );

DROP POLICY IF EXISTS "Allow read own profile" ON public.profiles;
CREATE POLICY "Read own or admin reads all" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin_user());

-- ============================================
-- 3. MAINTENANCE REQUESTS - PII protection
-- ============================================
DROP POLICY IF EXISTS "Allow public select" ON public.maintenance_requests;
DROP POLICY IF EXISTS "Allow public select on maintenance_requests" ON public.maintenance_requests;
DROP POLICY IF EXISTS "allow_select_for_anon" ON public.maintenance_requests;
DROP POLICY IF EXISTS "Allow authenticated users to update maintenance requests" ON public.maintenance_requests;
DROP POLICY IF EXISTS "maintenance_requests_update_owner" ON public.maintenance_requests;
DROP POLICY IF EXISTS "maintenance_requests_insert" ON public.maintenance_requests;

-- Anyone (incl. anonymous) can CREATE a request (public form)
CREATE POLICY "Anyone can create requests" ON public.maintenance_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only owner or admin can READ (PII protection)
CREATE POLICY "Owner or admin can read" ON public.maintenance_requests
  FOR SELECT TO authenticated
  USING (created_by = auth.uid() OR public.is_admin_user());

-- Only admin can UPDATE status
CREATE POLICY "Only admin can update" ON public.maintenance_requests
  FOR UPDATE TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- ============================================
-- 4. AI_KEYS - lock down completely
-- ============================================
DROP POLICY IF EXISTS "Enable read access for all user" ON public.ai_keys;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.ai_keys;

CREATE POLICY "Only admins read ai_keys" ON public.ai_keys
  FOR SELECT TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Only admins manage ai_keys" ON public.ai_keys
  FOR ALL TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- ============================================
-- 5. ACTIVITY_LOG - remove always-true
-- ============================================
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activity_log;
-- Keep "Users can view activity log" (auth required)

-- ============================================
-- 6. BACKUP TABLE - enable RLS
-- ============================================
ALTER TABLE public.material_prices_backup_20251202 ENABLE ROW LEVEL SECURITY;
-- "deny_all" policy already exists; ensure admin can read for restore
DROP POLICY IF EXISTS "Admin reads backup" ON public.material_prices_backup_20251202;
CREATE POLICY "Admin reads backup" ON public.material_prices_backup_20251202
  FOR SELECT TO authenticated
  USING (public.is_admin_user());

-- ============================================
-- 7. STORAGE - remove permissive policies
-- ============================================
DROP POLICY IF EXISTS "Allow uploads for all" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Make sensitive buckets private
UPDATE storage.buckets SET public = false WHERE id IN ('invoices', 'project-files');

-- Authenticated users can upload to allowed buckets
CREATE POLICY "Authenticated upload to allowed buckets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id IN ('maintenance-attachments', 'maintenance-requests', 'project-files', 'invoices', 'documents', 'azabstoredots')
    AND auth.uid() IS NOT NULL
  );

-- Public read for image buckets only
CREATE POLICY "Public read maintenance attachments" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'maintenance-attachments');

-- Authenticated read for private buckets
CREATE POLICY "Authenticated read private buckets" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id IN ('project-files', 'invoices', 'documents', 'maintenance-requests', 'azabstoredots'));

-- Owner or admin delete
CREATE POLICY "Owner or admin delete files" ON storage.objects
  FOR DELETE TO authenticated
  USING (owner = auth.uid() OR public.is_admin_user());

-- ============================================
-- 8. Auto-create profile + default 'user' role on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    'user'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 9. Backfill user_roles from existing profiles
-- ============================================
INSERT INTO public.user_roles (user_id, role)
SELECT id, 
  CASE 
    WHEN role = 'admin' THEN 'admin'::public.app_role
    WHEN role = 'moderator' THEN 'moderator'::public.app_role
    ELSE 'user'::public.app_role
  END
FROM public.profiles
WHERE id IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;
