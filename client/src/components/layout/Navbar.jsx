import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  ChevronDown, 
  User, 
  Shield, 
  LogOut, 
  Sparkles, 
  CheckCircle2, 
  Clock,
  HeartPulse
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth, DEMO_PRESETS } from '../../context/AuthContext';
import './Navbar.css';

export const Navbar = ({ openMobileSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, switchPreset } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, text: 'Emergency Admission: ICU Bed #3 assigned to Trauma patient', time: '5m ago', unread: true },
    { id: 2, text: 'Lab results ready for Eleanor Pena (Blood Panel)', time: '22m ago', unread: true },
    { id: 3, text: 'Dr. Sarah Jenkins updated prescription for Room 304', time: '1h ago', unread: false },
  ];

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button 
          className="mobile-hamburger-btn" 
          onClick={openMobileSidebar} 
          aria-label="Open sidebar navigation"
        >
          <Menu size={22} />
        </button>

        <div className="navbar-search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search patients, medical records, doctors..." 
            className="navbar-search-input"
          />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Hospital Status Banner */}
        <div className="hospital-status-chip">
          <span className="status-indicator-dot"></span>
          <span className="status-label">Emergency Unit: <strong>Active</strong></span>
        </div>

        {/* Quick Role Switcher */}
        <div className="dropdown-container">
          <button 
            className="role-switcher-btn" 
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
          >
            <Shield size={15} />
            <span className="role-btn-text">Role: <strong>{user?.role || 'Guest'}</strong></span>
            <ChevronDown size={14} />
          </button>

          {showRoleMenu && (
            <div className="dropdown-panel role-dropdown">
              <div className="dropdown-header">
                <span>Switch Demo Persona</span>
                <Sparkles size={14} className="sparkle-icon" />
              </div>
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.roleName}
                  className={`role-item ${user?.email === preset.email ? 'active' : ''}`}
                  onClick={() => {
                    switchPreset(preset);
                    setShowRoleMenu(false);
                  }}
                >
                  <img src={preset.avatar} alt={preset.name} className="preset-avatar" />
                  <div className="preset-details">
                    <span className="preset-name">{preset.name}</span>
                    <span className="preset-role">{preset.roleName} • {preset.dept}</span>
                  </div>
                  {user?.email === preset.email && (
                    <CheckCircle2 size={16} className="preset-checked" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button 
          className="navbar-icon-btn" 
          onClick={toggleTheme} 
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={19} className="theme-sun-icon" /> : <Moon size={19} />}
        </button>

        {/* Notification Bell */}
        <div className="dropdown-container">
          <button 
            className="navbar-icon-btn notification-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowRoleMenu(false);
              setShowProfileMenu(false);
            }}
            title="Notifications"
          >
            <Bell size={19} />
            <span className="notification-badge"></span>
          </button>

          {showNotifications && (
            <div className="dropdown-panel notifications-dropdown">
              <div className="dropdown-header">
                <span>Notifications (2 New)</span>
                <span className="mark-read-link">Mark all read</span>
              </div>
              <div className="notification-list">
                {notifications.map((item) => (
                  <div key={item.id} className={`notification-item ${item.unread ? 'unread' : ''}`}>
                    <p className="notification-text">{item.text}</p>
                    <span className="notification-time">
                      <Clock size={11} /> {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="dropdown-container">
          <div 
            className="navbar-user-profile" 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowRoleMenu(false);
              setShowNotifications(false);
            }}
          >
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'} 
              alt={user?.fullName || 'User'} 
              className="navbar-avatar" 
            />
            <div className="navbar-user-info">
              <span className="navbar-user-name">{user?.fullName || 'Dr. Gregory House'}</span>
              <span className="navbar-user-role">{user?.role || 'Administrator'}</span>
            </div>
            <ChevronDown size={14} className="user-chevron" />
          </div>

          {showProfileMenu && (
            <div className="dropdown-panel profile-dropdown">
              <div className="profile-dropdown-header">
                <strong>{user?.fullName}</strong>
                <span>{user?.email}</span>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-action-item">
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button className="dropdown-action-item danger-item" onClick={logout}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
