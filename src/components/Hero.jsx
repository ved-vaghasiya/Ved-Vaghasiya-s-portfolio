import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { FigmaBoundingBox } from './MultiCursor/FigmaBoundingBox';
import { ArrowUpRight, Cpu, Layers, Terminal, ShieldCheck, MapPin } from 'lucide-react';

export const Hero = ({ onNavigate }) => {
  const { personal } = portfolioData;

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 pb-16 flex flex-col justify-center overflow-hidden border-b border-neutral-900/60"
    >
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid pointer-events-none opacity-60" />

      {/* GIANT OUTLINED "PORTFOLIO" TITLE (Matching Instagram Reference) */}
      <div className="absolute top-16 left-0 right-0 flex justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h1 className="font-condensed text-[18vw] sm:text-[16vw] font-black tracking-tight leading-none text-stroke-red opacity-70 whitespace-nowrap">
          PORTFOLIO
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Top Breadcrumb & Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4 border-b border-neutral-900/80 pb-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-accent-red font-bold">// 01.00</span>
            <span className="text-neutral-300">SEC_ABOUT INDEX</span>
            <span className="text-neutral-600">[01/06]</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-neutral-400">
              <MapPin className="w-3 h-3 text-accent-red" />
              {personal.location}
            </span>
            <span className="text-neutral-700">|</span>
            <span className="text-accent-red flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-ping" />
              SYSTEM_ONLINE
            </span>
          </div>
        </div>

        {/* Main Hero Layout (3-Column / Asymmetric Canvas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Identity, Introduction & Actions (Cols 1-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Salutation & Name Treatment */}
            <div className="space-y-2">
              <div className="text-sm font-mono text-neutral-400 flex items-center gap-2">
                <span>Hello, I'm</span>
                <span className="h-[1px] w-8 bg-neutral-700" />
              </div>

              {/* Red Solid Badge Name Block */}
              <div className="inline-block">
                <FigmaBoundingBox
                  agentColor="#D93636"
                  agentName="VED"
                  dimensions="W: 320 H: 76"
                  isActive={true}
                >
                  <div className="bg-accent-red text-white px-5 py-2.5 rounded-none shadow-[0_10px_30px_rgba(217,54,54,0.35)]">
                    <h2 className="font-condensed text-4xl sm:text-5xl font-extrabold tracking-wide uppercase leading-none">
                      VED VAGHASIYA.
                    </h2>
                  </div>
                </FigmaBoundingBox>
              </div>

              {/* Subtitle / Role */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold tracking-wider uppercase">
                  {personal.tagline}
                </span>
                <span className="px-2 py-1 bg-accent-red/10 border border-accent-red/30 text-accent-red tracking-wider uppercase">
                  {personal.badgeRole}
                </span>
              </div>
            </div>

            {/* Editable-style Bio Block with Agent Selection Box */}
            <FigmaBoundingBox
              agentColor="#10B981"
              agentName="CODE"
              dimensions="W: 520 H: 140"
              isActive={true}
            >
              <div className="p-4 bg-neutral-900/60 border border-neutral-800/80 rounded backdrop-blur-sm space-y-3">
                <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {personal.bioShort}
                </p>
                <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2 pt-2 border-t border-neutral-800/80">
                  <Terminal className="w-3.5 h-3.5 text-accent-green" />
                  <span>{personal.education}</span>
                </div>
              </div>
            </FigmaBoundingBox>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('connect')}
                className="group relative px-6 py-3 bg-accent-red hover:bg-accent-red-glow text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(217,54,54,0.4)] flex items-center gap-2"
              >
                <span>INITIATE DISPATCH</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => onNavigate('work')}
                className="px-6 py-3 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs font-medium tracking-widest uppercase border border-neutral-700/80 transition-colors"
              >
                EXPLORE ARCHITECTURE
              </button>
            </div>

            {/* Bottom Left Telemetry Counters (Matching Reference) */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-neutral-900/80">
              {personal.stats.map((stat, i) => (
                <div key={i} className="p-2.5 bg-neutral-900/40 border border-neutral-800/60 rounded">
                  <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-neutral-200 mt-0.5">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN: Actual High-Res Portrait Card (Cols 7-9) */}
          <div className="lg:col-span-3 flex justify-center">
            <FigmaBoundingBox
              agentColor="#EC4899"
              agentName="BUILD"
              dimensions="W: 300 H: 380"
              isActive={true}
            >
              <div className="relative group w-full max-w-[280px] bg-neutral-900 border border-neutral-800 rounded overflow-hidden shadow-2xl">
                {/* Image container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={personal.portraitUrl}
                    alt="Ved Vaghasiya — Portrait"
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                    loading="eager"
                  />
                  {/* Subtle red tint overlay gradient matching reference duotone */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-accent-red/10 opacity-70 group-hover:opacity-20 transition-opacity duration-500" />
                </div>

                {/* Portrait Caption & Status */}
                <div className="p-3 bg-[#131313] border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-400 font-medium">VED VAGHASIYA</span>
                  <span className="px-1.5 py-0.5 rounded bg-accent-red/20 text-accent-red text-[10px] font-semibold">
                    [ACTIVE]
                  </span>
                </div>
              </div>
            </FigmaBoundingBox>
          </div>

          {/* RIGHT COLUMN: Modular Spec Cards (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            
            {/* Card 1: Autonomous Stack */}
            <div className="p-3.5 bg-neutral-900/60 border border-neutral-800 rounded hover:border-neutral-700 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-200">
                <Cpu className="w-3.5 h-3.5 text-accent-red" />
                <span>Autonomous Core</span>
              </div>
              <p className="mt-1.5 text-[11px] font-mono text-neutral-400 leading-relaxed">
                Building multi-agent tools, prompt pipelines, and autonomous workflows.
              </p>
            </div>

            {/* Card 2: Hackathon Tested */}
            <div className="p-3.5 bg-neutral-900/60 border border-neutral-800 rounded hover:border-neutral-700 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-200">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-green" />
                <span>PixelRush 2026</span>
              </div>
              <p className="mt-1.5 text-[11px] font-mono text-neutral-400 leading-relaxed">
                48-hour competitive sprint in UI/UX and rapid frontend prototyping.
              </p>
            </div>

            {/* Card 3: Event Loop Latency */}
            <div className="p-3.5 bg-neutral-900/60 border border-neutral-800 rounded hover:border-neutral-700 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-200">
                <Layers className="w-3.5 h-3.5 text-accent-amber" />
                <span>Sub-50ms Event Loops</span>
              </div>
              <p className="mt-1.5 text-[11px] font-mono text-neutral-400 leading-relaxed">
                Hardware-accelerated transforms, zero layout thrashing, 60 FPS verified.
              </p>
            </div>

            {/* Interactive Inspector Tag */}
            <div className="p-2 bg-neutral-950 border border-dashed border-neutral-800 rounded text-[10px] font-mono text-neutral-500 flex items-center justify-between">
              <span>AGENTS IN SYNC</span>
              <span className="text-accent-red font-semibold">6 / 6 ALLOCATED</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
