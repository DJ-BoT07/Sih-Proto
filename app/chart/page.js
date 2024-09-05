"use client";

import React from "react";
import dynamic from 'next/dynamic';

const CurrentLoadChart = dynamic(() => import('./CurrentLoadChart'), { ssr: false });
const ShortTermForecastChart = dynamic(() => import('./ShortTermForecastChart'), { ssr: false });
const LongTermForecastChart = dynamic(() => import('./LongTermForecastChart'), { ssr: false });

export default function Chart() {
  return (
    <div className="grid grid-cols-2 gap-6 p-10 bg-neutral-900 px-24">
      <div className="col-span-2 border-4 border-gray-500 rounded-lg px-10">
        <CurrentLoadChart />
      </div>
      <div className="border-4 border-gray-500 rounded-lg p-2">
        <ShortTermForecastChart />
      </div>
      <div className="border-4 border-gray-500 rounded-lg p-2">
        <LongTermForecastChart />
      </div>
    </div>
  );
}
