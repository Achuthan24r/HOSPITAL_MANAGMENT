import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  BedDouble, 
  Plus, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  ArrowUpRight, 
  MoreVertical,
  RefreshCw,
  PhoneCall,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import AppointmentModal from '../components/common/AppointmentModal';
import { fetchDashboardData, fetchAppointments, createAppointmentApi, updateAppointmentStatusApi } from '../services/api';
import './Dashboard.css';

// Fallback initial demo datasets
const INITIAL_STATS = {
  totalPatients: 1428,
  patientsToday: 48,
  patientsTrend: '+12.5%',
  totalAppointments: 86,
  appointmentsToday: 32,
  appointmentsPending: 9,
  doctorsActive: 38,
  doctorsTotal: 45,
  bedOccupancyRate: 78,
  bedsOccupied: 187,
  bedsTotal: 240,
  icuBedsAvailable: 4,
  icuBedsTotal: 24,
  departmentOccupancy: [
    { name: 'Cardiology', occupied: 42, capacity: 50, percentage: 84 },
    { name: 'Neurology', occupied: 28, capacity: 35, percentage: 80 },
    { name: 'Pediatrics', occupied: 36, capacity: 45, percentage: 80 },
    { name: 'Orthopedics', occupied: 31, capacity: 40, percentage: 77 },
    { name: 'ICU / Critical', occupied: 20, capacity: 24, percentage: 83 },
    { name: 'Emergency', occupied: 30, capacity: 46, percentage: 65 }
  ]
};

const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-01',
    patientName: 'Eleanor Pena',
    patientCode: 'PAT-8921',
    doctorName: 'Dr. Sarah Jenkins',
    department: 'Cardiology',
    time: '09:30 AM',
    date: '2026-10-02',
    type: 'Follow-up ECG',
    priority: 'Routine',
    status: 'In Progress'
  },
  {
    id: 'apt-02',
    patientName: 'Sophia Martinez',
    patientCode: 'PAT-8923',
    doctorName: 'Dr. Elena Rostova',
    department: 'Pediatrics',
    time: '10:15 AM',
    date: '2026-10-02',
    type: 'Acute Bronchitis Exam',
    priority: 'Urgent',
    status: 'Waiting'
  },
  {
    id: 'apt-03',
    patientName: 'Robert Fox',
    patientCode: 'PAT-8919',
    doctorName: 'Dr. James Chen',
    department: 'Orthopedics',
    time: '11:00 AM',
    date: '2026-10-02',
    type: 'Joint Examination',
    priority: 'Routine',
    status: 'Confirmed'
  },
  {
    id: 'apt-04',
    patientName: 'Guy Hawkins',
    patientCode: 'PAT-8915',
    doctorName: 'Dr. Marcus Reynolds',
    department: 'Neurology',
    time: '02:00 PM',
    date: '2026-10-02',
    type: 'MRI Scan Consultation',
    priority: 'Routine',
    status: 'Scheduled'
  },
  {
    id: 'apt-05',
    patientName: 'Courtney Henry',
    patientCode: 'PAT-8910',
    doctorName: 'Dr. Emily Vance',
    department: 'Emergency',
    time: '03:30 PM',
    date: '2026-10-02',
    type: 'Trauma Evaluation',
    priority: 'Emergency',
    status: 'Confirmed'
  }
];

export const Dashboard = () => {
  const { user } = useAuth();
  
  const [stats, setStats] = useState(INITIAL_STATS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorBanner, setErrorBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load real API data or fallback
  const loadData = async () => {
    setIsRefreshing(true);
    setErrorBanner(null);
    try {
      const [statsData, aptData] = await Promise.all([
        fetchDashboardData(),
        fetchAppointments()
      ]);

      if (statsData) setStats(statsData);
      if (aptData && aptData.length > 0) setAppointments(aptData);
    } catch (err) {
      console.warn('Using demo data fallback:', err);
      setErrorBanner('Connected in local mode. Live demo data loaded.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (aptId, newStatus) => {
    // Optimistic UI update
    setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: newStatus } : a));
    try {
      await updateAppointmentStatusApi(aptId, newStatus);
    } catch (err) {
      console.warn('API update failed, kept in local state:', err);
    }
  };

  const handleCreateAppointment = async (newAptData) => {
    try {
      const res = await createAppointmentApi(newAptData);
      if (res && res.data) {
        setAppointments(prev => [res.data, ...prev]);
      } else {
        const localApt = {
          id: `apt-${Date.now().toString().slice(-4)}`,
          patientName: newAptData.patientName,
          patientCode: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
          doctorName: newAptData.doctorName,
          department: newAptData.department,
          time: newAptData.time,
          date: newAptData.date,
          type: newAptData.type,
          priority: newAptData.priority,
          status: 'Scheduled'
        };
        setAppointments(prev => [localApt, ...prev]);
      }
    } catch (err) {
      console.warn('Direct local addition:', err);
    }
  };

  const filteredAppointments = appointments.filter(item => {
    const matchesSearch = item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.patientCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-page">
      {/* Header Welcome Bar */}
      <div className="dashboard-header-row">
        <div>
          <div className="welcome-tag">
            <span className="live-dot"></span>
            <span>Hospital Operational Center</span>
          </div>
          <h1 className="dashboard-title">Welcome, {user?.fullName || 'Clinical Lead'}</h1>
          <p className="dashboard-subtitle">
            Overview of clinical operations, bed capacity, and patient consultations for today.
          </p>
        </div>

        <div className="header-actions-group">
          <button 
            className="btn btn-secondary" 
            onClick={loadData} 
            disabled={isRefreshing}
            title="Refresh Metrics"
          >
            <RefreshCw size={16} className={isRefreshing ? 'spin-icon' : ''} />
            <span>{isRefreshing ? 'Updating...' : 'Sync Data'}</span>
          </button>

          <button 
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {errorBanner && (
        <div className="dashboard-alert-banner">
          <AlertCircle size={18} />
          <span>{errorBanner}</span>
        </div>
      )}

      {/* KPI Stat Cards */}
      <div className="stats-grid">
        <StatCard 
          title="Active Patients"
          value={stats.totalPatients.toLocaleString()}
          trend={stats.patientsTrend}
          trendPositive={true}
          subtext={`+${stats.patientsToday} admitted today`}
          icon={Users}
          colorScheme="blue"
        />
        <StatCard 
          title="Appointments Today"
          value={stats.appointmentsToday}
          trend={`${stats.appointmentsPending} pending`}
          trendPositive={false}
          subtext="Consultation queue"
          icon={Calendar}
          colorScheme="amber"
        />
        <StatCard 
          title="Specialists on Duty"
          value={`${stats.doctorsActive}/${stats.doctorsTotal}`}
          trend="84% Active"
          trendPositive={true}
          subtext="5 surgical rotations"
          icon={Stethoscope}
          colorScheme="emerald"
        />
        <StatCard 
          title="Bed Occupancy"
          value={`${stats.bedOccupancyRate}%`}
          trend={`${stats.icuBedsAvailable} ICU Free`}
          trendPositive={true}
          subtext={`${stats.bedsOccupied}/${stats.bedsTotal} total beds`}
          icon={BedDouble}
          colorScheme="violet"
        />
      </div>

      {/* Main Content Grid: 2 Columns */}
      <div className="dashboard-layout-grid">
        {/* Left Column: Appointments and Patient Flow */}
        <div className="dashboard-main-col">
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">
                  <Calendar size={18} className="title-icon" />
                  <span>Scheduled Consultations</span>
                </h3>
                <p className="card-subtitle">Real-time outpatient and clinical consultation list</p>
              </div>

              <div className="table-controls">
                <div className="table-search">
                  <Search size={15} />
                  <input 
                    type="text" 
                    placeholder="Search patient, doctor, ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="table-filter-select"
                >
                  <option value="All">All Statuses</option>
                  <option value="Waiting">Waiting</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Appointments Table */}
            {isLoading ? (
              <div className="table-skeleton-container">
                <div className="skeleton skeleton-row"></div>
                <div className="skeleton skeleton-row"></div>
                <div className="skeleton skeleton-row"></div>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Calendar size={28} />
                </div>
                <h3>No appointments found</h3>
                <p>No consultations match your search criteria. Try adjusting filters or schedule a new one.</p>
                <button className="btn btn-secondary" style={{ marginTop: '12px' }} onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="hms-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Attending Doctor</th>
                      <th>Time</th>
                      <th>Type / Reason</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td>
                          <div className="patient-cell">
                            <span className="patient-name">{apt.patientName}</span>
                            <span className="patient-code">{apt.patientCode}</span>
                          </div>
                        </td>
                        <td>
                          <div className="doctor-cell">
                            <span className="doctor-name">{apt.doctorName}</span>
                            <span className="doctor-dept">{apt.department}</span>
                          </div>
                        </td>
                        <td>
                          <span className="time-cell">
                            <Clock size={13} />
                            {apt.time}
                          </span>
                        </td>
                        <td>
                          <span className="reason-text">{apt.type}</span>
                        </td>
                        <td>
                          <Badge status={apt.priority} />
                        </td>
                        <td>
                          <Badge status={apt.status} />
                        </td>
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
        </div>

        {/* Right Column: Ward Occupancy and Specialists */}
        <div className="dashboard-side-col">
          {/* Department Bed Utilization */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">
                  <BedDouble size={18} className="title-icon" />
                  <span>Ward Bed Capacity</span>
                </h3>
                <p className="card-subtitle">Active hospital unit occupancy</p>
              </div>
            </div>

            <div className="occupancy-list">
              {stats.departmentOccupancy.map((dept) => (
                <div key={dept.name} className="occupancy-item">
                  <div className="occupancy-info">
                    <span className="dept-name">{dept.name}</span>
                    <span className="dept-count">
                      <strong>{dept.occupied}</strong> / {dept.capacity} Beds ({dept.percentage}%)
                    </span>
                  </div>
                  <div className="progress-bar-track">
                    <div 
                      className={`progress-bar-fill ${dept.percentage > 82 ? 'high' : dept.percentage > 70 ? 'medium' : 'normal'}`}
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick On-Duty Doctors Snapshot */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">
                  <Stethoscope size={18} className="title-icon" />
                  <span>On-Duty Specialists</span>
                </h3>
                <p className="card-subtitle">Available for urgent consultation</p>
              </div>
            </div>

            <div className="on-duty-list">
              <div className="doctor-duty-item">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150" 
                  alt="Dr. Sarah" 
                  className="duty-avatar"
                />
                <div className="duty-info">
                  <span className="duty-name">Dr. Sarah Jenkins</span>
                  <span className="duty-spec">Cardiology • Floor 3</span>
                </div>
                <span className="badge badge-success">Available</span>
              </div>

              <div className="doctor-duty-item">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150" 
                  alt="Dr. Marcus" 
                  className="duty-avatar"
                />
                <div className="duty-info">
                  <span className="duty-name">Dr. Marcus Reynolds</span>
                  <span className="duty-spec">Neurology • OT Room 2</span>
                </div>
                <span className="badge badge-warning">In Surgery</span>
              </div>

              <div className="doctor-duty-item">
                <img 
                  src="https://images.unsplash.com/photo-1594824813633-890438b37057?auto=format&fit=crop&q=80&w=150" 
                  alt="Dr. Elena" 
                  className="duty-avatar"
                />
                <div className="duty-info">
                  <span className="duty-name">Dr. Elena Rostova</span>
                  <span className="duty-spec">Pediatrics • Floor 2</span>
                </div>
                <span className="badge badge-success">Available</span>
              </div>
            </div>
          </div>

          {/* Emergency Alert Hotline Widget */}
          <div className="emergency-widget-card">
            <div className="emergency-widget-header">
              <div className="emergency-icon-box pulse-icon">
                <PhoneCall size={20} />
              </div>
              <div>
                <h4>24/7 Trauma Command</h4>
                <p>Ground Floor Emergency Bay</p>
              </div>
            </div>
            <div className="emergency-contact-row">
              <span>Rapid Response Line:</span>
              <strong>+1 (800) 911-CARE</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Creation Modal */}
      <AppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateAppointment}
      />
    </div>
  );
};

export default Dashboard;
