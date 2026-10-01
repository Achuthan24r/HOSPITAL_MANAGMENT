import React, { useState } from 'react';
import { X, Calendar, Clock, User, Stethoscope, AlertCircle, Check } from 'lucide-react';
import './AppointmentModal.css';

export const AppointmentModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: 'Dr. Sarah Jenkins',
    department: 'Cardiology',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    type: 'Routine Checkup',
    priority: 'Routine'
  });

  const [validationError, setValidationError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName.trim()) {
      setValidationError('Please enter patient full name.');
      return;
    }
    if (!formData.date || !formData.time) {
      setValidationError('Please specify appointment date and time.');
      return;
    }

    setSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setValidationError(err.message || 'Failed to schedule appointment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-badge">
              <Calendar size={20} />
            </div>
            <div>
              <h3>Schedule Patient Appointment</h3>
              <p>Book a consultation slot with attending physicians</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {validationError && (
          <div className="modal-error-banner">
            <AlertCircle size={16} />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Patient Full Name</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input 
                type="text" 
                name="patientName"
                placeholder="e.g. Liam Gallagher"
                value={formData.patientName}
                onChange={handleChange}
                className="form-input with-prefix"
                required
              />
            </div>
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">Attending Doctor</label>
              <select 
                name="doctorName" 
                value={formData.doctorName}
                onChange={(e) => {
                  const doc = e.target.value;
                  let dept = 'General Medicine';
                  if (doc.includes('Sarah')) dept = 'Cardiology';
                  if (doc.includes('Marcus')) dept = 'Neurology';
                  if (doc.includes('Elena')) dept = 'Pediatrics';
                  if (doc.includes('James')) dept = 'Orthopedics';
                  if (doc.includes('Emily')) dept = 'Emergency';
                  setFormData({ ...formData, doctorName: doc, department: dept });
                }}
                className="form-select"
              >
                <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Cardiology)</option>
                <option value="Dr. Marcus Reynolds">Dr. Marcus Reynolds (Neurology)</option>
                <option value="Dr. Elena Rostova">Dr. Elena Rostova (Pediatrics)</option>
                <option value="Dr. James Chen">Dr. James Chen (Orthopedics)</option>
                <option value="Dr. Emily Vance">Dr. Emily Vance (Emergency)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <input 
                type="text" 
                name="department" 
                value={formData.department} 
                readOnly 
                className="form-input" 
                style={{ opacity: 0.8 }} 
              />
            </div>
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Slot</label>
              <select 
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-select"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="04:45 PM">04:45 PM</option>
              </select>
            </div>
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">Consultation Reason / Type</label>
              <input 
                type="text" 
                name="type"
                placeholder="e.g. Follow-up ECG, Fever check"
                value={formData.type}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select 
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Routine">Routine</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Confirming...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
