'use client';

import React, { useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { format, parse } from 'date-fns';
import dynamic from 'next/dynamic';

const CurrentLoadChart = dynamic(() => import('./CurrentLoadChart'), { ssr: false });
const ShortTermForecastChart = dynamic(() => import('./ShortTermForecastChart'), { ssr: false });
const LongTermForecastChart = dynamic(() => import('./LongTermForecastChart'), { ssr: false });
const AdditionalInsightsChart = dynamic(() => import('./AdditionalInsightsChart'), { ssr: false });

function ChartContent() {
  const searchParams = useSearchParams();
  const area = searchParams.get('area');
  const subArea = searchParams.get('subArea');
  const dateString = searchParams.get('date');

  const [selectedDate, setSelectedDate] = useState(dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : new Date());

  const formattedDate = selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Not selected';

  return (
    <div className="bg-gradient-to-br from-gray-900 to-blue-900 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white text-center">Electricity Load Forecast</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
          <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
            <p className="text-base sm:text-lg font-semibold mb-2">Area</p>
            <p className="text-lg sm:text-xl">{area}</p>
          </div>
          <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
            <p className="text-base sm:text-lg font-semibold mb-2">Sub-Area</p>
            <p className="text-lg sm:text-xl">{subArea}</p>
          </div>
          <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg sm:col-span-2 lg:col-span-1">
            <p className="text-base sm:text-lg font-semibold mb-2">Selected Date</p>
            <p className="text-lg sm:text-xl">{formattedDate}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="col-span-1 lg:col-span-2 border-4 border-blue-500 rounded-lg p-4 sm:p-6 md:p-10 shadow-lg">
          <CurrentLoadChart date={selectedDate} setDate={setSelectedDate} />
        </div>
        <div className="border-4 border-blue-500 rounded-lg p-4 sm:p-6 shadow-lg">
          <ShortTermForecastChart date={selectedDate} />
        </div>
        <div className="border-4 border-blue-500 rounded-lg p-4 sm:p-6 shadow-lg">
          <LongTermForecastChart date={selectedDate} />
        </div>
        <div className="col-span-1 lg:col-span-2 border-4 border-blue-500 rounded-lg p-4 sm:p-6 shadow-lg">
          <AdditionalInsightsChart date={selectedDate} />
        </div>
      </div>
    </div>
  );
}

export default function Chart() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChartContent />
    </Suspense>
  );
}