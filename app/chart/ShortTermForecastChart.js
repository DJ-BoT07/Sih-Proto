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
  { day: 'Mon', forecast: 19000, actual: 18500 },
  { day: 'Tue', forecast: 20000, actual: 20200 },
  { day: 'Wed', forecast: 18000, actual: 17800 },
  { day: 'Thu', forecast: 21000, actual: 21500 },
  { day: 'Fri', forecast: 22000, actual: 22100 },
  { day: 'Sat', forecast: 17000, actual: 16800 },
  { day: 'Sun', forecast: 16000, actual: 16200 },
];

export default function ShortTermForecastChart() {
  return (
    <div className="w-full h-full">
      <h2 className="text-center text-xl font-bold mb-4 text-white">Short-term Load Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={shortTermForecastData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="actual" fill="#82ca9d" />
          <Line type="monotone" dataKey="forecast" stroke="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}