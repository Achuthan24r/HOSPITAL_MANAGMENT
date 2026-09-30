import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { mockDashboardStats, mockAppointments } from '../data/mockData.js';

export const getDashboardStats = async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      // Query Supabase for dynamic counts
      const [
        { count: patientCount, error: patErr },
        { count: doctorCount, error: docErr },
        { count: appointmentCount, error: aptErr },
        { count: bedCount, error: bedErr }
      ] = await Promise.all([
        supabase.from('patients').select('*', { count: 'exact', head: true }),
        supabase.from('doctors').select('*', { count: 'exact', head: true }),
        supabase.from('appointments').select('*', { count: 'exact', head: true }),
        supabase.from('beds').select('*', { count: 'exact', head: true })
      ]);

      if (patErr || docErr || aptErr || bedErr) {
        console.warn('Supabase query error, serving fallback stats:', patErr || docErr || aptErr || bedErr);
        return res.json({ success: true, data: mockDashboardStats, source: 'fallback' });
      }

      return res.json({
        success: true,
        data: {
          ...mockDashboardStats,
          totalPatients: patientCount || mockDashboardStats.totalPatients,
          doctorsTotal: doctorCount || mockDashboardStats.doctorsTotal,
          totalAppointments: appointmentCount || mockDashboardStats.totalAppointments,
          bedsTotal: bedCount || mockDashboardStats.bedsTotal
        },
        source: 'supabase'
      });
    }

    // Return realistic mock data
    res.json({
      success: true,
      data: mockDashboardStats,
      source: 'mock'
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard metrics',
      error: error.message
    });
  }
};
