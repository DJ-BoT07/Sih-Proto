export const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 28.6139, lng: 77.2090 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

export const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

export const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  }
];

export const areaCoordinates = {
  "BSES Rajdhani Power Limited": { lat: 28.6139, lng: 77.2090 },
  "BSES Yamuna Power Limited": { lat: 28.6139, lng: 77.2090 },
  "Tata Power Delhi Distribution Limited": { lat: 28.7041, lng: 77.1025 },
  "New Delhi Municipal Council": { lat: 28.6139, lng: 77.2090 },
};