import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const factorsData = [
  { factor: 'Temperature', influence: 90 },
  { factor: 'Weather', influence: 65 },
  { factor: 'Day of Week', influence: 75 },
  { factor: 'Holidays', influence: 85 },
  { factor: 'Economic Activity', influence: 70 },
  { factor: 'Population Growth', influence: 60 },
  { factor: 'Area Development', influence: 80 },
];

export default function AdditionalInsightsChart() {
  return (
    <div className="w-full h-full">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">Factors Influencing Load Forecasting</h2>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={factorsData}>
          <PolarGrid stroke="#555" />
          <PolarAngleAxis dataKey="factor" stroke="#fff" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#fff" />
          <Radar name="Influence" dataKey="influence" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}