import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope, 
  Building2, 
  BedDouble, 
  Receipt, 
  Settings, 
  Activity, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/appointments', label: 'Appointments', icon: Calendar, badge: '5' },
  { path: '/patients', label: 'Patients', icon: Users },
  { path: '/doctors', label: 'Doctors', icon: Stethoscope },
  { path: '/departments', label: 'Departments', icon: Building2 },
  { path: '/wards', label: 'Wards & Beds', icon: BedDouble },
  { path: '/billing', label: 'Billing & Invoices', icon: Receipt },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ isCollapsed, toggleCollapse, isMobileOpen, closeMobileSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div className="sidebar-backdrop" onClick={closeMobileSidebar} />
      )}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-logo-icon pulse-icon">
              <Activity size={24} />
            </div>
            {!isCollapsed && (
              <div className="brand-text">
                <span className="brand-name">CarePulse</span>
                <span className="brand-tag">MED-SYSTEM</span>
              </div>
            )}
          </div>
          
          {/* Close button for mobile */}
          <button className="sidebar-mobile-close" onClick={closeMobileSidebar} aria-label="Close menu">
            <X size={20} />
          </button>

          {/* Desktop collapse toggle */}
          <button 
            className="sidebar-collapse-btn" 
            onClick={toggleCollapse} 
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <div className="nav-group-title">{!isCollapsed ? 'MAIN MENU' : '•'}</div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={closeMobileSidebar}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="nav-icon-wrapper">
                  <Icon size={20} />
                </div>
                {!isCollapsed && (
                  <span className="nav-label">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer / User Profile */}
        <div className="sidebar-footer">
          {user && (
            <div className="user-profile-pill">
              <img 
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'} 
                alt={user.fullName}
                className="user-avatar"
              />
              {!isCollapsed && (
                <div className="user-info">
                  <div className="user-name-row">
                    <span className="user-name">{user.fullName}</span>
                    <span className="user-role-tag">{user.role}</span>
                  </div>
                  <span className="user-department">{user.department || 'Hospital Staff'}</span>
                </div>
              )}
              <button 
                onClick={logout} 
                className="logout-button" 
                title="Sign Out"
              >
                <LogOut size={17} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
