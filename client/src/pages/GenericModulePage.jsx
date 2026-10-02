import React from 'react';
import { 
  Building2, 
  Stethoscope, 
  BedDouble, 
  Receipt, 
  Settings, 
  Layers, 
  CheckCircle,
  Construction
} from 'lucide-react';

const MODULE_CONFIGS = {
  doctors: {
    title: 'Medical Staff & Doctors',
    subtitle: 'Attending physicians, surgeons, duty rosters, and specializations',
    icon: Stethoscope,
    badge: 'Clinical Staff',
    description: 'Staff directory with license verification, OPD schedules, and patient consultation quotas.'
  },
  departments: {
    title: 'Clinical Departments',
    subtitle: 'Cardiology, Neurology, Pediatrics, Orthopedics, and Emergency Wings',
    icon: Building2,
    badge: 'Hospital Wings',
    description: 'Floor configurations, head of department allocations, and department capacity.'
  },
  wards: {
    title: 'Wards & Bed Management',
    subtitle: 'ICU, General Wards, Private Rooms, and bed vacancy tracking',
    icon: BedDouble,
    badge: 'Inpatient Care',
    description: 'Real-time bed telemetry, sanitation schedules, and patient admissions.'
  },
  billing: {
    title: 'Billing & Invoicing',
    subtitle: 'Inpatient invoices, insurance claims, pharmacy receipts, and payments',
    icon: Receipt,
    badge: 'Finance',
    description: 'Automated invoice generation, payment gateway integration, and insurance settlement.'
  },
  settings: {
    title: 'System & Institutional Settings',
    subtitle: 'Hospital profile, user permissions, audit logs, and Supabase database config',
    icon: Settings,
    badge: 'Configuration',
    description: 'Manage institutional policies, API keys, emergency contact rosters, and theme defaults.'
  }
};

export const GenericModulePage = ({ moduleKey = 'doctors' }) => {
  const config = MODULE_CONFIGS[moduleKey] || MODULE_CONFIGS.doctors;
  const Icon = config.icon;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">{config.title}</h1>
          <p className="dashboard-subtitle">{config.subtitle}</p>
        </div>
        <span className="badge badge-info">{config.badge}</span>
      </div>

      <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}
        >
          <Icon size={32} />
        </div>

        <h2 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--text-main)' }}>
          {config.title} Module
        </h2>
        <p style={{ maxWidth: '480px', margin: '0 auto 24px', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
          {config.description}
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', fontSize: '13px' }}>
          <CheckCircle size={16} color="var(--accent-emerald)" />
          <span>Core UI Shell & Database Schema connected</span>
        </div>
      </div>
    </div>
  );
};

export default GenericModulePage;
