-- ==============================================================================
-- HOSPITAL MANAGEMENT SYSTEM - SUPABASE DATABASE SCHEMA
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    floor VARCHAR(20) DEFAULT '1st Floor',
    contact_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. STAFF & USERS PROFILE
CREATE TABLE IF NOT EXISTS public.staff_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'accountant')),
    phone VARCHAR(25),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_id UUID REFERENCES public.staff_profiles(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(25),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    specialization VARCHAR(100) NOT NULL,
    qualification VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) NOT NULL UNIQUE,
    consultation_fee NUMERIC(10, 2) DEFAULT 50.00,
    experience_years INT DEFAULT 5,
    availability_days TEXT[] DEFAULT ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    available_time_start TIME DEFAULT '09:00:00',
    available_time_end TIME DEFAULT '17:00:00',
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'busy', 'on_leave', 'offline')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PATIENTS TABLE
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_code VARCHAR(30) UNIQUE,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(25) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other')),
    blood_group VARCHAR(10) CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    address TEXT,
    emergency_contact_name VARCHAR(150),
    emergency_contact_phone VARCHAR(25),
    emergency_contact_relation VARCHAR(50),
    allergies TEXT,
    medical_history TEXT,
    insurance_provider VARCHAR(100),
    insurance_policy_number VARCHAR(80),
    status VARCHAR(20) DEFAULT 'outpatient' CHECK (status IN ('outpatient', 'inpatient', 'discharged')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ROOMS & BEDS
CREATE TABLE IF NOT EXISTS public.beds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bed_number VARCHAR(20) NOT NULL UNIQUE,
    room_number VARCHAR(20) NOT NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    type VARCHAR(30) DEFAULT 'General' CHECK (type IN ('General', 'Semi-Private', 'Private', 'ICU', 'Emergency')),
    daily_rate NUMERIC(10, 2) DEFAULT 100.00,
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance', 'reserved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'Routine' CHECK (priority IN ('Routine', 'Urgent', 'Emergency')),
    status VARCHAR(20) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Cancelled', 'No Show')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MEDICAL RECORDS & DIAGNOSES
CREATE TABLE IF NOT EXISTS public.medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    visit_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    symptoms TEXT,
    diagnosis TEXT NOT NULL,
    treatment_plan TEXT,
    vital_signs JSONB DEFAULT '{"temperature": "98.6 F", "blood_pressure": "120/80", "heart_rate": "72 bpm", "respiratory_rate": "16"}',
    prescriptions JSONB DEFAULT '[]',
    lab_tests_recommended TEXT[],
    doctor_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. BILLING & INVOICES
CREATE TABLE IF NOT EXISTS public.billing_invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE DEFAULT (CURRENT_DATE + INTERVAL '15 days'),
    items JSONB DEFAULT '[]',
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    tax NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    payment_status VARCHAR(20) DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Partial', 'Paid', 'Cancelled')),
    payment_method VARCHAR(50) DEFAULT 'Cash' CHECK (payment_method IN ('Cash', 'Credit Card', 'Debit Card', 'Insurance', 'Bank Transfer', 'UPI')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. REALISTIC SEED DATA FOR DEMO / INITIAL SETUP
INSERT INTO public.departments (name, code, description, floor, contact_phone) VALUES
('Cardiology', 'CARD', 'Comprehensive cardiac and cardiovascular care', '3rd Floor - Wing A', '+1 (555) 019-2831'),
('Neurology', 'NEUR', 'Advanced brain and nervous system specialists', '4th Floor - Wing B', '+1 (555) 019-2832'),
('Pediatrics', 'PED', 'Compassionate health care for infants and children', '2nd Floor - Wing A', '+1 (555) 019-2833'),
('Orthopedics', 'ORTH', 'Bone, joint, spine and sports injury diagnostics', '1st Floor - Wing C', '+1 (555) 019-2834'),
('Emergency Medicine', 'EMER', '24/7 Acute trauma and critical care unit', 'Ground Floor', '+1 (555) 019-2800')
ON CONFLICT (name) DO NOTHING;

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_invoices ENABLE ROW LEVEL SECURITY;

-- Allow public read access for demo / staff authenticated access
CREATE POLICY "Public Read Access for Departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Beds" ON public.beds FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Patients" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Invoices" ON public.billing_invoices FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Medical Records" ON public.medical_records FOR SELECT USING (true);
