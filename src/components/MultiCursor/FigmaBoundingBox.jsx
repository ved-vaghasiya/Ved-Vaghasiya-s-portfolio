import React from 'react';

export const FigmaBoundingBox = ({
  children,
  label = "SELECTION",
  dimensions = "W: 420 H: 260",
  agentColor = "#3B82F6",
  agentName = "DESIGN",
  isActive = true,
  className = ""
}) => {
  return (
    <div className={`relative transition-all duration-300 ${className}`}>
      {/* Dynamic selection outline when active */}
      {isActive && (
        <div
          className="absolute -inset-1.5 pointer-events-none rounded transition-opacity duration-300 z-20"
          style={{
            border: `1px solid ${agentColor}`,
            boxShadow: `0 0 15px ${agentColor}20`
          }}
        >
          {/* Corner resize handles */}
          <span
            className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-none border"
            style={{ borderColor: agentColor }}
          />
          <span
            className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-none border"
            style={{ borderColor: agentColor }}
          />
          <span
            className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-none border"
            style={{ borderColor: agentColor }}
          />
          <span
            className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-none border"
            style={{ borderColor: agentColor }}
          />

          {/* Floating Dimension & Inspector Pill */}
          <div
            className="absolute -bottom-6 left-0 flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider text-white shadow-md select-none"
            style={{
              backgroundColor: agentColor,
            }}
          >
            <span className="font-bold">{agentName}</span>
            <span className="opacity-70">|</span>
            <span className="opacity-90">{dimensions}</span>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
