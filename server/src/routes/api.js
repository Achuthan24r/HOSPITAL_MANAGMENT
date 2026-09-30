import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { login, getCurrentUser } from '../controllers/authController.js';
import { getAppointments, createAppointment, updateAppointmentStatus } from '../controllers/appointmentController.js';
import { getPatients, createPatient } from '../controllers/patientController.js';
import { getDoctors } from '../controllers/doctorController.js';

const router = express.Router();

// System Health
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'CarePulse Hospital Management API',
    timestamp: new Date().toISOString()
  });
});

// Authentication
router.post('/auth/login', login);
router.get('/auth/me', getCurrentUser);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Appointments
router.get('/appointments', getAppointments);
router.post('/appointments', createAppointment);
router.patch('/appointments/:id/status', updateAppointmentStatus);

// Patients
router.get('/patients', getPatients);
router.post('/patients', createPatient);

// Doctors
router.get('/doctors', getDoctors);

export default router;
