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

// Sample data - you should replace this with real data
const currentLoadData = [
  { time: '12 AM', load: 18000 },
  { time: '3 AM', load: 15000 },
  { time: '6 AM', load: 17000 },
  { time: '9 AM', load: 20000 },
  { time: '12 PM', load: 17000 },
  { time: '3 PM', load: 14000 },
  { time: '6 PM', load: 16000 },
  { time: '9 PM', load: 21000 },
  { time: '11 PM', load: 20000 },
];

const shortTermForecastData = [
  { day: 'Mon', forecast: 19000 },
  { day: 'Tue', forecast: 20000 },
  { day: 'Wed', forecast: 18000 },
  { day: 'Thu', forecast: 21000 },
  { day: 'Fri', forecast: 22000 },
  { day: 'Sat', forecast: 17000 },
  { day: 'Sun', forecast: 16000 },
];

const longTermForecastData = [
  { month: 'Jan', forecast: 18000 },
  { month: 'Feb', forecast: 17000 },
  { month: 'Mar', forecast: 16000 },
  { month: 'Apr', forecast: 15000 },
  { month: 'May', forecast: 16000 },
  { month: 'Jun', forecast: 18000 },
  { month: 'Jul', forecast: 20000 },
  { month: 'Aug', forecast: 21000 },
  { month: 'Sep', forecast: 19000 },
  { month: 'Oct', forecast: 17000 },
  { month: 'Nov', forecast: 18000 },
  { month: 'Dec', forecast: 19000 },
];

export default function ChartComponent({ chartType }) {
  const getChartConfig = () => {
    switch (chartType) {
      case 'main':
        return {
          data: currentLoadData,
          xKey: 'time',
          yKey: 'load',
          title: 'Current Load Distribution',
          color: '#8884d8'
        };
      case 'shortTerm':
        return {
          data: shortTermForecastData,
          xKey: 'day',
          yKey: 'forecast',
          title: 'Short-term Load Forecast',
          color: '#82ca9d'
        };
      case 'longTerm':
        return {
          data: longTermForecastData,
          xKey: 'month',
          yKey: 'forecast',
          title: 'Long-term Load Forecast',
          color: '#ffc658'
        };
      default:
        return {
          data: currentLoadData,
          xKey: 'time',
          yKey: 'load',
          title: 'Electricity Load',
          color: '#8884d8'
        };
    }
  };

  const { data, xKey, yKey, title, color } = getChartConfig();

  return (
    <div className="w-full h-full">
      <h2 className="text-center text-xl font-bold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}