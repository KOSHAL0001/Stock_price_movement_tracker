// Sample data for comprehensive data visualization
export interface SalesData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  customers: number;
}

export interface RegionData {
  region: string;
  sales: number;
  marketShare: number;
  color: string;
}

export interface ProductData {
  product: string;
  price: number;
  satisfaction: number;
  sales: number;
}

export interface MetricData {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export const salesData: SalesData[] = [
  { month: 'Jan', revenue: 85000, expenses: 62000, profit: 23000, customers: 1200 },
  { month: 'Feb', revenue: 92000, expenses: 65000, profit: 27000, customers: 1350 },
  { month: 'Mar', revenue: 78000, expenses: 58000, profit: 20000, customers: 1100 },
  { month: 'Apr', revenue: 105000, expenses: 72000, profit: 33000, customers: 1450 },
  { month: 'May', revenue: 118000, expenses: 78000, profit: 40000, customers: 1600 },
  { month: 'Jun', revenue: 125000, expenses: 82000, profit: 43000, customers: 1720 },
  { month: 'Jul', revenue: 132000, expenses: 85000, profit: 47000, customers: 1850 },
  { month: 'Aug', revenue: 128000, expenses: 83000, profit: 45000, customers: 1780 },
  { month: 'Sep', revenue: 135000, expenses: 87000, profit: 48000, customers: 1920 },
  { month: 'Oct', revenue: 142000, expenses: 91000, profit: 51000, customers: 2050 },
  { month: 'Nov', revenue: 148000, expenses: 94000, profit: 54000, customers: 2180 },
  { month: 'Dec', revenue: 156000, expenses: 98000, profit: 58000, customers: 2300 }
];

export const regionData: RegionData[] = [
  { region: 'North America', sales: 450000, marketShare: 35, color: '#1e40af' },
  { region: 'Europe', sales: 380000, marketShare: 29, color: '#0f766e' },
  { region: 'Asia Pacific', sales: 320000, marketShare: 25, color: '#f59e0b' },
  { region: 'Latin America', sales: 142000, marketShare: 11, color: '#dc2626' }
];

export const productData: ProductData[] = [
  { product: 'Premium Suite', price: 299, satisfaction: 4.8, sales: 890 },
  { product: 'Professional', price: 199, satisfaction: 4.6, sales: 1250 },
  { product: 'Standard', price: 99, satisfaction: 4.2, sales: 2100 },
  { product: 'Basic', price: 49, satisfaction: 3.9, sales: 3200 },
  { product: 'Enterprise', price: 599, satisfaction: 4.9, sales: 420 },
  { product: 'Team', price: 149, satisfaction: 4.4, sales: 1680 }
];

export const metricsData: MetricData[] = [
  { metric: 'Total Revenue', value: 1489000, change: 18.5, trend: 'up' },
  { metric: 'Customer Growth', value: 2300, change: 12.3, trend: 'up' },
  { metric: 'Profit Margin', value: 34.2, change: -2.1, trend: 'down' },
  { metric: 'Market Share', value: 23.8, change: 4.7, trend: 'up' }
];