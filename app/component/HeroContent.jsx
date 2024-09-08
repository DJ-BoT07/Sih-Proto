import React from "react";
import { motion } from "framer-motion";
import { GlobeDialog } from "./GlobeDialog";

export function HeroContent({ setSelectedArea }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center z-10 mb-8 px-4 sm:px-6 md:px-8"
    >
      <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
        Electricity Load Forecasting
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-6">
        Accurate electricity load forecasting is crucial. 
        Visualize forecasted loads and explore energy consumption patterns.
      </p>
      <div className="mt-4">
        <GlobeDialog setSelectedArea={setSelectedArea} />
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mt-2 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </motion.div>
  );
}