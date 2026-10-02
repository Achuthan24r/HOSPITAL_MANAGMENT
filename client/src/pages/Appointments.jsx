import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Search, Filter, Clock, CheckCircle } from 'lucide-react';
import Badge from '../components/common/Badge';
import AppointmentModal from '../components/common/AppointmentModal';
import { fetchAppointments, createAppointmentApi, updateAppointmentStatusApi } from '../services/api';

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await fetchAppointments();
      if (data) setAppointments(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (aptData) => {
    const res = await createAppointmentApi(aptData);
    if (res && res.data) {
      setAppointments(prev => [res.data, ...prev]);
    }
  };

  const handleStatusChange = async (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    await updateAppointmentStatusApi(id, status);
  };

  const filtered = appointments.filter(a => 
    a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">Appointment Roster</h1>
          <p className="dashboard-subtitle">Manage OPD consultations, specialist clinics, and follow-ups</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="table-search" style={{ width: '320px' }}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search by patient, physician..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {loading ? (
          <div className="table-skeleton-container">
            <div className="skeleton skeleton-row"></div>
            <div className="skeleton skeleton-row"></div>
            <div className="skeleton skeleton-row"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Calendar size={28} /></div>
            <h3>No appointments found</h3>
            <p>Try clearing your search query or book a new consultation slot.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date & Time</th>
                  <th>Consultation Reason</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(apt => (
                  <tr key={apt.id}>
                    <td>
                      <div className="patient-cell">
                        <span className="patient-name">{apt.patientName}</span>
                        <span className="patient-code">{apt.patientCode}</span>
                      </div>
                    </td>
                    <td><span className="doctor-name">{apt.doctorName}</span></td>
                    <td><span className="doctor-dept">{apt.department}</span></td>
                    <td>
                      <span className="time-cell">
                        <Clock size={13} /> {apt.date} • {apt.time}
                      </span>
                    </td>
                    <td><span className="reason-text">{apt.type}</span></td>
                    <td><Badge status={apt.priority} /></td>
                    <td><Badge status={apt.status} /></td>
                    <td>
                      <select 
                        value={apt.status}
                        onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                        className="status-action-select"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Waiting">Waiting</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreate}
      />
    </div>
  );
};

export default Appointments;
