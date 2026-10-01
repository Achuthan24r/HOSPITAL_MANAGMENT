import React from 'react';

export const Badge = ({ status, type = 'status' }) => {
  const getBadgeClass = (statusStr) => {
    const s = (statusStr || '').toLowerCase();
    if (s.includes('completed') || s.includes('available') || s.includes('active') || s.includes('routine')) {
      return 'badge-success';
    }
    if (s.includes('progress') || s.includes('confirmed') || s.includes('admitted')) {
      return 'badge-info';
    }
    if (s.includes('waiting') || s.includes('scheduled') || s.includes('urgent') || s.includes('pending')) {
      return 'badge-warning';
    }
    if (s.includes('emergency') || s.includes('cancelled') || s.includes('icu') || s.includes('surgery')) {
      return 'badge-danger';
    }
    return 'badge-info';
  };

  return (
    <span className={`badge ${getBadgeClass(status)}`}>
      <span className="badge-dot"></span>
      <span>{status}</span>
    </span>
  );
};

export default Badge;
