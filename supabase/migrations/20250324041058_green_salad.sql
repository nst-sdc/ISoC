/*
  # Initial Schema Setup for ISoC 2025

  1. New Tables
    - organizations
      - Basic organization details
      - Logo and social links
    - projects
      - Project details submitted by organizations
      - Connected to organizations
    - mentors
      - Mentor information
      - Connected to organizations and projects
    - students
      - Student registration information
      - Application details
    - applications
      - Student project applications
      - Connected to students and projects

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  website_url text NOT NULL,
  email text UNIQUE NOT NULL,
  github_url text,
  short_description text NOT NULL,
  full_description text NOT NULL,
  logo_url text,
  social_links jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  title text NOT NULL,
  tech_stack text[] NOT NULL,
  description text NOT NULL,
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')),
  expected_outcomes text,
  github_repo text,
  tags text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create project_mentors junction table
CREATE TABLE IF NOT EXISTS project_mentors (
  project_id uuid REFERENCES projects(id) NOT NULL,
  mentor_id uuid REFERENCES mentors(id) NOT NULL,
  PRIMARY KEY (project_id, mentor_id)
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  github_profile text NOT NULL,
  linkedin_profile text,
  portfolio_url text,
  resume_url text NOT NULL,
  motivation text NOT NULL,
  past_contributions text,
  technical_skills text[] NOT NULL,
  preferred_categories text[] NOT NULL,
  proposal_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Organizations Policies
CREATE POLICY "Organizations are viewable by everyone"
  ON organizations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Organizations can be created by authenticated users"
  ON organizations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Organizations can be updated by owners"
  ON organizations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Projects Policies
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Projects can be created by organization owners"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM organizations
    WHERE id = organization_id
    AND user_id = auth.uid()
  ));

CREATE POLICY "Projects can be updated by organization owners"
  ON projects FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM organizations
    WHERE id = organization_id
    AND user_id = auth.uid()
  ));

-- Mentors Policies
CREATE POLICY "Mentors are viewable by everyone"
  ON mentors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Mentors can be managed by organization owners"
  ON mentors FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM organizations
    WHERE id = organization_id
    AND user_id = auth.uid()
  ));

-- Project Mentors Policies
CREATE POLICY "Project mentors are viewable by everyone"
  ON project_mentors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Project mentors can be managed by organization owners"
  ON project_mentors FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM organizations o
    JOIN projects p ON p.organization_id = o.id
    WHERE p.id = project_id
    AND o.user_id = auth.uid()
  ));

-- Students Policies
CREATE POLICY "Students can view their own profiles"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Students can create their profile"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update their own profile"
  ON students FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);