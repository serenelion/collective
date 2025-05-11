/*
  # Initial Schema Creation for Regenerative Enterprise Directory

  1. New Tables
     - `categories` - Stores main categories for enterprises
     - `subcategories` - Stores subcategories related to parent categories
     - `enterprises` - Stores enterprise data including geolocation

  2. Security
     - Enable RLS on all tables
     - Add policies for authenticated and anonymous users

  3. Seed Data
     - Populate categories and subcategories
*/

-- Create the categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- Create the subcategories table with reference to categories
CREATE TABLE IF NOT EXISTS subcategories (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  UNIQUE(category_id, name)
);

-- Create the enterprises table
CREATE TABLE IF NOT EXISTS enterprises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_featured BOOLEAN DEFAULT FALSE,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  location_name TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  has_location BOOLEAN,
  category TEXT NOT NULL,
  subcategories JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_enterprises_category ON enterprises(category);
CREATE INDEX IF NOT EXISTS idx_enterprises_subcategories ON enterprises USING GIN (subcategories);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprises ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Allow anonymous read access to categories"
  ON categories
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated read access to categories"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for subcategories
CREATE POLICY "Allow anonymous read access to subcategories"
  ON subcategories
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated read access to subcategories"
  ON subcategories
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for enterprises
CREATE POLICY "Allow anonymous read access to enterprises"
  ON enterprises
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated read access to enterprises"
  ON enterprises
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert to enterprises"
  ON enterprises
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Seed data for categories
INSERT INTO categories (name) VALUES
  ('Land Projects'),
  ('Capital Sources'),
  ('Open Source Tools'),
  ('Network Organizers');

-- Seed data for subcategories
INSERT INTO subcategories (category_id, name) VALUES
-- Land Projects
(1, 'Ecovillage'),
(1, 'Training Center'),
(1, 'Permaculture Farm'),
(1, 'Food Forest'),
(1, 'Plant Nursery'),
(1, 'Community Garden'),
(1, 'Regenerative Ranch'),
(1, 'Agroforestry System'),
(1, 'Syntropic Farm'),
(1, 'CSA (Community-Supported Agriculture)'),
(1, 'Retreat Center'),
(1, 'Demonstration Site'),
(1, 'Seed Bank'),
(1, 'Urban Farm'),
(1, 'Wildlife Sanctuary'),
-- Capital Sources
(2, 'Grantmaking Organization'),
(2, 'Impact Investment Fund'),
(2, 'Cooperative Finance'),
(2, 'Community Land Trust'),
(2, 'Climate Finance'),
(2, 'Philanthropic Foundation'),
(2, 'Microfinance'),
(2, 'Regenerative Venture Capital'),
(2, 'Public/University Partnership'),
(2, 'Participatory Budgeting'),
(2, 'DAOs / Blockchain-based Capital'),
(2, 'Crowdfunding Platform'),
(2, 'Community Currency'),
-- Open Source Tools
(3, 'Mapping / GIS'),
(3, 'Sensor Networks / IoT'),
(3, 'Farm Management (e.g., farmOS)'),
(3, 'Remote Sensing / Drones'),
(3, 'Data Visualization / Dashboards'),
(3, 'Climate Modeling'),
(3, 'Energy Systems Monitoring'),
(3, 'Water Management'),
(3, 'Environmental Data Platforms'),
(3, 'Blockchain for Traceability'),
(3, 'Open Access Knowledge Libraries'),
(3, 'Distributed Web Hosting'),
(3, 'Mesh Networks / Community Internet'),
(3, 'Citizen Science Tools'),
(3, 'Lifecycle Analysis (LCA) Tools'),
-- Network Organizers
(4, 'Incubator / Accelerator'),
(4, 'Cooperative Organizer'),
(4, 'Design Consultancy'),
(4, 'Event Producer / Conference Host'),
(4, 'Training / Certification Body'),
(4, 'Permaculture Network'),
(4, 'Policy & Advocacy Group'),
(4, 'Media & Storytelling Hub'),
(4, 'Curriculum Developer'),
(4, 'Regenerative Think Tank'),
(4, 'Commons Steward'),
(4, 'Regional Organizer'),
(4, 'Platform Cooperative');