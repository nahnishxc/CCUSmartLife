// components/SketchedLine.tsx
import React from "react";

export default function SketchedLine({ className, color = "stroke-[#eadfce]" }: { className?: string, color?: string }) {
  // 使用一個粗糙的、微微抖動的手繪曲線 SVG，不使用完美實線
  return (
    <svg 
      className={`absolute z-10 w-full h-8 ${className}`} 
      viewBox="0 0 400 32" 
      fill="none" 
      preserveAspectRatio="none"
    >
      <path 
        d="M0 16C20 16 20 12.5 40 12.5C60 12.5 60 19.5 80 19.5C100 19.5 100 16 120 16C140 16 140 12.5 160 12.5C180 12.5 180 19.5 200 19.5C220 19.5 220 16 240 16C260 16 260 12.5 280 12.5C300 12.5 300 19.5 320 19.5C340 19.5 340 16 360 16C380 16 380 12.5 400 12.5" 
        className={color}
        strokeWidth="1.5" 
        strokeLinecap="round" 
        style={{
          // 這行關鍵，加上一點粗糙顆粒感
          filter: "drop-shadow(1px 1px 0px rgba(0,0,0,0.02))"
        }}
      />
    </svg>
  );
}