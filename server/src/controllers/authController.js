import { supabase, isSupabaseConfigured } from '../config/supabase.js';

// Predefined demo accounts for seamless evaluation
const DEMO_ACCOUNTS = {
  'admin@carepulse.org': {
    id: 'usr-admin-01',
    email: 'admin@carepulse.org',
    fullName: 'Dr. Gregory House',
    role: 'admin',
    department: 'Hospital Administration',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
  },
  'doctor@carepulse.org': {
    id: 'usr-doc-01',
    email: 'doctor@carepulse.org',
    fullName: 'Dr. Sarah Jenkins',
    role: 'doctor',
    department: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
  },
  'receptionist@carepulse.org': {
    id: 'usr-rec-01',
    email: 'receptionist@carepulse.org',
    fullName: 'Clara Oswald',
    role: 'receptionist',
    department: 'Front Desk & Admissions',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password.'
    });
  }

  try {
    // If Supabase is configured and not using demo account, authenticate via Supabase Auth
    if (isSupabaseConfigured && !DEMO_ACCOUNTS[email.toLowerCase()]) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return res.status(401).json({
          success: false,
          message: error.message
        });
      }

      return res.json({
        success: true,
        message: 'Authentication successful',
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name || 'Hospital Staff',
          role: data.user.user_metadata?.role || 'staff',
          avatar: data.user.user_metadata?.avatar || null
        },
        token: data.session?.access_token
      });
    }

    // Demo account matching or fallback
    const user = DEMO_ACCOUNTS[email.toLowerCase()];
    if (user && (password === 'password123' || password === 'admin123' || password.length >= 6)) {
      return res.json({
        success: true,
        message: 'Login successful',
        user,
        token: `mock-jwt-token-${user.id}`
      });
    }

    // Generic fallback for any email with 6+ char password in development
    if (email.includes('@') && password.length >= 6) {
      const genericUser = {
        id: 'usr-custom-' + Date.now(),
        email,
        fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: 'doctor',
        department: 'General Medicine',
        avatar: null
      };

      return res.json({
        success: true,
        message: 'Login successful',
        user: genericUser,
        token: `mock-jwt-token-${genericUser.id}`
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Use demo accounts or password with 6+ characters.'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication',
      error: error.message
    });
  }
};

export const getCurrentUser = async (req, res) => {
  // Return current demo user profile
  res.json({
    success: true,
    user: DEMO_ACCOUNTS['admin@carepulse.org']
  });
};
