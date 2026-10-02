import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle,
  Stethoscope,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { useAuth, DEMO_PRESETS } from '../context/AuthContext';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const [email, setEmail] = useState('admin@carepulse.org');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Login failed. Please verify credentials.');
    }
  };

  const handleQuickLogin = async (preset) => {
    setEmail(preset.email);
    setPassword(preset.password);
    setError('');
    const result = await login(preset.email, preset.password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      {/* Left Feature Showcase Banner */}
      <div className="login-hero-side">
        <div className="hero-content">
          <div className="hero-brand">
            <div className="hero-logo-box pulse-icon">
              <Activity size={32} />
            </div>
            <div className="hero-brand-name">
              <h1>CarePulse</h1>
              <span>CLINICAL OPERATING SYSTEM</span>
            </div>
          </div>

          <div className="hero-tagline">
            <h2>Next-Generation Hospital Management & Clinical Intelligence.</h2>
            <p>
              Coordinate patient care, optimize ward occupancy, streamline appointments, 
              and manage medical records with end-to-end security.
            </p>
          </div>

          <div className="hero-features-grid">
            <div className="hero-feature-item">
              <div className="feature-icon"><HeartPulse size={20} /></div>
              <div>
                <strong>Intelligent Triage</strong>
                <span>Real-time ER prioritization</span>
              </div>
            </div>
            <div className="hero-feature-item">
              <div className="feature-icon"><Stethoscope size={20} /></div>
              <div>
                <strong>Doctor Rostering</strong>
                <span>Automated OPD allocation</span>
              </div>
            </div>
            <div className="hero-feature-item">
              <div className="feature-icon"><ShieldCheck size={20} /></div>
              <div>
                <strong>HIPAA & HL7 Ready</strong>
                <span>Encrypted medical records</span>
              </div>
            </div>
          </div>

          <div className="hero-footer-note">
            <span>© 2026 CarePulse Health Systems. Enterprise Clinical Suite.</span>
          </div>
        </div>
      </div>

      {/* Right Login Form Side */}
      <div className="login-form-side">
        <div className="login-form-card">
          <div className="form-header">
            <h2>Sign In to Portal</h2>
            <p>Enter your institutional credentials or select a demo account below</p>
          </div>

          {error && (
            <div className="login-error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Hospital Email</label>
              <div className="input-with-icon">
                <Mail size={18} className="field-icon" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@carepulse.org"
                  className="form-input with-prefix"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Security Password</label>
                <a href="#reset" onClick={(e) => e.preventDefault()} className="forgot-link">Forgot password?</a>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="field-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input with-prefix with-suffix"
                  required
                />
                <button 
                  type="button" 
                  className="field-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary submit-auth-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-spinner">Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="demo-accounts-section">
            <div className="divider-label">
              <span>OR 1-CLICK DEMO LOGIN</span>
            </div>

            <div className="demo-presets-list">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.roleName}
                  type="button"
                  onClick={() => handleQuickLogin(preset)}
                  className="demo-preset-card"
                >
                  <img src={preset.avatar} alt={preset.name} className="demo-avatar" />
                  <div className="demo-meta">
                    <span className="demo-role">{preset.roleName}</span>
                    <span className="demo-name">{preset.name}</span>
                  </div>
                  <UserCheck size={16} className="demo-check" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
