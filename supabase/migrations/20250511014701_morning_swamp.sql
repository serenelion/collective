/*
  # Update enterprises table RLS policies

  1. Changes
    - Enable RLS on enterprises table
    - Add policies for authenticated users to:
      - Create new enterprises
      - Read all enterprises
      - Update their own enterprises (if they are admins)
      - Delete their own enterprises (if they are admins)
  
  2. Security
    - Enables row level security
    - Restricts updates and deletes to admin users
    - Allows all authenticated users to create enterprises
    - Allows public read access
*/

-- First ensure RLS is enabled
ALTER TABLE enterprises ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow authenticated insert to enterprises" ON enterprises;
  DROP POLICY IF EXISTS "Users can create enterprises" ON enterprises;
  DROP POLICY IF EXISTS "Users can update their own enterprises" ON enterprises;
  DROP POLICY IF EXISTS "Users can delete their own enterprises" ON enterprises;
  DROP POLICY IF EXISTS "Allow public read access" ON enterprises;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create new INSERT policy that allows any authenticated user to create enterprises
CREATE POLICY "Users can create enterprises"
  ON enterprises
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add SELECT policy for public read access
CREATE POLICY "Allow public read access"
  ON enterprises
  FOR SELECT
  TO public
  USING (true);

-- Add UPDATE policy for admin users
CREATE POLICY "Admins can update enterprises"
  ON enterprises
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM profiles 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM profiles 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

-- Add DELETE policy for admin users
CREATE POLICY "Admins can delete enterprises"
  ON enterprises
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM profiles 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );