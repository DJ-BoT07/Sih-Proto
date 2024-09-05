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
  { month: 'Jan', forecast: 18000 },
  { month: 'Feb', forecast: 17000 },
  { month: 'Mar', forecast: 16000 },
  { month: 'Apr', forecast: 15000 },
  { month: 'May', forecast: 16000 },
  { month: 'Jun', forecast: 18000 },
  { month: 'Jul', forecast: 20000 },
  { month: 'Aug', forecast: 21000 },
  { month: 'Sep', forecast: 19000 },
  { month: 'Oct', forecast: 17000 },
  { month: 'Nov', forecast: 18000 },
  { month: 'Dec', forecast: 19000 },
];

export default function LongTermForecastChart() {
  return (
    <div className="w-full h-full">
      <h2 className="text-center text-xl font-bold mb-4 text-white">Long-term Load Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={longTermForecastData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="forecast" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}