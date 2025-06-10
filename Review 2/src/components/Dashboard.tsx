import React, { useState } from 'react';
import { BarChart } from './BarChart';
import { PieChart } from './PieChart';
import { ScatterPlot } from './ScatterPlot';
import { LineChart } from './LineChart';
import { MetricsOverview } from './MetricsOverview';
import { Filter, Download, BarChart3 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleExport = () => {
    // Simulate export functionality
    const data = {
      timestamp: new Date().toISOString(),
      dashboard: 'Business Analytics Dashboard',
      filters: activeFilter
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Business Analytics Dashboard</h1>
                <p className="text-sm text-gray-600">Comprehensive data visualization and insights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Data</option>
                  <option value="q1">Q1 2024</option>
                  <option value="q2">Q2 2024</option>
                  <option value="q3">Q3 2024</option>
                  <option value="q4">Q4 2024</option>
                </select>
              </div>
              
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Overview */}
        <MetricsOverview />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BarChart />
          <PieChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ScatterPlot />
          <LineChart />
        </div>

        {/* Data Story Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Executive Summary & Key Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Revenue Growth</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Our business has shown remarkable growth with revenue increasing by 84% from January to December. 
                This consistent upward trend indicates strong market demand and effective business strategies.
              </p>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-teal-900 mb-3">Market Position</h3>
              <p className="text-teal-800 text-sm leading-relaxed">
                North America remains our strongest market with 35% share, while Asia Pacific presents 
                significant expansion opportunities. Regional diversification is key to sustained growth.
              </p>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">Product Strategy</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                Premium products maintain high satisfaction (4.8★) despite higher prices, while volume 
                products drive sales. Balanced portfolio optimization can maximize both revenue and satisfaction.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4">Strategic Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Immediate Actions</h4>
                <ul className="text-sm space-y-1 opacity-90">
                  <li>• Expand Asia Pacific operations</li>
                  <li>• Optimize pricing for Standard tier</li>
                  <li>• Enhance customer retention programs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Long-term Strategy</h4>
                <ul className="text-sm space-y-1 opacity-90">
                  <li>• Develop premium product line</li>
                  <li>• Invest in customer satisfaction initiatives</li>
                  <li>• Explore emerging market opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 Business Analytics Dashboard. Built with React, TypeScript, and Tailwind CSS.</p>
            <p className="mt-1">Interactive data visualization for comprehensive business insights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};