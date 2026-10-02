import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, Phone, Mail, Heart, Activity } from 'lucide-react';
import Badge from '../components/common/Badge';

export const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(json => {
        if (json.data) setPatients(json.data);
      })
      .catch(err => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = patients.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    (p.code && p.code.toLowerCase().includes(search.toLowerCase())) ||
    (p.condition && p.condition.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">Patient Directory</h1>
          <p className="dashboard-subtitle">Medical registries, admissions status, and emergency contacts</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="table-search" style={{ width: '320px' }}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search by name, ID, condition..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {loading ? (
          <div className="table-skeleton-container">
            <div className="skeleton skeleton-row"></div>
            <div className="skeleton skeleton-row"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Users size={28} /></div>
            <h3>No patients found</h3>
            <p>No patient matching your criteria was found in the database.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Patient Name & ID</th>
                  <th>Age / Gender</th>
                  <th>Blood Group</th>
                  <th>Contact Info</th>
                  <th>Condition</th>
                  <th>Assigned Physician</th>
                  <th>Location / Ward</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(patient => (
                  <tr key={patient.id}>
                    <td>
                      <div className="patient-cell">
                        <span className="patient-name">{patient.firstName} {patient.lastName}</span>
                        <span className="patient-code">{patient.code || patient.patient_code}</span>
                      </div>
                    </td>
                    <td>{patient.age || '42'} yrs • {patient.gender}</td>
                    <td>
                      <span className="badge badge-danger" style={{ fontWeight: 700 }}>
                        {patient.bloodGroup || patient.blood_group}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '12px' }}>
                        <span><Phone size={11} /> {patient.phone}</span>
                        <span style={{ color: 'var(--text-muted)' }}><Mail size={11} /> {patient.email}</span>
                      </div>
                    </td>
                    <td><span className="reason-text">{patient.condition || 'General Observation'}</span></td>
                    <td><span className="doctor-name">{patient.assignedDoctor || 'Dr. Sarah Jenkins'}</span></td>
                    <td>{patient.room || 'Room 302'}</td>
                    <td><Badge status={patient.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
