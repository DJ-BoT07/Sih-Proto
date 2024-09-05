"use client";

import React from "react";
import dynamic from 'next/dynamic';

const CurrentLoadChart = dynamic(() => import('./CurrentLoadChart'), { ssr: false });
const ShortTermForecastChart = dynamic(() => import('./ShortTermForecastChart'), { ssr: false });
const LongTermForecastChart = dynamic(() => import('./LongTermForecastChart'), { ssr: false });
const AdditionalInsightsChart = dynamic(() => import('./AdditionalInsightsChart'), { ssr: false });

export default function Chart() {
  return (
    <div className="grid grid-cols-2 gap-6 p-10 bg-gradient-to-br from-gray-900 to-blue-900 px-24">
      <div className="col-span-2 border-4 border-blue-500 rounded-lg px-10 shadow-lg">
        <CurrentLoadChart />
      </div>
      <div className="border-4 border-blue-500 rounded-lg p-6 shadow-lg">
        <ShortTermForecastChart />
      </div>
      <div className="border-4 border-blue-500 rounded-lg p-6 shadow-lg">
        <LongTermForecastChart />
      </div>
      <div className="col-span-2 border-4 border-blue-500 rounded-lg p-6 shadow-lg">
        <AdditionalInsightsChart />
      </div>
    </div>
  );
}
