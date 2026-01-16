"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3], // Grey dots for the world
      markerColor: [1, 0.1, 0.1], // RGB for Red Marker
      glowColor: [1, 0.1, 0.1],   // RGB for Red Glow
      markers: [
        // longitude latitude
        // Centered on Central India (Bhopal coordinates: 23.25, 77.41)
        { location: [23.2599, 77.4126], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // state.phi = phi;
        // phi += 0.003; // Auto-rotation speed
        
        // Use this to center on India initially + slower rotation
        // India is roughly at theta offset, so we adjust phi to start there
        state.phi = phi + 4.2; // 4.2 offset brings India into view on load
        phi += 0.003; 
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}