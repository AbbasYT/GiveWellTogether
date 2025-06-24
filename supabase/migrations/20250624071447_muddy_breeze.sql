/*
  # Add phone and privacy fields to user profiles

  1. Changes
    - Add `phone` column to `user_profiles` table
    - Add `is_private` column to `user_profiles` table with default true
    
  2. Security
    - No changes to existing RLS policies needed
*/

DO $$
BEGIN
  -- Add phone column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'phone'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN phone text;
  END IF;

  -- Add is_private column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'is_private'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN is_private boolean DEFAULT true;
  END IF;
END $$;