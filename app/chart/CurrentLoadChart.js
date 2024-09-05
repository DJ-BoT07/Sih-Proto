import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const newDelhiDuckCurveData = [
  { time: '12 AM', load: 20000 },
  { time: '3 AM', load: 18000 },
  { time: '6 AM', load: 16000 },
  { time: '9 AM', load: 14000 },
  { time: '12 PM', load: 12000 },
  { time: '3 PM', load: 10000 },
  { time: '6 PM', load: 15000 },
  { time: '9 PM', load: 18000 },
  { time: '11 PM', load: 20000 },
];

export default function CurrentLoadChart() {
  return (
    <div className="w-full h-full">
      <h2 className="text-center text-xl font-bold mb-4 text-white">New Delhi Electricity Load - Duck Curve Effect</h2>
      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={newDelhiDuckCurveData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="load" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}