import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const longTermForecastData = [
  { month: 'Jan', forecast: 18000, gdpGrowth: 2.1 },
  { month: 'Feb', forecast: 17000, gdpGrowth: 2.2 },
  { month: 'Mar', forecast: 16000, gdpGrowth: 2.3 },
  { month: 'Apr', forecast: 15000, gdpGrowth: 2.4 },
  { month: 'May', forecast: 16000, gdpGrowth: 2.5 },
  { month: 'Jun', forecast: 18000, gdpGrowth: 2.6 },
  { month: 'Jul', forecast: 20000, gdpGrowth: 2.7 },
  { month: 'Aug', forecast: 21000, gdpGrowth: 2.8 },
  { month: 'Sep', forecast: 19000, gdpGrowth: 2.9 },
  { month: 'Oct', forecast: 17000, gdpGrowth: 3.0 },
  { month: 'Nov', forecast: 18000, gdpGrowth: 3.1 },
  { month: 'Dec', forecast: 19000, gdpGrowth: 3.2 },
];

export default function LongTermForecastChart() {
  return (
    <div className="w-full h-full">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">Long-term Load Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={longTermForecastData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis yAxisId="left" stroke="#fff" />
          <YAxis yAxisId="right" orientation="right" stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
          <Legend />
          <Area type="monotone" dataKey="forecast" stroke="#8884d8" fill="#8884d8" yAxisId="left" />
          <Area type="monotone" dataKey="gdpGrowth" stroke="#82ca9d" fill="#82ca9d" yAxisId="right" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}