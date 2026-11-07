import React, { useState, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';

export const BottomAgentDock = ({ activeAgentId, onToggleSimulation, isSimulating }) => {
  const [fps, setFps] = useState('60');
  const [activeCount, setActiveCount] = useState(6);

  useEffect(() => {
    // Subtle realistic FPS telemetry
    const interval = setInterval(() => {
      const currentFps = Math.floor(59 + Math.random() * 2);
      setFps(currentFps.toString());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside 
      aria-label="Agentic telemetry studio dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-3 px-4 py-2 bg-[#121212]/90 backdrop-blur-md border border-neutral-800/80 rounded-full shadow-2xl text-xs font-mono text-neutral-300 pointer-events-auto transition-all duration-300 hover:border-accent-red/40"
    >
      {/* Agent status dots */}
      <div className="flex items-center gap-1.5 pr-2 border-r border-neutral-800">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-red"></span>
        </span>
        <div className="flex -space-x-1">
          {portfolioData.collaborativeAgents.map((agent) => (
            <span
              key={agent.id}
              title={`${agent.name}: ${agent.role}`}
              className="inline-block w-2.5 h-2.5 rounded-full border border-black transition-transform duration-200 hover:scale-125"
              style={{ backgroundColor: agent.color }}
            />
          ))}
        </div>
      </div>

      {/* Telemetry info matching reference */}
      <div className="flex items-center gap-2 text-[11px] tracking-wide">
        <span className="text-white font-semibold">6 AGENTS</span>
        <span className="text-neutral-600">|</span>
        <span className="text-neutral-400">18 LAYERS</span>
        <span className="text-neutral-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-accent-red/20 text-accent-red font-medium text-[10px]">
          STUDIO ACTIVE
        </span>
        <span className="text-neutral-600">|</span>
        <span className="text-neutral-400">{fps} FPS</span>
        <span className="text-neutral-600">|</span>
        <span className="text-neutral-500">1.6k OPS/S</span>
      </div>

      {/* Interactive Toggle */}
      <button
        onClick={onToggleSimulation}
        title={isSimulating ? "Pause cursor choreography" : "Resume cursor choreography"}
        className="ml-1 pl-2 border-l border-neutral-800 text-[10px] text-neutral-400 hover:text-white transition-colors"
      >
        [{isSimulating ? "CHOREO: ON" : "CHOREO: OFF"}]
      </button>
    </aside>
  );
};
