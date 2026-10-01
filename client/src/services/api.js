// Centralized API Client Service for CarePulse HMS

export const fetchDashboardData = async () => {
  try {
    const res = await fetch('/api/dashboard/stats');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('API fetch failed for dashboard stats, falling back to local dataset:', error);
    return null;
  }
};

export const fetchAppointments = async () => {
  try {
    const res = await fetch('/api/appointments');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('API fetch failed for appointments:', error);
    return null;
  }
};

export const createAppointmentApi = async (appointmentData) => {
  const res = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointmentData)
  });
  return await res.json();
};

export const updateAppointmentStatusApi = async (id, status) => {
  const res = await fetch(`/api/appointments/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return await res.json();
};
