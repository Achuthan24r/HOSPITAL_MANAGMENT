import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

export const StatCard = ({ 
  title, 
  value, 
  trend, 
  trendPositive = true, 
  icon: Icon, 
  colorScheme = 'blue',
  subtext 
}) => {
  return (
    <div className={`stat-card color-scheme-${colorScheme}`}>
      <div className="stat-card-top">
        <span className="stat-title">{title}</span>
        <div className="stat-icon-wrapper">
          <Icon size={22} />
        </div>
      </div>

      <div className="stat-card-main">
        <span className="stat-value">{value}</span>
      </div>

      <div className="stat-card-bottom">
        {trend && (
          <span className={`stat-trend ${trendPositive ? 'positive' : 'negative'}`}>
            {trendPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trend}</span>
          </span>
        )}
        <span className="stat-subtext">{subtext}</span>
      </div>
    </div>
  );
};

export default StatCard;
