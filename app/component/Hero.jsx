"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { HeroContent } from "./HeroContent";
import { globeConfig, sampleArcs, areaCoordinates } from "./globeConfig";

const World = dynamic(() => import("../../components/ui/globe").then((mod) => mod.World), {
  ssr: false,
});

export function GlobeDemo() {
  const [selectedArea, setSelectedArea] = useState(null);

  const updatedGlobeConfig = {
    ...globeConfig,
    autoRotate: !selectedArea,
    initialPosition: selectedArea ? areaCoordinates[selectedArea] : globeConfig.initialPosition,
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <HeroContent setSelectedArea={setSelectedArea} />
      <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] relative">
        <World data={sampleArcs} globeConfig={updatedGlobeConfig} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </div>
  );
}
