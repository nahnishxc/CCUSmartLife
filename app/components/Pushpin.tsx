// components/Pushpin.tsx
import React, { useId } from "react";

// 加入 angle 參數，預設為 -8 度
export default function Pushpin({ className, angle = -8 }: { className?: string, angle?: number }) {
  const id = useId();

  return (
    <svg
      // 加上 scale-[0.85] 讓針整體變小一點，比例更精緻
      className={`absolute z-30 pointer-events-none transform scale-[0.85] ${className ?? ""}`}
      width="34"
      height="42"
      viewBox="0 0 34 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id={`${id}-head`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 9) rotate(52) scale(17 18)"
        >
          <stop offset="0" stopColor="#FF9A9A" />
          <stop offset="0.35" stopColor="#EF4444" />
          <stop offset="0.72" stopColor="#DC2626" />
          <stop offset="1" stopColor="#991B1B" />
        </radialGradient>

        <linearGradient
          id={`${id}-needle`}
          x1="16"
          y1="19"
          x2="20"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#F8FAFC" />
          <stop offset="0.35" stopColor="#CBD5E1" />
          <stop offset="0.7" stopColor="#64748B" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>

        <linearGradient
          id={`${id}-rim`}
          x1="8"
          y1="4"
          x2="25"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#FEE2E2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7F1D1D" stopOpacity="0.55" />
        </linearGradient>

        <filter
          id={`${id}-soft-shadow`}
          x="-20"
          y="-10"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="2.5" dy="5" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.28" />
        </filter>

        <filter
          id={`${id}-blur`}
          x="-20"
          y="-20"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* 將寫死的 rotate 改為傳入的 angle 變數 */}
      <g transform={`rotate(${angle} 17 20)`}>
        <ellipse cx="19" cy="31" rx="8" ry="3.2" fill="#000000" opacity="0.18" filter={`url(#${id}-blur)`} />
        <path d="M17.2 19.5L20.7 38.2C20.9 39.1 20.2 39.9 19.3 39.9C18.7 39.9 18.1 39.5 18 38.9L14.7 20.2L17.2 19.5Z" fill={`url(#${id}-needle)`} />
        <path d="M18.4 38.7L20.9 38.1L19.8 41.2L18.4 38.7Z" fill="#1F2937" />
        <ellipse cx="15.8" cy="20" rx="5.2" ry="2.4" fill="#991B1B" opacity="0.45" />
        <circle cx="15.5" cy="14" r="10.2" fill={`url(#${id}-head)`} filter={`url(#${id}-soft-shadow)`} />
        <circle cx="15.5" cy="14" r="9.6" stroke={`url(#${id}-rim)`} strokeWidth="1.4" />
        <path d="M7.4 17.1C9.1 22.4 16.9 25.3 22.4 19.7C20.8 23.2 17.6 25.1 14.3 24.5C10.9 23.8 8.1 21.1 7.4 17.1Z" fill="#7F1D1D" opacity="0.28" />
        <ellipse cx="12" cy="9" rx="3.1" ry="4.4" transform="rotate(38 12 9)" fill="#FFFFFF" opacity="0.5" />
        <ellipse cx="10.3" cy="7.1" rx="1.2" ry="1.8" transform="rotate(38 10.3 7.1)" fill="#FFFFFF" opacity="0.75" />
      </g>
    </svg>
  );
}