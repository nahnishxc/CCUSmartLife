// components/MaskingTape.tsx
import React from "react";

interface MaskingTapeProps {
  className?: string;
  color?: string;
  width?: string;     
  opacity?: number;   
  rotation?: number;  
  flipX?: boolean;    // 新增：是否水平翻轉
  flipY?: boolean;    // 新增：是否垂直翻轉
}

export default function MaskingTape({ 
  className = "", 
  color = "bg-[#dff3ff]/50", 
  width = "80px",            
  opacity = 1,               
  rotation = 0,
  flipX = false,
  flipY = false
}: MaskingTapeProps) {
  
  // 計算翻轉的 scale 值
  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;

  return (
    <div 
      className={`absolute h-7 backdrop-blur-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.06)] z-20 ${color} ${className}`} 
      style={{
        width: width,
        opacity: opacity,
        // 同時套用旋轉和翻轉
        transform: `rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`, 
        // 稍微不規則的手撕邊緣
        clipPath: "polygon(0 2%, 98% 0, 100% 98%, 2% 100%)"
      }}
    />
  );
}