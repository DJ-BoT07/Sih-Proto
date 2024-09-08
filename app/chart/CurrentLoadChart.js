import React from "react";
import { Calendar } from "@/components/ui/calendar"
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

// Data for New Delhi Duck Curve
const newDelhiDuckCurveData = [
  { time: '12 AM', load: 21000, solar: 0 },
  { time: '3 AM', load: 19000, solar: 0 },
  { time: '6 AM', load: 17000, solar: 1200 },
  { time: '9 AM', load: 15000, solar: 5200 },
  { time: '12 PM', load: 13000, solar: 8200 },
  { time: '3 PM', load: 11000, solar: 7200 },
  { time: '6 PM', load: 16000, solar: 2200 },
  { time: '9 PM', load: 19000, solar: 100 },
  { time: '11 PM', load: 21000, solar: 0 },
];

// Calculate average load
const averageLoad = Math.round(newDelhiDuckCurveData.reduce((sum, data) => sum + data.load, 0) / newDelhiDuckCurveData.length);

export default function CurrentLoadChart({ date, setDate }) {
  return (
    <div className="w-full h-full">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">New Delhi Electricity Load - Duck Curve Effect</h2>
      <p className="text-center text-xl font-semibold mb-4 text-white">Average Load: {averageLoad} MW</p>
      <p className="text-center text-lg mb-4 text-white">Selected Date: {date.toDateString()}</p>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4">
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={newDelhiDuckCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="time" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="load" stroke="#8884d8" strokeWidth={3} />
              <Line type="monotone" dataKey="solar" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="md:w-1/4 flex justify-center items-start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => setDate(newDate || new Date())}
            className="rounded-md border bg-white"
          />
        </div>
      </div>
    </div>
  );
}

