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

const newDelhiDuckCurveData = [
  { time: '12 AM', load: 20000, solar: 0, wind: 2000 },
  { time: '3 AM', load: 18000, solar: 0, wind: 2500 },
  { time: '6 AM', load: 16000, solar: 1000, wind: 2000 },
  { time: '9 AM', load: 14000, solar: 5000, wind: 1500 },
  { time: '12 PM', load: 12000, solar: 8000, wind: 1000 },
  { time: '3 PM', load: 10000, solar: 7000, wind: 1500 },
  { time: '6 PM', load: 15000, solar: 2000, wind: 2000 },
  { time: '9 PM', load: 18000, solar: 0, wind: 2500 },
  { time: '11 PM', load: 20000, solar: 0, wind: 2000 },
];

const averageLoad = Math.round(newDelhiDuckCurveData.reduce((sum, data) => sum + data.load, 0) / newDelhiDuckCurveData.length);

export default function CurrentLoadChart() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className="w-full h-full">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">New Delhi Electricity Load - Duck Curve Effect</h2>
      <p className="text-center text-xl font-semibold mb-4 text-white">Average Load: {averageLoad} MW</p>
      
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
              <Line type="monotone" dataKey="wind" stroke="#82ca9d" strokeWidth={2} />
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

