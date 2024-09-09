import React from 'react';

const ChartLoader = ({ percentage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="mt-2 text-white font-semibold">{`${Math.round(percentage)}% Loaded`}</p>
    </div>
  );
};

export default ChartLoader;