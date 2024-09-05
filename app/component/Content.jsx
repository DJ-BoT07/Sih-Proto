"use client";
import { GlobeDemo } from "./Hero";
// import Features, { BentoDemo, FeaturesSectionDemo } from "./Features";

function Content() {
  return (
    <div className="w-full bg-black">
      <div className="h-screen flex items-center justify-center p-5">
        <GlobeDemo />
      </div>
    </div>
  )
}

export default Content