import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { FigmaBoundingBox } from './MultiCursor/FigmaBoundingBox';
import { ExternalLink, Github, Figma, Globe, ArrowUpRight } from 'lucide-react';

export const Projects = () => {
  const { projects } = portfolioData;

  const renderIcon = (type) => {
    switch (type) {
      case 'figma':
        return <Figma className="w-4 h-4 text-[#3B82F6]" />;
      case 'github':
        return <Github className="w-4 h-4 text-white" />;
      case 'live':
        return <Globe className="w-4 h-4 text-accent-green" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="work"
      className="relative py-24 border-b border-neutral-900/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6 text-xs font-mono text-neutral-500">
          <span className="text-accent-red font-bold">// 04.00 ARCHITECTURAL SHOWCASE</span>
          <span className="text-neutral-700">|</span>
          <span>SELECTED DEPLOYMENTS & BUILDS</span>
        </div>

        {/* Heading matching reference style */}
        <div className="mb-16">
          <h2 className="font-condensed text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-none">
            SELECTED WORK
          </h2>
          <p className="mt-3 font-mono text-xs sm:text-sm text-neutral-400 max-w-2xl">
            Four distinctive projects spanning product UI/UX systems, competitive hackathon development, collaborative team design, and 3D creative web development.
          </p>
        </div>

        {/* 4 Distinct Project Layouts (Non-template visual treatments) */}
        <div className="space-y-16">
          {projects.map((proj, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={proj.id}
                className="group relative bg-[#131313] border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-700 transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Info Column (Cols 1-7) */}
                  <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <div>
                      {/* Category Tag & Index */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-accent-red/20 text-accent-red border border-accent-red/30">
                          {proj.category}
                        </span>
                        <span className="font-mono text-xs text-neutral-500">
                          PROJECT [{proj.num}/04]
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-condensed text-3xl sm:text-5xl font-black tracking-tight text-white uppercase group-hover:text-accent-red transition-colors">
                        {proj.title}
                      </h3>

                      {/* Tagline */}
                      <div className="font-mono text-xs font-semibold text-neutral-400 mt-1 mb-4">
                        // {proj.tag}
                      </div>

                      {/* Description */}
                      <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                        {proj.description}
                      </p>

                      {/* Role/Contribution */}
                      <div className="p-3 bg-neutral-950/80 border border-neutral-800/80 rounded font-mono text-xs text-neutral-300 mb-6">
                        <span className="text-accent-red font-semibold block text-[10px] uppercase mb-0.5">
                          ROLE / CONTRIBUTION:
                        </span>
                        {proj.role}
                      </div>

                      {/* Feature Metrics Pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.metrics.map((metric, mIdx) => (
                          <span
                            key={mIdx}
                            className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] font-mono rounded"
                          >
                            + {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-800/80">
                      {proj.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 rounded font-mono text-xs font-semibold tracking-wider transition-all duration-200 group/btn"
                        >
                          {renderIcon(link.type)}
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Visual Blueprint / Terminal Column (Cols 8-12) */}
                  <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <FigmaBoundingBox
                      agentColor={proj.accentColor || "#3B82F6"}
                      agentName={proj.title}
                      dimensions={`W: 460 H: 280`}
                      isActive={true}
                    >
                      <div className="h-64 sm:h-72 w-full bg-[#0d0d0d] border border-neutral-800 rounded p-5 flex flex-col justify-between font-mono text-xs overflow-hidden relative shadow-inner">
                        {/* Background CAD grid */}
                        <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />

                        {/* Top bar */}
                        <div className="flex items-center justify-between text-neutral-500 pb-3 border-b border-neutral-800/80 relative z-10">
                          <span className="text-[10px]">INSPECTION_BUFFER</span>
                          <span className="text-[10px] text-accent-red font-bold">LIVE_STATUS: VERIFIED</span>
                        </div>

                        {/* Center Graphic Graphic Motif */}
                        <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-2 text-center">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center border transition-transform duration-500 group-hover:scale-110"
                            style={{
                              borderColor: `${proj.accentColor}60`,
                              backgroundColor: `${proj.accentColor}15`
                            }}
                          >
                            <span
                              className="font-condensed text-2xl font-bold"
                              style={{ color: proj.accentColor }}
                            >
                              {proj.num}
                            </span>
                          </div>
                          <span className="font-condensed text-xl font-bold tracking-wider text-white">
                            {proj.title}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {proj.tag}
                          </span>
                        </div>

                        {/* Bottom Telemetry */}
                        <div className="relative z-10 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-500">
                          <span>LATENCY: &lt;16ms</span>
                          <span className="text-neutral-400">FPS: 60</span>
                        </div>
                      </div>
                    </FigmaBoundingBox>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
