/*
  # Update enterprises table RLS policies

  1. Changes
    - Drop all existing policies
    - Create new policies for:
      - Public read access
      - Authenticated user creation
      - Admin-only updates
      - Admin-only deletes
  
  2. Security
    - Enables row level security
    - Restricts updates and deletes to admin users
    - Allows all authenticated users to create enterprises
    - Allows public read access
*/

-- First ensure RLS is enabled
ALTER TABLE enterprises ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can create enterprises" ON enterprises;
DROP POLICY IF EXISTS "Users can update their own enterprises" ON enterprises;
DROP POLICY IF EXISTS "Users can delete their own enterprises" ON enterprises;
DROP POLICY IF EXISTS "Allow public read access" ON enterprises;
DROP POLICY IF EXISTS "Allow authenticated insert to enterprises" ON enterprises;
DROP POLICY IF EXISTS "Admins can update enterprises" ON enterprises;
DROP POLICY IF EXISTS "Admins can delete enterprises" ON enterprises;

-- Create new policies

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON enterprises
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to create enterprises
CREATE POLICY "Allow authenticated insert to enterprises"
  ON enterprises
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow admin users to update enterprises
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

-- Allow admin users to delete enterprises
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