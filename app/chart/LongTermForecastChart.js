import React, { useEffect, useState } from "react";
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
import LoadForecastModel from "../utils/loadForecastModel";
import ChartLoader from "../components/ChartLoader";

const generateForecastData = async (date, area, setLoadingProgress) => {
  const model = new LoadForecastModel();
  setLoadingProgress(10);
  await model.train(
    [[1,1,20,1000,1], [2,2,25,1100,1], [3,3,30,1200,1], [4,4,28,1300,1], [5,5,22,1400,1]],
    [[18000], [19000], [21000], [20000], [18500]]
  );
  setLoadingProgress(50);

  const baseYear = date ? date.getFullYear() : new Date().getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const areaFactors = {
    "BSES Rajdhani Power Limited": 1.1,
    "BSES Yamuna Power Limited": 1.0,
    "Tata Power Delhi Distribution Limited": 1.2,
    "New Delhi Municipal Council": 0.9
  };

  setLoadingProgress(75);

  const data = months.map((month, i) => {
    const monthIndex = i + 1;
    const seasonalFactor = 1 + 0.2 * Math.sin((i - 3) * Math.PI / 6);
    const yearlyGrowthFactor = 1 + (0.03 * (i / 12));
    const economicFactor = 1 + (0.01 * Math.sin(i * Math.PI / 6));
    const temperature = 20 + 15 * Math.sin((i - 5) * Math.PI / 6);
    const population = 1000 + i * 10;
    
    const input = [monthIndex, seasonalFactor, temperature, population, areaFactors[area] || 1];
    const baseForecast = model.predict(input);
    const forecast = baseForecast * yearlyGrowthFactor * economicFactor;
    
    const baseAreaDevelopment = 2 + i * 0.1;
    const areaDevelopment = baseAreaDevelopment * (1 + (0.05 * Math.sin(i * Math.PI / 6)));
    
    return {
      month,
      forecast: Math.round(forecast),
      areaDevelopment: Number(areaDevelopment.toFixed(2)),
    };
  });

  setLoadingProgress(100);
  return data;
};

export default function LongTermForecastChart({ date, area }) {
  const [longTermForecastData, setLongTermForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const effectiveDate = date || new Date();
    setLoadingProgress(0);
    generateForecastData(effectiveDate, area, setLoadingProgress)
      .then(data => {
        setLongTermForecastData(data);
        setLoadingProgress(100);
      })
      .catch(err => {
        console.error("Error generating long-term forecast data:", err);
        setError(err.message);
        setLoadingProgress(100);
      });
  }, [date, area]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (longTermForecastData.length === 0 || loadingProgress < 100) {
    return <ChartLoader percentage={loadingProgress} />;
  }

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