import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { FigmaBoundingBox } from './MultiCursor/FigmaBoundingBox';
import { Code2, Layout, Database, Sparkles } from 'lucide-react';

export const Skills = () => {
  const { skills } = portfolioData;

  const categoryIcons = [Code2, Layout, Database];

  return (
    <section
      id="skills"
      className="relative py-24 border-b border-neutral-900/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6 text-xs font-mono text-neutral-500">
          <span className="text-accent-red font-bold">{skills.eyebrow}</span>
          <span className="text-neutral-700">|</span>
          <span>CAPABILITY MATRIX</span>
        </div>

        {/* Heading & Disclaimer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-condensed text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase">
              {skills.heading}
            </h2>
          </div>
          <div className="max-w-md font-mono text-xs text-neutral-400 bg-neutral-900/60 border border-neutral-800 p-3 rounded">
            <span className="text-accent-red font-semibold block mb-0.5">// TRANSPARENT NOTE</span>
            {skills.disclaimer}
          </div>
        </div>

        {/* Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.categories.map((category, catIdx) => {
            const Icon = categoryIcons[catIdx] || Code2;
            const isHighlighted = catIdx === 0;

            return (
              <div
                key={catIdx}
                className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-5">
                    <span className="font-mono text-xs font-bold tracking-wider text-neutral-200">
                      {category.name}
                    </span>
                    <Icon className="w-4 h-4 text-accent-red" />
                  </div>

                  {/* Skill Items */}
                  <div className="space-y-3">
                    {category.items.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 bg-neutral-950/60 border border-neutral-800/60 rounded flex items-center justify-between group hover:border-neutral-700 transition-colors"
                      >
                        <div>
                          <div className="font-mono text-sm font-semibold text-white group-hover:text-accent-red transition-colors">
                            {skill.name}
                          </div>
                          <div className="font-mono text-[10px] text-neutral-500">
                            {skill.tag}
                          </div>
                        </div>

                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                            skill.level === 'Proficient'
                              ? 'bg-accent-green/10 border-accent-green/30 text-accent-green'
                              : skill.level === 'Intermediate'
                              ? 'bg-accent-blue/10 border-accent-blue/30 text-accent-blue'
                              : 'bg-accent-amber/10 border-accent-amber/30 text-accent-amber'
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro telemetry footer */}
                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>CATEGORY [{catIdx + 1}/3]</span>
                  <span className="text-neutral-400">STATUS: PRACTICING</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
