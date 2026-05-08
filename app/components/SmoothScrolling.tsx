"use client";
import { ReactLenis } from "lenis/react"; 

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothWheel: true,
    wheelMultiplier: 0.7, 
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}