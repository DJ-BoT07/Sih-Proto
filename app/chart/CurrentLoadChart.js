import React, { useMemo, useState } from "react";
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
import { areaCoordinates } from "@/app/component/globeConfig";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const generateRandomData = (date, area, subArea) => {
  const seed = date.getTime() + area.length + subArea.length;
  const random = (min, max, seed) => {
    const x = Math.sin(seed) * 10000;
    return ((x - Math.floor(x)) * (max - min) + min);
  };

  return Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const baseLoad = 15000 + 5000 * Math.sin((hour - 6) * Math.PI / 12);
    const randomFactor = random(0.9, 1.1, seed + i);
    const solarFactor = hour >= 6 && hour <= 18 ? Math.sin((hour - 6) * Math.PI / 12) : 0;
    
    // Adjusting the load to reflect the duck curve
    const adjustedLoad = baseLoad - (solarFactor * 8000 * random(0.8, 1.2, seed + i + 24));

    return {
      time: `${hour}:00`,
      load: Math.round(adjustedLoad * randomFactor),
      solar: Math.round(8000 * solarFactor * random(0.8, 1.2, seed + i + 24)),
    };
  });
};

export default function CurrentLoadChart({ date, setDate }) {
  const [area, setArea] = useState("BSES Rajdhani Power Limited");
  const [subArea, setSubArea] = useState("Vasant Kunj");

  const newDelhiDuckCurveData = useMemo(() => generateRandomData(date, area, subArea), [date, area, subArea]);
  
  const averageLoad = Math.round(newDelhiDuckCurveData.reduce((sum, data) => sum + data.load, 0) / newDelhiDuckCurveData.length);

  const subAreas = {
    "BSES Rajdhani Power Limited": [
      "Vasant Kunj", "Saket", "Vasant Vihar", "Dwarka",
      "Janakpuri", "Punjabi Bagh", "Hauz Khas", "Rajouri Garden"
    ],
    "BSES Yamuna Power Limited": [
      "Mayur Vihar", "Laxmi Nagar", "Gandhi Nagar", "Preet Vihar",
      "Shahdara", "Chandni Chowk", "Yamuna Vihar", "Krishna Nagar"
    ],
    "Tata Power Delhi Distribution Limited": [
      "Rohini", "Pitampura", "Shalimar Bagh", "Model Town",
      "Ashok Vihar", "Civil Lines", "Narela", "Jahangirpuri"
    ],
    "New Delhi Municipal Council": [
      "Connaught Place", "Chanakyapuri", "India Gate", "Lutyens' Delhi",
      "President's Estate", "Parliament House area"
    ],
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-center text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-white">New Delhi Electricity Load - Duck Curve Effect</h2>
      <p className="text-center text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-white">Average Load: {averageLoad} MW</p>
      <p className="text-center text-base sm:text-lg mb-2 sm:mb-4 text-white">Selected Date: {date.toDateString()}</p>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4">
          <ResponsiveContainer width="100%" height={400} minWidth={300}>
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
        
        <div className="w-full lg:w-1/4 flex flex-col justify-center items-start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => setDate(newDate || new Date())}
            className="rounded-md border bg-white mb-4"
          />
          <div className="flex flex-col gap-2 border-2 border-white p-2 rounded-md w-full">
            <Select onValueChange={setArea} className="mb-2">
              <SelectTrigger>
                <SelectValue placeholder="Select an area" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(subAreas).map((area) => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSubArea}>
              <SelectTrigger>
                <SelectValue placeholder="Select a sub-area" />
              </SelectTrigger>
              <SelectContent>
                {subAreas[area].map((subArea) => (
                  <SelectItem key={subArea} value={subArea}>{subArea}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

