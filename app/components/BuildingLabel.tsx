'use client';

import React from 'react';
import { Building } from './Data/buildingsData';

interface BuildingLabelProps {
  building: Building;
  scale: number;
  onClick?: () => void;
}

const BuildingLabel: React.FC<BuildingLabelProps> = ({ building, scale, onClick }) => {
  const shouldShow = () => {
    if (building.importance === 'high') return true;
    if (scale > 1.2) return true;
    if (scale > 0.9 && building.importance === 'medium') return true;
    return false;
  };

  if (!shouldShow()) return null;

  // label center
  const labelX = building.position.x + building.size.width / 2;
  const labelY = building.position.y + building.size.height / 2;

  // ✅ 讓 SVG 自己縮放字：字體不要用 1/scale 去抵消
  const fontSize = 12;

  // ✅ 點擊更好點，但不顯示
  const hitPaddingX = Math.max(24, building.size.width * 0.35);
  const hitPaddingY = 16;

  return (
    <g
      className="building-label"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      // 如果你外層有 hover 想改顏色，這樣比較直覺
      // (不影響現有功能)
    >
      {/* 擴大可點擊範圍（透明） */}
      {onClick && (
        <rect
          x={labelX - hitPaddingX}
          y={labelY - hitPaddingY}
          width={hitPaddingX * 2}
          height={hitPaddingY * 2}
          fill="transparent"
          pointerEvents="all"
        />
      )}

      {/* 文字（無描邊，交給 SVG scale 控制） */}
      <text
        x={labelX}
        y={labelY}
        fontSize={fontSize}
        fill="#1f2937"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontWeight: 600,
          pointerEvents: 'none', // 點擊交給 g/rect
          userSelect: 'none',
        }}
      >
        {building.name}
      </text>
    </g>
  );
};

export default BuildingLabel;
