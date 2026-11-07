import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { FigmaBoundingBox } from './MultiCursor/FigmaBoundingBox';
import { Compass, Lightbulb, Repeat } from 'lucide-react';

export const Profile = () => {
  const { profile } = portfolioData;

  const icons = [Compass, Lightbulb, Repeat];

  return (
    <section
      id="profile"
      className="relative py-24 border-b border-neutral-900/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow & Coordinate */}
        <div className="flex items-center gap-2 mb-6 text-xs font-mono text-neutral-500">
          <span className="text-accent-red font-bold">{profile.eyebrow}</span>
          <span className="text-neutral-700">|</span>
          <span>IDENTITY & OPERATING PRINCIPLES</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-condensed text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase mb-12">
          {profile.heading}
        </h2>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Authentic Story & Motto Quote (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Story Paragraphs */}
            <div className="space-y-4 font-mono text-neutral-300 text-sm sm:text-base leading-relaxed">
              {profile.story.map((paragraph, idx) => (
                <p key={idx} className="border-l-2 border-neutral-800 pl-4 py-1">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature Motto Callout */}
            <FigmaBoundingBox
              agentColor="#D93636"
              agentName="VED"
              dimensions="W: 560 H: 90"
              isActive={true}
            >
              <div className="p-6 bg-neutral-900/80 border-l-4 border-accent-red border-y border-r border-neutral-800 rounded-r shadow-xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  CORE OPERATING MOTTO
                </span>
                <div className="font-condensed text-2xl sm:text-3xl font-bold tracking-wider text-accent-red">
                  "{profile.quote}"
                </div>
              </div>
            </FigmaBoundingBox>
          </div>

          {/* Right Column: 3 Core Principles Bento (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            {profile.principles.map((p, i) => {
              const IconComponent = icons[i] || Compass;
              return (
                <div
                  key={i}
                  className="p-5 bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 rounded transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                    <span className="text-accent-red font-semibold">{p.tag}</span>
                    <IconComponent className="w-4 h-4 text-neutral-500 group-hover:text-accent-red transition-colors" />
                  </div>
                  <h3 className="font-mono text-base font-bold text-white mb-1.5 group-hover:text-neutral-100">
                    {p.title}
                  </h3>
                  <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
