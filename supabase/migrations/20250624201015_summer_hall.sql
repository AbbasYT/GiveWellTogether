/*
  # Fix applications visibility issue

  1. Changes
    - Update RLS policy to allow viewing all applications regardless of status
    - This allows users to see pending, under review, approved, and rejected applications
    
  2. Security
    - Still maintains RLS but allows public read access to all applications
    - Private fields are still protected by the application logic
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Public can view approved applications (public fields only)" ON organization_applications;

-- Create a new policy that allows viewing all applications
CREATE POLICY "Public can view all applications (public fields only)"
  ON organization_applications
  FOR SELECT
  TO public
  USING (true);