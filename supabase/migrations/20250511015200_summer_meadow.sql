/*
  # Fix enterprises table RLS policies

  1. Changes
    - Drop existing overly restrictive RLS policies
    - Add new policies that properly handle enterprise creation and management
    
  2. Security
    - Enable RLS on enterprises table
    - Add policies for:
      - Public read access
      - Authenticated user insert access
      - Admin-only update/delete access
*/

-- First drop existing policies
DROP POLICY IF EXISTS "Allow authenticated insert to enterprises" ON enterprises;
DROP POLICY IF EXISTS "Allow anonymous read access to enterprises" ON enterprises;
DROP POLICY IF EXISTS "Allow authenticated read access to enterprises" ON enterprises;
DROP POLICY IF EXISTS "Allow public read access" ON enterprises;
DROP POLICY IF EXISTS "Admins can update enterprises" ON enterprises;
DROP POLICY IF EXISTS "Admins can delete enterprises" ON enterprises;

-- Create new policies
-- Allow anyone to read enterprises
CREATE POLICY "Allow public read access to enterprises"
ON enterprises FOR SELECT
TO public
USING (true);

-- Allow authenticated users to create enterprises
CREATE POLICY "Allow authenticated users to create enterprises"
ON enterprises FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow admins to update enterprises
CREATE POLICY "Allow admins to update enterprises"
ON enterprises FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);

-- Allow admins to delete enterprises
CREATE POLICY "Allow admins to delete enterprises"
ON enterprises FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);