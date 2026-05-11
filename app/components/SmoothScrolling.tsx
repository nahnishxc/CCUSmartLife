"use client";
import { ReactLenis } from "lenis/react"; 

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
const lenisOptions = {
  lerp: 0.08, // 控制平滑度 (0-1)，越小越平滑但跟手感越差。0.08 ~ 0.1 之間通常最舒適
  smoothWheel: true,
  wheelMultiplier: 1, // 恢復預設值 1，不要打折滾動距離
  syncTouch: true, // 讓觸控板或手機的滑動體驗更貼近原生
  touchMultiplier: 2, // 針對觸控設備（包含平板鍵盤的觸控板）稍微放大靈敏度，抵銷泥沼感
};

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}