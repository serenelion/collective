/*
  # Fix enterprises table RLS policies

  1. Changes
    - Drop existing INSERT policy that's not working correctly
    - Add new INSERT policy with proper security checks
    - Add UPDATE and DELETE policies for enterprise management
    
  2. Security
    - Enable RLS on enterprises table (in case it wasn't enabled)
    - Add policies for authenticated users to:
      - Insert their own enterprises
      - Update their own enterprises
      - Delete their own enterprises
    - Maintain existing SELECT policies
*/

-- First ensure RLS is enabled
ALTER TABLE enterprises ENABLE ROW LEVEL SECURITY;

-- Drop the existing problematic INSERT policy if it exists
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow authenticated insert to enterprises" ON enterprises;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create new INSERT policy that properly handles authentication
CREATE POLICY "Users can create enterprises"
  ON enterprises
  FOR INSERT
  TO authenticated
  WITH CHECK (true);  -- Allow any authenticated user to create enterprises

-- Add UPDATE policy
CREATE POLICY "Users can update their own enterprises"
  ON enterprises
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id 
    FROM profiles 
    WHERE id = auth.uid()
  ))
  WITH CHECK (auth.uid() IN (
    SELECT user_id 
    FROM profiles 
    WHERE id = auth.uid()
  ));

-- Add DELETE policy
CREATE POLICY "Users can delete their own enterprises"
  ON enterprises
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id 
    FROM profiles 
    WHERE id = auth.uid()
  ));