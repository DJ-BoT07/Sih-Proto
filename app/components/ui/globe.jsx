useEffect(() => {
  // ... existing code ...
}, [_buildData, _buildMaterial]); // Add missing dependencies

useEffect(() => {
  // ... existing code ...
}, [defaultProps.atmosphereAltitude, defaultProps.atmosphereColor, defaultProps.polygonColor, defaultProps.showAtmosphere, startAnimation]); // Add missing dependencies

useEffect(() => {
  // ... existing code ...
}, [data.length]); // Add missing dependency

useEffect(() => {
  // ... existing code ...
}, [gl, size.height, size.width]); // Add missing dependencies