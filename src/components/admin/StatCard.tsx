import React from 'react';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  trendColor?: 'green' | 'red' | 'blue';
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, trendColor = 'blue' }) => {
  const trendColors = {
    green: 'text-green-600 bg-green-100',
    red: 'text-red-600 bg-red-100',
    blue: 'text-blue-600 bg-blue-100',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="text-2xl sm:text-3xl lg:text-4xl">{icon}</div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded ${trendColors[trendColor]}`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1">{label}</h3>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;
