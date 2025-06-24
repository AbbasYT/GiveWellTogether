/*
  # Add communication preferences to user profiles

  1. Changes
    - Add `email_newsletters` column to `user_profiles` table with default true
    - Add `impact_updates` column to `user_profiles` table with default true  
    - Add `organization_updates` column to `user_profiles` table with default true
    
  2. Security
    - No changes to existing RLS policies needed
*/

DO $$
BEGIN
  -- Add email_newsletters column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'email_newsletters'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN email_newsletters boolean DEFAULT true;
  END IF;

  -- Add impact_updates column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'impact_updates'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN impact_updates boolean DEFAULT true;
  END IF;

  -- Add organization_updates column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'organization_updates'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN organization_updates boolean DEFAULT true;
  END IF;
END $$;