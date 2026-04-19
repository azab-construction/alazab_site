
-- Make maintenance-attachments private to prevent listing
UPDATE storage.buckets SET public = false WHERE id = 'maintenance-attachments';

-- Drop the previous public-read policy and replace with authenticated-only
DROP POLICY IF EXISTS "Public read maintenance attachments" ON storage.objects;

CREATE POLICY "Authenticated read maintenance attachments" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'maintenance-attachments');
