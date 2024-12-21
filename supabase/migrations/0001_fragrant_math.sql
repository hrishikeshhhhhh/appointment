/*
  # Initial Hospital Management System Schema

  1. New Tables
    - departments
      - Basic department information
    - doctors
      - Doctor profiles linked to departments
    - appointments
      - Appointment bookings with status tracking
    - patients
      - Patient profiles and contact information

  2. Security
    - RLS enabled on all tables
    - Policies for authenticated access
*/

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  department_id uuid REFERENCES departments(id),
  specialization text NOT NULL,
  image_url text NOT NULL,
  bio text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create patients table (extends auth.users)
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  phone text NOT NULL,
  date_of_birth date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id),
  doctor_id uuid REFERENCES doctors(id),
  date date NOT NULL,
  time time NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- Enable RLS
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Departments policies
CREATE POLICY "Allow public read access to departments"
  ON departments FOR SELECT
  TO public
  USING (true);

-- Doctors policies
CREATE POLICY "Allow public read access to doctors"
  ON doctors FOR SELECT
  TO public
  USING (true);

-- Patients policies
CREATE POLICY "Users can read own patient profile"
  ON patients FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own patient profile"
  ON patients FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Appointments policies
CREATE POLICY "Users can read own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (auth.uid() = patient_id);

-- Insert sample departments
INSERT INTO departments (name, description, image_url) VALUES
  ('Cardiology', 'Specialized care for heart conditions', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80'),
  ('Neurology', 'Expert care for neurological disorders', 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80'),
  ('Orthopedics', 'Comprehensive care for bone and joint issues', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80'),
  ('Pediatrics', 'Specialized healthcare for children', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80');

-- Insert sample doctors
INSERT INTO doctors (name, department_id, specialization, image_url, bio) VALUES
  ('Dr. Sarah Johnson', (SELECT id FROM departments WHERE name = 'Cardiology'), 'Interventional Cardiology', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80', 'Board certified cardiologist with 15 years of experience'),
  ('Dr. Michael Chen', (SELECT id FROM departments WHERE name = 'Neurology'), 'Neurological Surgery', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80', 'Specialized in advanced neurological procedures'),
  ('Dr. Emily Rodriguez', (SELECT id FROM departments WHERE name = 'Orthopedics'), 'Sports Medicine', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80', 'Expert in sports injuries and rehabilitation'),
  ('Dr. James Wilson', (SELECT id FROM departments WHERE name = 'Pediatrics'), 'General Pediatrics', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80', 'Dedicated to providing comprehensive care for children');