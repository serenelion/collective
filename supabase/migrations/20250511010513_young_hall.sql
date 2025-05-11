/*
  # Rename location_name to address

  1. Changes
    - Rename location_name column to address in enterprises table
*/

ALTER TABLE enterprises RENAME COLUMN location_name TO address;