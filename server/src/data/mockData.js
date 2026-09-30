export const mockDepartments = [
  { id: 'dep-1', name: 'Cardiology', code: 'CARD', floor: '3rd Floor - Wing A', doctorsCount: 8, patientsCount: 34 },
  { id: 'dep-2', name: 'Neurology', code: 'NEUR', floor: '4th Floor - Wing B', doctorsCount: 6, patientsCount: 22 },
  { id: 'dep-3', name: 'Pediatrics', code: 'PED', floor: '2nd Floor - Wing A', doctorsCount: 9, patientsCount: 45 },
  { id: 'dep-4', name: 'Orthopedics', code: 'ORTH', floor: '1st Floor - Wing C', doctorsCount: 7, patientsCount: 29 },
  { id: 'dep-5', name: 'Emergency', code: 'EMER', floor: 'Ground Floor', doctorsCount: 14, patientsCount: 52 },
];

export const mockDoctors = [
  {
    id: 'doc-1',
    fullName: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@carepulse.org',
    specialization: 'Chief Cardiologist',
    department: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    status: 'available',
    phone: '+1 (555) 234-5678',
    experienceYears: 14,
    patientsToday: 9
  },
  {
    id: 'doc-2',
    fullName: 'Dr. Marcus Reynolds',
    email: 'marcus.reynolds@carepulse.org',
    specialization: 'Senior Neurosurgeon',
    department: 'Neurology',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    status: 'in-surgery',
    phone: '+1 (555) 345-6789',
    experienceYears: 18,
    patientsToday: 4
  },
  {
    id: 'doc-3',
    fullName: 'Dr. Elena Rostova',
    email: 'elena.rostova@carepulse.org',
    specialization: 'Pediatric Specialist',
    department: 'Pediatrics',
    avatar: 'https://images.unsplash.com/photo-1594824813633-890438b37057?auto=format&fit=crop&q=80&w=200',
    status: 'available',
    phone: '+1 (555) 456-7890',
    experienceYears: 11,
    patientsToday: 12
  },
  {
    id: 'doc-4',
    fullName: 'Dr. James Chen',
    email: 'james.chen@carepulse.org',
    specialization: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    status: 'available',
    phone: '+1 (555) 567-8901',
    experienceYears: 9,
    patientsToday: 7
  },
  {
    id: 'doc-5',
    fullName: 'Dr. Emily Vance',
    email: 'emily.vance@carepulse.org',
    specialization: 'Emergency Physician',
    department: 'Emergency',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=200',
    status: 'on-duty',
    phone: '+1 (555) 678-9012',
    experienceYears: 8,
    patientsToday: 16
  }
];

export const mockPatients = [
  {
    id: 'pat-101',
    code: 'PAT-8921',
    firstName: 'Eleanor',
    lastName: 'Pena',
    age: 42,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+1 (555) 987-1234',
    email: 'eleanor.pena@example.com',
    condition: 'Hypertension Follow-up',
    status: 'In Consultation',
    assignedDoctor: 'Dr. Sarah Jenkins',
    room: 'Room 304',
    admissionDate: '2026-09-30'
  },
  {
    id: 'pat-102',
    code: 'PAT-8922',
    firstName: 'Jerome',
    lastName: 'Bell',
    age: 58,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+1 (555) 876-2345',
    email: 'jerome.bell@example.com',
    condition: 'Post-Op Knee Recovery',
    status: 'Admitted',
    assignedDoctor: 'Dr. James Chen',
    room: 'Ward 102 - Bed 4',
    admissionDate: '2026-10-01'
  },
  {
    id: 'pat-103',
    code: 'PAT-8923',
    firstName: 'Sophia',
    lastName: 'Martinez',
    age: 7,
    gender: 'Female',
    bloodGroup: 'B+',
    phone: '+1 (555) 765-3456',
    email: 'martinez.fam@example.com',
    condition: 'Acute Bronchitis',
    status: 'Waiting',
    assignedDoctor: 'Dr. Elena Rostova',
    room: 'OPD-2',
    admissionDate: '2026-10-02'
  },
  {
    id: 'pat-104',
    code: 'PAT-8924',
    firstName: 'David',
    lastName: 'Kowalski',
    age: 63,
    gender: 'Male',
    bloodGroup: 'AB-',
    phone: '+1 (555) 654-4567',
    email: 'd.kowalski@example.com',
    condition: 'Cardiac Arrhythmia',
    status: 'ICU',
    assignedDoctor: 'Dr. Sarah Jenkins',
    room: 'ICU Bed 2',
    admissionDate: '2026-09-28'
  },
  {
    id: 'pat-105',
    code: 'PAT-8925',
    firstName: 'Amara',
    lastName: 'Diallo',
    age: 29,
    gender: 'Female',
    bloodGroup: 'O-',
    phone: '+1 (555) 543-5678',
    email: 'amara.d@example.com',
    condition: 'Migraine Diagnostics',
    status: 'Discharged',
    assignedDoctor: 'Dr. Marcus Reynolds',
    room: 'Room 412',
    admissionDate: '2026-09-29'
  }
];

export const mockAppointments = [
  {
    id: 'apt-01',
    patientName: 'Eleanor Pena',
    patientCode: 'PAT-8921',
    doctorName: 'Dr. Sarah Jenkins',
    department: 'Cardiology',
    time: '09:30 AM',
    date: '2026-10-02',
    type: 'Follow-up',
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
    type: 'Emergency Consultation',
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
    type: 'MRI Review',
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

export const mockDashboardStats = {
  totalPatients: 1428,
  patientsToday: 48,
  patientsTrend: '+12.5%',
  totalAppointments: 86,
  appointmentsToday: 32,
  appointmentsPending: 9,
  doctorsActive: 38,
  doctorsTotal: 45,
  bedOccupancyRate: 78, // percentage
  bedsOccupied: 187,
  bedsTotal: 240,
  icuBedsAvailable: 4,
  icuBedsTotal: 24,
  pharmacyLowStockCount: 6,
  revenueToday: 14350,
  departmentOccupancy: [
    { name: 'Cardiology', occupied: 42, capacity: 50, percentage: 84 },
    { name: 'Neurology', occupied: 28, capacity: 35, percentage: 80 },
    { name: 'Pediatrics', occupied: 36, capacity: 45, percentage: 80 },
    { name: 'Orthopedics', occupied: 31, capacity: 40, percentage: 77 },
    { name: 'ICU / Critical', occupied: 20, capacity: 24, percentage: 83 },
    { name: 'Emergency', occupied: 30, capacity: 46, percentage: 65 }
  ]
};
