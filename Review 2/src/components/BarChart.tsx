import React, { useState } from 'react';
import { salesData } from '../data/sampleData';

export const BarChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'expenses' | 'profit'>('revenue');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...salesData.map(d => Math.max(d.revenue, d.expenses, d.profit)));
  const barHeight = 200;

  const getBarColor = (metric: string) => {
    switch (metric) {
      case 'revenue': return '#1e40af';
      case 'expenses': return '#dc2626';
      case 'profit': return '#0f766e';
      default: return '#6b7280';
    }
  };

  const getBarValue = (data: typeof salesData[0], metric: string) => {
    switch (metric) {
      case 'revenue': return data.revenue;
      case 'expenses': return data.expenses;
      case 'profit': return data.profit;
      default: return 0;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Monthly Financial Performance</h2>
        <div className="flex space-x-2">
          {(['revenue', 'expenses', 'profit'] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeMetric === metric
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg width="100%" height="280" className="overflow-visible">
          {salesData.map((data, index) => {
            const barValue = getBarValue(data, activeMetric);
            const height = (barValue / maxValue) * barHeight;
            const x = (index * 60) + 40;
            const y = barHeight - height + 40;

            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={40}
                  height={height}
                  fill={getBarColor(activeMetric)}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    opacity: hoveredIndex === index ? 0.8 : 1,
                    transform: hoveredIndex === index ? 'scaleY(1.05)' : 'scaleY(1)',
                    transformOrigin: `${x + 20}px ${barHeight + 40}px`
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                <text
                  x={x + 20}
                  y={barHeight + 55}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {data.month}
                </text>
                {hoveredIndex === index && (
                  <g>
                    <rect
                      x={x - 15}
                      y={y - 35}
                      width={70}
                      height={25}
                      rx={4}
                      fill="rgba(0, 0, 0, 0.8)"
                    />
                    <text
                      x={x + 20}
                      y={y - 18}
                      textAnchor="middle"
                      className="text-xs fill-white"
                    >
                      ${(barValue / 1000).toFixed(0)}K
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <g key={index}>
              <line
                x1="35"
                y1={barHeight - (ratio * barHeight) + 40}
                x2="100%"
                y2={barHeight - (ratio * barHeight) + 40}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x="30"
                y={barHeight - (ratio * barHeight) + 45}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                ${((maxValue * ratio) / 1000).toFixed(0)}K
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Key Insight:</strong> Revenue shows steady growth throughout the year with a 
          {((salesData[11].revenue - salesData[0].revenue) / salesData[0].revenue * 100).toFixed(1)}% 
          increase from January to December.
        </p>
      </div>
    </div>
  );
};