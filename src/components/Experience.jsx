import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { FigmaBoundingBox } from './MultiCursor/FigmaBoundingBox';
import { Award, Calendar, Layers, Eye, X, CheckCircle } from 'lucide-react';

export const Experience = () => {
  const { experience } = portfolioData;
  const item = experience.items[0]; // PixelRush 2026
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="experience"
      className="relative py-24 border-b border-neutral-900/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6 text-xs font-mono text-neutral-500">
          <span className="text-accent-red font-bold">{experience.eyebrow}</span>
          <span className="text-neutral-700">|</span>
          <span>COMPETITIVE BENCHMARKS</span>
        </div>

        {/* Heading */}
        <div className="mb-12">
          <h2 className="font-condensed text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-none">
            {experience.heading}
          </h2>
          <p className="mt-3 font-mono text-xs sm:text-sm text-neutral-400">
            {experience.subtitle}
          </p>
        </div>

        {/* Editorial Certificate / Participation Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Details & Tech Stack (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 bg-[#141414] border border-neutral-800 rounded-lg space-y-6">
              
              {/* Event Badge & Title */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-amber/10 border border-accent-amber/30 text-accent-amber font-semibold">
                    HACKATHON PARTICIPATION
                  </span>
                  <span className="text-neutral-500">// CODINGGITA</span>
                </div>
                <h3 className="font-condensed text-3xl sm:text-4xl font-bold text-white tracking-wide">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs font-mono text-neutral-400">
                  <Calendar className="w-3.5 h-3.5 text-accent-red" />
                  <span>{item.dates}</span>
                  <span className="text-neutral-600">|</span>
                  <span>{item.organizer}</span>
                </div>
              </div>

              {/* Narrative description */}
              <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed border-l-2 border-neutral-700 pl-4">
                {item.description}
              </p>

              {/* Technologies Leveraged */}
              <div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  COMPETITIVE FOCUS & TOOLING:
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-neutral-900 border border-neutral-700/60 rounded text-xs font-mono text-neutral-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certificate Verification Trigger */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-mono text-accent-green">
                  <CheckCircle className="w-4 h-4" />
                  Official Certificate Verified
                </span>

                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-accent-red hover:bg-accent-red-glow text-white font-mono text-xs font-bold tracking-wider rounded transition-all duration-200 shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>VIEW CERTIFICATE</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Certificate Preview (Cols 8-12) */}
          <div className="lg:col-span-5 flex justify-center">
            <FigmaBoundingBox
              agentColor="#F59E0B"
              agentName="MOTION"
              dimensions="W: 420 H: 300"
              isActive={true}
            >
              <div
                onClick={() => setModalOpen(true)}
                className="group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 shadow-2xl transition-all duration-300 hover:border-accent-amber/60"
              >
                <img
                  src={item.certificateImg}
                  alt="PixelRush 2026 Certificate — Ved Jigneshbhai Vaghasiya"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white font-mono text-xs font-semibold">
                  <Eye className="w-6 h-6 text-accent-amber" />
                  <span>CLICK TO EXPAND CERTIFICATE</span>
                </div>
              </div>
            </FigmaBoundingBox>
          </div>

        </div>

      </div>

      {/* High-Resolution Certificate Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="PixelRush 2026 Certificate Modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-neutral-800 font-mono text-xs">
              <span className="text-neutral-300 font-semibold">
                CODINGGITA × PIXELRUSH 2026 — OFFICIAL CERTIFICATE
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close Certificate Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Full Image */}
            <div className="p-2 sm:p-4 bg-black flex justify-center">
              <img
                src={item.certificateImg}
                alt="PixelRush 2026 Full Certificate"
                className="max-h-[80vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
