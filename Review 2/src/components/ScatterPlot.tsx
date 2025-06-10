import React, { useState } from 'react';
import { productData } from '../data/sampleData';

export const ScatterPlot: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxPrice = Math.max(...productData.map(d => d.price));
  const maxSatisfaction = 5;
  const plotWidth = 400;
  const plotHeight = 300;
  const padding = 40;

  const getPosition = (price: number, satisfaction: number) => {
    return {
      x: (price / maxPrice) * (plotWidth - 2 * padding) + padding,
      y: plotHeight - (satisfaction / maxSatisfaction) * (plotHeight - 2 * padding) - padding
    };
  };

  const getPointSize = (sales: number) => {
    const maxSales = Math.max(...productData.map(d => d.sales));
    return 4 + (sales / maxSales) * 12;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Product Price vs Customer Satisfaction</h2>
      
      <div className="relative">
        <svg width={plotWidth} height={plotHeight + 60} className="overflow-visible">
          {/* Background grid */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, index) => (
            <g key={`grid-${index}`}>
              <line
                x1={padding}
                y1={plotHeight - (ratio * (plotHeight - 2 * padding)) - padding}
                x2={plotWidth - padding}
                y2={plotHeight - (ratio * (plotHeight - 2 * padding)) - padding}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <line
                x1={(ratio * (plotWidth - 2 * padding)) + padding}
                y1={padding}
                x2={(ratio * (plotWidth - 2 * padding)) + padding}
                y2={plotHeight - padding}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Data points */}
          {productData.map((product, index) => {
            const position = getPosition(product.price, product.satisfaction);
            const pointSize = getPointSize(product.sales);

            return (
              <g key={index}>
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={pointSize}
                  fill="#1e40af"
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    opacity: hoveredIndex === index ? 0.8 : 0.7,
                    transform: hoveredIndex === index ? 'scale(1.2)' : 'scale(1)',
                    transformOrigin: `${position.x}px ${position.y}px`
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                
                {hoveredIndex === index && (
                  <g>
                    <rect
                      x={position.x - 40}
                      y={position.y - 45}
                      width="80"
                      height="35"
                      rx="4"
                      fill="rgba(0, 0, 0, 0.8)"
                    />
                    <text
                      x={position.x}
                      y={position.y - 32}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      {product.product}
                    </text>
                    <text
                      x={position.x}
                      y={position.y - 20}
                      textAnchor="middle"
                      className="text-xs fill-white"
                    >
                      ${product.price} | ★{product.satisfaction}
                    </text>
                    <text
                      x={position.x}
                      y={position.y - 8}
                      textAnchor="middle"
                      className="text-xs fill-white"
                    >
                      {product.sales} sales
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={padding}
            y1={plotHeight - padding}
            x2={plotWidth - padding}
            y2={plotHeight - padding}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={plotHeight - padding}
            stroke="#374151"
            strokeWidth="2"
          />

          {/* X-axis labels */}
          {[0, 150, 300, 450, 600].map((price, index) => (
            <text
              key={`x-${index}`}
              x={(price / maxPrice) * (plotWidth - 2 * padding) + padding}
              y={plotHeight - padding + 20}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              ${price}
            </text>
          ))}

          {/* Y-axis labels */}
          {[1, 2, 3, 4, 5].map((rating, index) => (
            <text
              key={`y-${index}`}
              x={padding - 15}
              y={plotHeight - (rating / maxSatisfaction) * (plotHeight - 2 * padding) - padding + 4}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {rating}
            </text>
          ))}

          {/* Axis titles */}
          <text
            x={plotWidth / 2}
            y={plotHeight + 40}
            textAnchor="middle"
            className="text-sm fill-gray-700 font-medium"
          >
            Price ($)
          </text>
          <text
            x={15}
            y={plotHeight / 2}
            textAnchor="middle"
            className="text-sm fill-gray-700 font-medium"
            transform={`rotate(-90 15 ${plotHeight / 2})`}
          >
            Customer Satisfaction (★)
          </text>
        </svg>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span>Bubble size represents sales volume</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Key Insight:</strong> Higher-priced products generally maintain high satisfaction ratings, 
          while Standard and Basic products achieve the highest sales volumes despite lower satisfaction scores.
        </p>
      </div>
    </div>
  );
};