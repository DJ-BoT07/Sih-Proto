import React from "react";
import { motion } from "framer-motion";
import { GlobeDialog } from "./GlobeDialog";

export function HeroContent({ setSelectedArea }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center z-10 mb-8"
    >
      <h2 className="text-2xl md:text-6xl font-bold text-white mb-4">
        Electricity Load Forecasting
      </h2>
      <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
        Accurate electricity load forecasting is crucial. 
        Visualize forecasted loads and explore energy consumption patterns.
      </p>
      <div className="mt-4">
        <GlobeDialog setSelectedArea={setSelectedArea} />
        <svg
          className="w-6 h-6 mx-auto mt-2 animate-bounce"
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