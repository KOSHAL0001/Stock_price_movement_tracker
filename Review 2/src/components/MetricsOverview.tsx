import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { metricsData } from '../data/sampleData';

export const MetricsOverview: React.FC = () => {
  const formatValue = (value: number, metric: string) => {
    if (metric === 'Total Revenue') return `$${(value / 1000).toFixed(0)}K`;
    if (metric === 'Customer Growth') return value.toLocaleString();
    if (metric === 'Profit Margin' || metric === 'Market Share') return `${value}%`;
    return value.toString();
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{metric.metric}</h3>
            {getTrendIcon(metric.trend)}
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(metric.value, metric.metric)}
            </p>
            <div className="flex items-center space-x-1">
              <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-sm text-gray-500">vs last period</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};