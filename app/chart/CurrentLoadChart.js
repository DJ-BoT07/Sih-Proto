import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ComposedChart,
  Bar
} from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import ChartLoader from "../components/ChartLoader";

const fetchCurrentLoadData = async (date, area, setLoadingProgress) => {
  setLoadingProgress(10);
  const response = await fetch('http://localhost:5000/api/forecast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'current',
      date: format(date, 'yyyy-MM-dd'),
      area: area,
    }),
  });
  
  setLoadingProgress(50);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  const data = await response.json();
  setLoadingProgress(100);

  // Add scatter and personalization
  return data.map(item => ({
    ...item,
    load: item.load + (Math.random() - 0.5) * 1000,
    solarGeneration: item.solarGeneration + (Math.random() - 0.5) * 200,
    netLoad: Math.max(0, item.netLoad + (Math.random() - 0.5) * 800),
  }));
};

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  if (!payload || payload.length === 0) return null;

  return (
    <div className="customized-tooltip-content bg-gray-800 p-2 rounded">
      <p className="total text-white">{`${label}`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toFixed(2)} kW`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function CurrentLoadChart({ date, setDate, area }) {
  const [currentLoadData, setCurrentLoadData] = useState([]);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [averageLoad, setAverageLoad] = useState(0);

  useEffect(() => {
    setLoadingProgress(0);
    fetchCurrentLoadData(date, area, setLoadingProgress)
      .then(data => {
        setCurrentLoadData(data);
        const avgLoad = data.reduce((sum, item) => sum + item.load, 0) / data.length;
        setAverageLoad(Math.round(avgLoad));
        setLoadingProgress(100);
      })
      .catch(err => {
        console.error("Error fetching current load data:", err);
        setError(err.message);
        setLoadingProgress(100);
      });
  }, [date, area]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (currentLoadData.length === 0 || loadingProgress < 100) {
    return <ChartLoader percentage={loadingProgress} />;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Current Load Distribution</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={"w-[240px] justify-start text-left font-normal"}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-white text-xl mb-4">
        Average Load: {averageLoad} kW
      </div>
      <div className="flex-grow" style={{ minHeight: "1000px" }}>
        <ResponsiveContainer width="100%" height="50%">
          <LineChart
            data={currentLoadData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip content={renderTooltipContent} />
            <Legend />
            <Line type="monotone" dataKey="load" name="Total Load" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="solarGeneration" name="Solar Generation" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="netLoad" name="Net Load" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        
        <ResponsiveContainer width="100%" height="40%">
          <ComposedChart
            data={currentLoadData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip content={renderTooltipContent} />
            <Legend />
            <Bar dataKey="solarGeneration" name="Solar Generation" fill="#82ca9d" />
            <Bar dataKey="netLoad" name="Grid Load" fill="#8884d8" />
            <Line type="monotone" dataKey="load" name="Total Load" stroke="#ff7300" strokeWidth={2} />
            <Brush />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

