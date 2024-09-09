import React, { useMemo } from "react";
import {
  ComposedChart,
  Line,
  Bar,
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

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => {
    const baseForecast = 19000 + 2000 * Math.sin(i * Math.PI / 3.5);
    const randomFactor = random(0.95, 1.05, seed + i);
    const temperature = 20 + 10 * Math.sin(i * Math.PI / 3.5);
    
    return {
      day,
      forecast: Math.round(baseForecast * randomFactor),
      actual: Math.round(baseForecast * random(0.98, 1.02, seed + i + 7)),
      temperature: Math.round(temperature * random(0.9, 1.1, seed + i + 14)),
    };
  });
};

export default function ShortTermForecastChart({ date }) {
  const shortTermForecastData = useMemo(() => generateRandomData(date), [date]);

  return (
    <div className="w-full h-full">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">Short-term Load Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={shortTermForecastData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="day" stroke="#fff" />
          <YAxis yAxisId="left" stroke="#fff" />
          <YAxis yAxisId="right" orientation="right" stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
          <Legend />
          <Bar dataKey="actual" fill="#82ca9d" yAxisId="left" />
          <Line type="monotone" dataKey="forecast" stroke="#8884d8" strokeWidth={2} yAxisId="left" />
          <Line type="monotone" dataKey="temperature" stroke="#ffc658" strokeWidth={2} yAxisId="right" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}