import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { mockAppointments } from '../data/mockData.js';

let inMemoryAppointments = [...mockAppointments];

export const getAppointments = async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_date,
          appointment_time,
          reason,
          status,
          priority,
          patients (id, first_name, last_name, patient_code),
          doctors (id, full_name, specialization)
        `)
        .order('appointment_date', { ascending: false });

      if (!error && data && data.length > 0) {
        const formatted = data.map(item => ({
          id: item.id,
          patientName: item.patients ? `${item.patients.first_name} ${item.patients.last_name}` : 'Unknown Patient',
          patientCode: item.patients?.patient_code || 'N/A',
          doctorName: item.doctors?.full_name || 'Assigned Physician',
          department: item.doctors?.specialization || 'General',
          time: item.appointment_time,
          date: item.appointment_date,
          type: item.reason,
          priority: item.priority || 'Routine',
          status: item.status
        }));
        return res.json({ success: true, data: formatted, count: formatted.length });
      }
    }

    res.json({ success: true, data: inMemoryAppointments, count: inMemoryAppointments.length });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments', error: err.message });
  }
};

export const createAppointment = async (req, res) => {
  const { patientName, doctorName, department, time, date, type, priority } = req.body;

  if (!patientName || !doctorName || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'Missing required appointment fields (patientName, doctorName, date, time)'
    });
  }

  const newAppointment = {
    id: `apt-${Date.now().toString().slice(-4)}`,
    patientName,
    patientCode: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
    doctorName,
    department: department || 'General Medicine',
    time,
    date,
    type: type || 'Consultation',
    priority: priority || 'Routine',
    status: 'Scheduled'
  };

  inMemoryAppointments.unshift(newAppointment);

  res.status(201).json({
    success: true,
    message: 'Appointment successfully scheduled',
    data: newAppointment
  });
};

export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const aptIndex = inMemoryAppointments.findIndex(a => a.id === id);
  if (aptIndex === -1) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  inMemoryAppointments[aptIndex].status = status;

  res.json({
    success: true,
    message: `Appointment updated to ${status}`,
    data: inMemoryAppointments[aptIndex]
  });
};
