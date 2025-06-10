import React, { useState } from 'react';
import { salesData } from '../data/sampleData';

export const LineChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxCustomers = Math.max(...salesData.map(d => d.customers));
  const chartWidth = 500;
  const chartHeight = 250;
  const padding = 40;

  const getPointPosition = (index: number, customers: number) => {
    return {
      x: (index / (salesData.length - 1)) * (chartWidth - 2 * padding) + padding,
      y: chartHeight - (customers / maxCustomers) * (chartHeight - 2 * padding) - padding
    };
  };

  const pathData = salesData.map((data, index) => {
    const position = getPointPosition(index, data.customers);
    return `${index === 0 ? 'M' : 'L'} ${position.x} ${position.y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Growth Trend</h2>
      
      <div className="relative">
        <svg width={chartWidth} height={chartHeight + 60} className="overflow-visible">
          {/* Background grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <g key={`grid-${index}`}>
              <line
                x1={padding}
                y1={chartHeight - (ratio * (chartHeight - 2 * padding)) - padding}
                x2={chartWidth - padding}
                y2={chartHeight - (ratio * (chartHeight - 2 * padding)) - padding}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={chartHeight - (ratio * (chartHeight - 2 * padding)) - padding + 4}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {Math.round(maxCustomers * ratio).toLocaleString()}
              </text>
            </g>
          ))}

          {/* Area under the curve */}
          <defs>
            <linearGradient id="customerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f766e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path
            d={`${pathData} L ${chartWidth - padding} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`}
            fill="url(#customerGradient)"
          />

          {/* Main line */}
          <path
            d={pathData}
            stroke="#0f766e"
            strokeWidth="3"
            fill="none"
            className="transition-all duration-300"
          />

          {/* Data points */}
          {salesData.map((data, index) => {
            const position = getPointPosition(index, data.customers);
            
            return (
              <g key={index}>
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={hoveredIndex === index ? 8 : 5}
                  fill="#0f766e"
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                
                {hoveredIndex === index && (
                  <g>
                    <rect
                      x={position.x - 35}
                      y={position.y - 45}
                      width="70"
                      height="30"
                      rx="4"
                      fill="rgba(0, 0, 0, 0.8)"
                    />
                    <text
                      x={position.x}
                      y={position.y - 32}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      {data.month}
                    </text>
                    <text
                      x={position.x}
                      y={position.y - 18}
                      textAnchor="middle"
                      className="text-xs fill-white"
                    >
                      {data.customers.toLocaleString()} customers
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* X-axis labels */}
          {salesData.map((data, index) => {
            if (index % 2 === 0) { // Show every other month
              const position = getPointPosition(index, data.customers);
              return (
                <text
                  key={`label-${index}`}
                  x={position.x}
                  y={chartHeight - padding + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {data.month}
                </text>
              );
            }
            return null;
          })}

          {/* Axes */}
          <line
            x1={padding}
            y1={chartHeight - padding}
            x2={chartWidth - padding}
            y2={chartHeight - padding}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={chartHeight - padding}
            stroke="#374151"
            strokeWidth="2"
          />

          {/* Axis titles */}
          <text
            x={chartWidth / 2}
            y={chartHeight + 45}
            textAnchor="middle"
            className="text-sm fill-gray-700 font-medium"
          >
            Month
          </text>
          <text
            x={15}
            y={chartHeight / 2}
            textAnchor="middle"
            className="text-sm fill-gray-700 font-medium"
            transform={`rotate(-90 15 ${chartHeight / 2})`}
          >
            Number of Customers
          </text>
        </svg>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Key Insight:</strong> Consistent customer growth with a 
          {(((salesData[11].customers - salesData[0].customers) / salesData[0].customers) * 100).toFixed(1)}% 
          increase year-over-year, indicating strong market adoption and retention.
        </p>
      </div>
    </div>
  );
};