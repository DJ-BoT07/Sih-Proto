'use client';

import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { format, parse } from 'date-fns';
import dynamic from 'next/dynamic';

const CurrentLoadChart = dynamic(() => import('./CurrentLoadChart'), { ssr: false });
const ShortTermForecastChart = dynamic(() => import('./ShortTermForecastChart'), { ssr: false });
const LongTermForecastChart = dynamic(() => import('./LongTermForecastChart'), { ssr: false });
const AdditionalInsightsChart = dynamic(() => import('./AdditionalInsightsChart'), { ssr: false });

export default function Chart() {
  const searchParams = useSearchParams();
  const area = searchParams.get('area');
  const subArea = searchParams.get('subArea');
  const dateString = searchParams.get('date');

  // State to manage the selected date
  const [selectedDate, setSelectedDate] = useState(dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : new Date());

  // Format the selected date for display
  const formattedDate = selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Not selected';

  return (
    <div className="bg-gradient-to-br from-gray-900 to-blue-900 min-h-screen">
      <div className="p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Electricity Load Forecast</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
          <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">Area</p>
            <p className="text-xl">{area}</p>
          </div>
          <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">Sub-Area</p>
            <p className="text-xl">{subArea}</p>
          </div>
          <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">Selected Date</p>
            <p className="text-xl">{formattedDate}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
        <div className="col-span-1 md:col-span-2 border-4 border-blue-500 rounded-lg px-10 shadow-lg">
          <CurrentLoadChart date={selectedDate} setDate={setSelectedDate} />
        </div>
        <div className="border-4 border-blue-500 rounded-lg p-6 shadow-lg">
          <ShortTermForecastChart />
        </div>
        <div className="border-4 border-blue-500 rounded-lg p-6 shadow-lg">
          <LongTermForecastChart />
        </div>
        <div className="col-span-1 md:col-span-2 border-4 border-blue-500 rounded-lg p-6 shadow-lg">
          <AdditionalInsightsChart />
        </div>
      </div>
    </div>
  );
}