import React, { useState } from 'react';
import { regionData } from '../data/sampleData';

export const PieChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = regionData.reduce((sum, item) => sum + item.sales, 0);
  const radius = 80;
  const centerX = 120;
  const centerY = 120;

  let cumulativeAngle = 0;

  const createPath = (startAngle: number, endAngle: number, outerRadius: number) => {
    const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Regional Sales Distribution</h2>
      
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg width="240" height="240" className="overflow-visible">
            {regionData.map((region, index) => {
              const percentage = (region.sales / total) * 100;
              const angle = (percentage / 100) * 360;
              const currentRadius = hoveredIndex === index ? radius + 10 : radius;
              
              const path = createPath(cumulativeAngle, cumulativeAngle + angle, currentRadius);
              const textAngle = cumulativeAngle + angle / 2;
              const textPosition = polarToCartesian(centerX, centerY, currentRadius + 20, textAngle);
              
              cumulativeAngle += angle;

              return (
                <g key={index}>
                  <path
                    d={path}
                    fill={region.color}
                    className="transition-all duration-300 cursor-pointer"
                    style={{
                      filter: hoveredIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  {hoveredIndex === index && (
                    <g>
                      <circle
                        cx={textPosition.x}
                        cy={textPosition.y - 10}
                        r="25"
                        fill="rgba(0, 0, 0, 0.8)"
                        rx="4"
                      />
                      <text
                        x={textPosition.x}
                        y={textPosition.y - 15}
                        textAnchor="middle"
                        className="text-xs fill-white font-medium"
                      >
                        {percentage.toFixed(1)}%
                      </text>
                      <text
                        x={textPosition.x}
                        y={textPosition.y - 2}
                        textAnchor="middle"
                        className="text-xs fill-white"
                      >
                        ${(region.sales / 1000).toFixed(0)}K
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="ml-8 space-y-3">
          {regionData.map((region, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                hoveredIndex === index ? 'bg-gray-50' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: region.color }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{region.region}</p>
                <p className="text-xs text-gray-600">
                  ${(region.sales / 1000).toFixed(0)}K ({region.marketShare}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>
          <strong>Key Insight:</strong> North America leads with 35% market share, 
          while Asia Pacific shows strong potential for expansion with 25% of total sales.
        </p>
      </div>
    </div>
  );
};