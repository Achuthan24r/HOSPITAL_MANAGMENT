import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { mockPatients } from '../data/mockData.js';

let inMemoryPatients = [...mockPatients];

export const getPatients = async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return res.json({ success: true, data, count: data.length });
      }
    }

    res.json({ success: true, data: inMemoryPatients, count: inMemoryPatients.length });
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch patients', error: err.message });
  }
};

export const createPatient = async (req, res) => {
  const { firstName, lastName, age, gender, bloodGroup, phone, email, condition } = req.body;

  if (!firstName || !lastName || !phone) {
    return res.status(400).json({
      success: false,
      message: 'First name, last name, and phone are required.'
    });
  }

  const newPatient = {
    id: `pat-${Date.now().toString().slice(-4)}`,
    code: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
    firstName,
    lastName,
    age: Number(age) || 30,
    gender: gender || 'Other',
    bloodGroup: bloodGroup || 'O+',
    phone,
    email: email || '',
    condition: condition || 'General Checkup',
    status: 'Waiting',
    assignedDoctor: 'Dr. Sarah Jenkins',
    room: 'OPD-1',
    admissionDate: new Date().toISOString().split('T')[0]
  };

  inMemoryPatients.unshift(newPatient);

  res.status(201).json({
    success: true,
    message: 'Patient registered successfully',
    data: newPatient
  });
};
