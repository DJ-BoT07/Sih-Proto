import React, { useEffect, useState } from "react";
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
import LoadForecastModel from "../utils/loadForecastModel";
import ChartLoader from "../components/ChartLoader";

const generateForecastData = async (date, area, setLoadingProgress) => {
  const model = new LoadForecastModel();
  setLoadingProgress(10);
  await model.train(
    [[1,1,20,1000,1], [2,2,25,1100,1], [3,3,30,1200,1], [4,4,28,1300,1], [5,5,22,1400,1], [6,0.9,18,1450,1], [7,0.9,19,1500,1]],
    [[19000], [20000], [22000], [21000], [19500], [18000], [18500]]
  );
  setLoadingProgress(50);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const baseLoad = 19000;

  const areaFactors = {
    "BSES Rajdhani Power Limited": 1.1,
    "BSES Yamuna Power Limited": 1.0,
    "Tata Power Delhi Distribution Limited": 1.2,
    "New Delhi Municipal Council": 0.9
  };

  setLoadingProgress(75);

  const data = days.map((day, i) => {
    const weekdayFactor = i < 5 ? 1.1 : 0.9;
    const dayTimeFactor = 1 + 0.2 * Math.sin(i * Math.PI / 3.5);
    const temperature = 20 + 10 * Math.sin((i - 2) * Math.PI / 3.5);
    const population = 1000 + i * 5;

    const input = [i + 1, weekdayFactor, temperature, population, areaFactors[area] || 1];
    const forecast = Math.max(0, model.predict(input) * dayTimeFactor);
    const actual = forecast * (1 + (Math.sin(i) * 0.05));
    
    return {
      day,
      forecast: Math.round(forecast),
      actual: Math.round(actual),
      temperature: Math.round(temperature),
    };
  });

  setLoadingProgress(100);
  return data;
};

export default function ShortTermForecastChart({ date, area }) {
  const [shortTermForecastData, setShortTermForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setLoadingProgress(0);
    generateForecastData(date, area, setLoadingProgress)
      .then(data => {
        setShortTermForecastData(data);
        setLoadingProgress(100);
      })
      .catch(err => {
        console.error("Error generating short-term forecast data:", err);
        setError(err.message);
        setLoadingProgress(100);
      });
  }, [date, area]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (shortTermForecastData.length === 0 || loadingProgress < 100) {
    return <ChartLoader percentage={loadingProgress} />;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-center text-2xl font-bold mb-4 text-white">Short-term Load Forecast</h2>
      <div className="flex-grow" style={{ minHeight: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
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
    </div>
  );
}