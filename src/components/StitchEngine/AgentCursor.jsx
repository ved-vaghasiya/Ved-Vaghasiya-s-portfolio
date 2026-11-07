import React, { forwardRef } from 'react';

export const AgentCursor = forwardRef(({ agent, activeAction, isClicking = false }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 pointer-events-none select-none z-50 will-change-transform"
      style={{
        transform: `translate3d(${agent.initialPos.x}vw, ${agent.initialPos.y}vh, 0)`
      }}
    >
      <div className="relative">
        {/* Proper Arrow Pointer SVG (High fidelity collaborative cursor) */}
        <svg
          className="cursor-pointer origin-top-left transition-transform duration-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          style={{ transform: isClicking ? 'scale(0.85)' : 'scale(1)' }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 2L10.5 21L13.8 13.8L21 10.5L3 2Z"
            fill={agent.color}
            stroke="#101010"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Dynamic Click Pulse / Ripple */}
        <span
          className="click-ripple absolute -top-1.5 -left-1.5 w-7 h-7 rounded-full opacity-0 pointer-events-none"
          style={{ border: `2px solid ${agent.color}` }}
        />

        {/* Small Agent Name & Live Action Badge */}
        <div
          className="absolute left-4 top-4 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider text-white shadow-xl whitespace-nowrap backdrop-blur-sm select-none"
          style={{
            backgroundColor: agent.color,
            boxShadow: `0 4px 16px ${agent.color}45`
          }}
        >
          <span>{agent.name}</span>
          <span className="opacity-60 text-[9px]">/</span>
          <span className="agent-action-text font-normal opacity-95 text-[9px] max-w-[170px] truncate">
            {activeAction || agent.role}
          </span>
        </div>
      </div>
    </div>
  );
});

AgentCursor.displayName = 'AgentCursor';
