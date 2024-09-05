import React from "react";
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

const shortTermForecastData = [
  { day: 'Mon', forecast: 19000, actual: 18500, temperature: 25 },
  { day: 'Tue', forecast: 20000, actual: 20200, temperature: 27 },
  { day: 'Wed', forecast: 18000, actual: 17800, temperature: 23 },
  { day: 'Thu', forecast: 21000, actual: 21500, temperature: 28 },
  { day: 'Fri', forecast: 22000, actual: 22100, temperature: 30 },
  { day: 'Sat', forecast: 17000, actual: 16800, temperature: 22 },
  { day: 'Sun', forecast: 16000, actual: 16200, temperature: 21 },
];

export default function ShortTermForecastChart() {
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