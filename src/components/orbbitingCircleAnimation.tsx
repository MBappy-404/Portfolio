"use client";

import React, { useState } from "react";

// ...existing code...

// Wrapper for individual icons to give them the glassy container style and hover effects
const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isHovered?: boolean;
  animationDelay?: number;
}) => (
  <div
    className={`
        backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300
        ${
          isHighlighted
            ? "dark:bg-gray-700/50 bg-gray-100/80 border border-blue-400/50 dark:shadow-blue-500/20 shadow-blue-400/30 shadow-2xl animate-breathing-glow"
            : `dark:bg-gray-800 bg-white border border-gray-200/50 dark:border-white/10 ${
                !isHovered && "animate-float"
              }`
        }
        ${
          isHovered
            ? "dark:bg-gray-600/50 bg-gray-200/80 border-blue-400/60 scale-110 dark:shadow-blue-400/30 shadow-blue-400/40 shadow-2xl"
            : "dark:hover:bg-white/10 hover:bg-gray-100/80 dark:hover:border-white/20 hover:border-gray-300/60"
        }
        ${className}
    `}
    style={{ animationDelay: `${animationDelay}s` }}
  >
    {children}
  </div>
);

// The grid of icons, now reusable and dynamic
interface IconGridProps {
  icons: { id: number; component: React.ReactNode }[];
  centerIcon?: React.ReactNode;
}

const IconGrid: React.FC<IconGridProps> = ({ icons, centerIcon }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Layout calculation
  const count = icons.length;
  const radius = 160;
  const centralIconRadius = 48;
  const outerIconRadius = 40;
  const svgSize = 380;
  const svgCenter = svgSize / 2;

  return (
    <div className="relative w-[380px] h-[380px] scale-75 md:scale-100">
      <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
        <g>
          {icons.map((icon, i) => {
            const angleInDegrees = -90 + i * (360 / count);
            const angleInRadians = angleInDegrees * (Math.PI / 180);
            const startX = svgCenter + centralIconRadius * Math.cos(angleInRadians);
            const startY = svgCenter + centralIconRadius * Math.sin(angleInRadians);
            const endX = svgCenter + (radius - outerIconRadius) * Math.cos(angleInRadians);
            const endY = svgCenter + (radius - outerIconRadius) * Math.sin(angleInRadians);
            return (
              <line
                key={`line-${icon.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={hoveredId === icon.id ? "#3B82F6" : "#6B7280"}
                strokeWidth="2"
                className="transition-all duration-300 dark:stroke-gray-600"
                style={{ opacity: hoveredId === icon.id ? 1 : 0.3 }}
              />
            );
          })}
        </g>
      </svg>
      <div className="absolute top-1/2 left-1/2">
        {/* Center Icon */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
          <IconWrapper className="w-24 h-24" isHighlighted={true} animationDelay={0}>
            {centerIcon}
          </IconWrapper>
        </div>
        {/* Outer Icons */}
        {icons.map((icon, i) => {
          const angleInDegrees = -90 + i * (360 / count);
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);
          const iconStyle = { transform: `translate(${x}px, ${y}px)` };
          return (
            <div
              key={icon.id}
              className="absolute z-10"
              style={iconStyle}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="-translate-x-1/2 -translate-y-1/2">
                <IconWrapper
                  className="w-20 h-20"
                  isHovered={hoveredId === icon.id}
                  animationDelay={i * 0.2}
                >
                  {icon.component}
                </IconWrapper>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

 



export default function NexusOrb({ icons , centerIcon }: any) {
  return (
    <div className="w-full flex items-center justify-center font-sans p-8 overflow-hidden">
     
      <div className="relative z-10 container mx-auto flex items-center justify-center">
        <IconGrid icons={icons} centerIcon={centerIcon} />
      </div>
    </div>
  );
}
