/*
  # Create organization applications table

  1. New Tables
    - `organization_applications`
      - `id` (uuid, primary key)
      - `organization_name` (text, required, public)
      - `country_registration` (text, required, public)
      - `legal_status` (text, required, public)
      - `registration_number` (text, required, private)
      - `tax_identification` (text, required, private)
      - `founding_date` (text, required, public)
      - `address` (text, required, public)
      - `website` (text, required, public)
      - `primary_contact_name` (text, required, private)
      - `primary_contact_email` (text, required, private)
      - `organization_email` (text, required, public)
      - `organization_phone` (text, optional, public)
      - `partner_affiliations` (text, optional, private)
      - `mission_statement` (text, required, public)
      - `primary_category` (text, required, public)
      - `geographic_focus` (text, required, public)
      - `programs_services` (text, required, public)
      - `beneficiaries` (text, required, public)
      - `achievements` (text, optional, public)
      - `anti_terror_certification` (boolean, required, private)
      - `terms_conditions` (boolean, required, private)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `organization_applications` table
    - Add policy for public read access to public fields only
    - Add policy for authenticated users to insert applications
*/

-- Create enum for application status
CREATE TYPE application_status AS ENUM ('pending', 'under_review', 'approved', 'rejected');

-- Create enum for organization categories
CREATE TYPE organization_category AS ENUM (
  'Education',
  'Health',
  'Environment',
  'Child Welfare',
  'Poverty Alleviation',
  'Human Rights',
  'Disaster Relief',
  'Animal Welfare',
  'Arts & Culture',
  'Community Development',
  'Technology',
  'Other'
);

CREATE TABLE IF NOT EXISTS organization_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Organization Identity & Legal Details (public fields)
  organization_name text NOT NULL,
  country_registration text NOT NULL,
  legal_status text NOT NULL,
  founding_date text NOT NULL,
  address text NOT NULL,
  website text NOT NULL,
  
  -- Organization Identity & Legal Details (private fields)
  registration_number text NOT NULL,
  tax_identification text NOT NULL,
  
  -- Contact and Leadership (private fields)
  primary_contact_name text NOT NULL,
  primary_contact_email text NOT NULL,
  partner_affiliations text,
  
  -- Contact and Leadership (public fields)
  organization_email text NOT NULL,
  organization_phone text,
  
  -- Mission and Operations (public fields)
  mission_statement text NOT NULL,
  primary_category organization_category NOT NULL,
  geographic_focus text NOT NULL,
  programs_services text NOT NULL,
  beneficiaries text NOT NULL,
  achievements text,
  
  -- Policies and Agreements (private fields)
  anti_terror_certification boolean NOT NULL DEFAULT false,
  terms_conditions boolean NOT NULL DEFAULT false,
  
  -- Application metadata
  status application_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE organization_applications ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to public fields only
CREATE POLICY "Public can view approved applications (public fields only)"
  ON organization_applications
  FOR SELECT
  TO public
  USING (status = 'approved');

-- Policy for authenticated users to insert applications
CREATE POLICY "Anyone can submit applications"
  ON organization_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_organization_applications_updated_at
  BEFORE UPDATE ON organization_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_organization_applications_status ON organization_applications(status);
CREATE INDEX IF NOT EXISTS idx_organization_applications_category ON organization_applications(primary_category);
CREATE INDEX IF NOT EXISTS idx_organization_applications_created_at ON organization_applications(created_at DESC);