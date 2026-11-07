import React from 'react';

export const CadRuler = ({ currentSection = 'hero' }) => {
  return (
    <div
      className="fixed left-0 top-0 bottom-0 w-8 z-30 hidden lg:flex flex-col justify-between py-12 pointer-events-none select-none border-r border-neutral-900/60"
      aria-hidden="true"
    >
      {/* Top Coordinate Marker */}
      <div className="px-1 text-[9px] font-mono text-accent-red/80 -rotate-90 origin-left translate-y-8">
        AXIS_Y // 0.00
      </div>

      {/* Repeating Tick marks */}
      <div className="flex-1 w-full my-8 flex flex-col justify-around items-end pr-1 opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className={`transition-colors duration-300 ${
              i % 4 === 0
                ? 'w-3.5 h-[1px] bg-accent-red'
                : 'w-1.5 h-[1px] bg-neutral-700'
            }`}
          />
        ))}
      </div>

      {/* Active Section Coordinate */}
      <div className="px-1 text-[9px] font-mono text-neutral-500 -rotate-90 origin-left -translate-y-4">
        LOC: {currentSection.toUpperCase()}
      </div>
    </div>
  );
};
