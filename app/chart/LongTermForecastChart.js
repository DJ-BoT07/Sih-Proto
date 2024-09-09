import React, { useMemo } from "react";
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

const generateRandomData = (date) => {
  const seed = date.getTime();
  const random = (min, max, seed) => {
    const x = Math.sin(seed) * 10000;
    return ((x - Math.floor(x)) * (max - min) + min);
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => {
    const baseForecast = 18000 + 3000 * Math.sin(i * Math.PI / 6);
    const randomFactor = random(0.95, 1.05, seed + i);
    const baseAreaDevelopment = 2 + i * 0.1;
    
    return {
      month,
      forecast: Math.round(baseForecast * randomFactor),
      areaDevelopment: Number((baseAreaDevelopment * random(0.95, 1.05, seed + i + 12)).toFixed(2)),
    };
  });
};

export default function LongTermForecastChart({ date }) {
  const longTermForecastData = useMemo(() => generateRandomData(date), [date]);

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
          <Area type="monotone" dataKey="areaDevelopment" stroke="#82ca9d" fill="#82ca9d" yAxisId="right" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}