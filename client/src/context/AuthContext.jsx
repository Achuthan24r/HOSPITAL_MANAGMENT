import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'usr-admin-01',
  email: 'admin@carepulse.org',
  fullName: 'Dr. Gregory House',
  role: 'admin',
  department: 'Hospital Administration',
  avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
};

export const DEMO_PRESETS = [
  {
    roleName: 'Administrator',
    email: 'admin@carepulse.org',
    password: 'password123',
    name: 'Dr. Gregory House',
    dept: 'Hospital Administration',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
  },
  {
    roleName: 'Lead Doctor',
    email: 'doctor@carepulse.org',
    password: 'password123',
    name: 'Dr. Sarah Jenkins',
    dept: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
  },
  {
    roleName: 'Receptionist',
    email: 'receptionist@carepulse.org',
    password: 'password123',
    name: 'Clara Oswald',
    dept: 'Front Desk',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('carepulse_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER; // Default logged in as admin for immediate exploration
  });

  const [token, setToken] = useState(() => localStorage.getItem('carepulse_token') || 'demo-token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('carepulse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('carepulse_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('carepulse_token', token);
    } else {
      localStorage.removeItem('carepulse_token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token || 'auth-token');
        return { success: true };
      } else {
        // Fallback for standalone frontend demonstration
        const matchedPreset = DEMO_PRESETS.find(p => p.email.toLowerCase() === email.toLowerCase());
        if (matchedPreset) {
          const fallbackUser = {
            id: 'usr-' + matchedPreset.roleName.toLowerCase(),
            email: matchedPreset.email,
            fullName: matchedPreset.name,
            role: matchedPreset.roleName.toLowerCase(),
            department: matchedPreset.dept,
            avatar: matchedPreset.avatar
          };
          setUser(fallbackUser);
          setToken('mock-token');
          return { success: true };
        }
        return { success: false, message: data.message || 'Authentication failed' };
      }
    } catch (err) {
      // If server is not yet running or network error, provide instant fallback
      const matchedPreset = DEMO_PRESETS.find(p => p.email.toLowerCase() === email.toLowerCase());
      if (matchedPreset) {
        setUser({
          id: 'usr-' + matchedPreset.roleName.toLowerCase(),
          email: matchedPreset.email,
          fullName: matchedPreset.name,
          role: matchedPreset.roleName.toLowerCase(),
          department: matchedPreset.dept,
          avatar: matchedPreset.avatar
        });
        setToken('mock-token');
        return { success: true };
      }
      return { success: false, message: 'Could not connect to server. Check server status or use demo accounts.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('carepulse_user');
    localStorage.removeItem('carepulse_token');
  };

  const switchPreset = (preset) => {
    const newUser = {
      id: 'usr-' + preset.roleName.toLowerCase(),
      email: preset.email,
      fullName: preset.name,
      role: preset.roleName.toLowerCase(),
      department: preset.dept,
      avatar: preset.avatar
    };
    setUser(newUser);
    setToken('mock-token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, switchPreset, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
