-- ============================================
-- 1. EXPENSES TABLE — restrict public SELECT
-- ============================================
-- Drop any overly-permissive SELECT policies applied to public/anon
DROP POLICY IF EXISTS "Allow public read expenses" ON public.expenses;
DROP POLICY IF EXISTS "Expenses are publicly readable" ON public.expenses;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.expenses;

-- Authenticated users can only read their own expense records
DROP POLICY IF EXISTS "Users read own expenses" ON public.expenses;
CREATE POLICY "Users read own expenses" ON public.expenses
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Users can insert their own expense records
DROP POLICY IF EXISTS "Users insert own expenses" ON public.expenses;
CREATE POLICY "Users insert own expenses" ON public.expenses
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own expense records
DROP POLICY IF EXISTS "Users update own expenses" ON public.expenses;
CREATE POLICY "Users update own expenses" ON public.expenses
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admins can read all expenses
DROP POLICY IF EXISTS "Admins read all expenses" ON public.expenses;
CREATE POLICY "Admins read all expenses" ON public.expenses
  FOR ALL TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- ============================================
-- 2. NOTIFICATION_TEMPLATES — restrict writes to admins
-- ============================================
-- Drop old permissive write policies
DROP POLICY IF EXISTS "Authenticated users can manage notification templates" ON public.notification_templates;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.notification_templates;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.notification_templates;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.notification_templates;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.notification_templates;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.notification_templates;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.notification_templates;

-- All authenticated users can read active templates (needed for sending notifications)
DROP POLICY IF EXISTS "Authenticated read notification templates" ON public.notification_templates;
CREATE POLICY "Authenticated read notification templates" ON public.notification_templates
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Only admins can create, modify, or delete templates
DROP POLICY IF EXISTS "Only admins write notification templates" ON public.notification_templates;
CREATE POLICY "Only admins write notification templates" ON public.notification_templates
  FOR ALL TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- ============================================
-- 3. DOCUMENT_REVIEW_HISTORY — restrict SELECT to reviewer or admin
-- ============================================
DROP POLICY IF EXISTS "Authenticated users can read document review history" ON public.document_review_history;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.document_review_history;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.document_review_history;

-- Only the reviewer who performed the action or an admin can read each row
DROP POLICY IF EXISTS "Reviewer or admin reads history" ON public.document_review_history;
CREATE POLICY "Reviewer or admin reads history" ON public.document_review_history
  FOR SELECT TO authenticated
  USING (reviewer_id = auth.uid() OR public.is_admin_user());
