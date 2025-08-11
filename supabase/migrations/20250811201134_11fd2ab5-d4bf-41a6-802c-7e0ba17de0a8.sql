-- تفعيل RLS على جدول users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات RLS لجدول users
CREATE POLICY "Users can view their own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.users 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- إصلاح الدوال بإضافة search_path الآمن
CREATE OR REPLACE FUNCTION public.get_archived_maintenance_dashboard()
RETURNS TABLE(total_requests integer, completed_requests integer, pending_requests integer, high_priority_requests integer, medium_priority_requests integer, low_priority_requests integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
    SELECT 
        COUNT(*) AS total_requests,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_requests,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending_requests,
        COUNT(CASE WHEN priority = 'high' THEN 1 END) AS high_priority_requests,
        COUNT(CASE WHEN priority = 'medium' THEN 1 END) AS medium_priority_requests,
        COUNT(CASE WHEN priority = 'low' THEN 1 END) AS low_priority_requests
    INTO total_requests, completed_requests, pending_requests, high_priority_requests, medium_priority_requests, low_priority_requests
    FROM public.maintenance_requests_archive;
    
    RETURN;
END;
$$;

CREATE OR REPLACE FUNCTION public.check_overdue_tasks()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
    task_record RECORD;
BEGIN
    FOR task_record IN 
        SELECT * FROM public.project_tasks 
        WHERE due_date < NOW() AND status != 'completed' AND status != 'overdue'
    LOOP
        UPDATE public.project_tasks 
        SET status = 'overdue' 
        WHERE id = task_record.id;

        PERFORM create_notification(
            task_record.assigned_to,
            task_record.project_id,
            task_record.id,
            'deadline_overdue',
            'مهمة متأخرة',
            'المهمة "' || task_record.title || '" متأخرة عن موعدها المحدد'
        );
    END LOOP;
END;
$$;