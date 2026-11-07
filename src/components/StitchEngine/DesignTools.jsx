import React from 'react';

// Square handles for corners and edges
export const ResizeHandles = ({ color = "#3B82F6", size = 7 }) => {
  const half = size / 2;
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: '#ffffff',
    border: `1.5px solid ${color}`,
    position: 'absolute'
  };

  return (
    <>
      {/* 4 Corners */}
      <span style={{ ...style, top: `-${half}px`, left: `-${half}px` }} />
      <span style={{ ...style, top: `-${half}px`, right: `-${half}px` }} />
      <span style={{ ...style, bottom: `-${half}px`, left: `-${half}px` }} />
      <span style={{ ...style, bottom: `-${half}px`, right: `-${half}px` }} />

      {/* 4 Midpoints */}
      <span style={{ ...style, top: `-${half}px`, left: '50%', transform: 'translateX(-50%)' }} />
      <span style={{ ...style, bottom: `-${half}px`, left: '50%', transform: 'translateX(-50%)' }} />
      <span style={{ ...style, left: `-${half}px`, top: '50%', transform: 'translateY(-50%)' }} />
      <span style={{ ...style, right: `-${half}px`, top: '50%', transform: 'translateY(-50%)' }} />
    </>
  );
};

// Selection Outline with handles and dimension badge
export const SelectionOutline = ({
  color = "#3B82F6",
  layerName = "Frame",
  dimensions = "",
  className = "",
  showHandles = true,
  children
}) => {
  return (
    <div
      className={`relative transition-all duration-200 ${className}`}
      style={{
        border: `1px solid ${color}`,
        boxShadow: `0 0 20px ${color}20`
      }}
    >
      {showHandles && <ResizeHandles color={color} />}

      {/* Floating Tag */}
      {(layerName || dimensions) && (
        <div
          className="absolute -top-6 left-0 flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider text-white shadow-md select-none pointer-events-none z-30"
          style={{ backgroundColor: color }}
        >
          <span className="font-bold">{layerName}</span>
          {dimensions && (
            <>
              <span className="opacity-60">|</span>
              <span className="opacity-90">{dimensions}</span>
            </>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

// Alignment Guides (Magenta / Cyan Snap Lines)
export const AlignmentGuides = ({ activeGuide }) => {
  if (!activeGuide) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {/* Horizontal guide */}
      {activeGuide.y !== undefined && (
        <div
          className="absolute left-0 right-0 border-t border-dashed border-[#FF007A]/80 transition-all duration-150"
          style={{ top: `${activeGuide.y}px` }}
        >
          <span className="absolute right-6 -top-4 px-1.5 py-0.5 rounded bg-[#FF007A] text-white text-[8px] font-mono">
            Y: {Math.round(activeGuide.y)}px {activeGuide.label ? `// ${activeGuide.label}` : ''}
          </span>
        </div>
      )}

      {/* Vertical guide */}
      {activeGuide.x !== undefined && (
        <div
          className="absolute top-0 bottom-0 border-l border-dashed border-[#FF007A]/80 transition-all duration-150"
          style={{ left: `${activeGuide.x}px` }}
        >
          <span className="absolute top-16 -left-3 -rotate-90 origin-top-left px-1.5 py-0.5 rounded bg-[#FF007A] text-white text-[8px] font-mono">
            X: {Math.round(activeGuide.x)}px
          </span>
        </div>
      )}
    </div>
  );
};

// Text Caret
export const TextCaret = ({ color = "#F59E0B" }) => (
  <span
    className="inline-block w-[2px] h-[1em] animate-pulse ml-0.5 align-middle"
    style={{ backgroundColor: color }}
  />
);
