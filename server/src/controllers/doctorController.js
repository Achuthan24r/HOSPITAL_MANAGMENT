import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { mockDoctors } from '../data/mockData.js';

export const getDoctors = async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('doctors')
        .select('*');

      if (!error && data && data.length > 0) {
        return res.json({ success: true, data, count: data.length });
      }
    }

    res.json({ success: true, data: mockDoctors, count: mockDoctors.length });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch doctors', error: err.message });
  }
};
