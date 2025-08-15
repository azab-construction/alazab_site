-- إصلاح تحذيرات الأمان - إضافة search_path للدوال
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.notify_new_request()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    PERFORM pg_notify('new_request', row_to_json(NEW)::text);
    RETURN NEW;
END;
$function$;

-- إضافة فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_created_by ON maintenance_requests(created_by);
CREATE INDEX IF NOT EXISTS idx_maintenance_requests_status ON maintenance_requests(status);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- تحسين سياسات RLS للأداء
DROP POLICY IF EXISTS "Allow admin to read maintenance_works" ON maintenance_works;
CREATE POLICY "Allow admin to read maintenance_works" 
ON maintenance_works FOR SELECT 
USING (is_admin_user());

-- إضافة سياسة للمصادقة على تحديث الطلبات
CREATE POLICY "Allow authenticated users to update maintenance requests" 
ON maintenance_requests FOR UPDATE 
USING (auth.uid() IS NOT NULL);