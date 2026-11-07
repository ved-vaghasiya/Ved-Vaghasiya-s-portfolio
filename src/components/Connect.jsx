import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { FigmaBoundingBox } from './MultiCursor/FigmaBoundingBox';
import { Mail, Github, Linkedin, Code, Copy, Check, ArrowUpRight } from 'lucide-react';

export const Connect = () => {
  const { connect } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(connect.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
    LeetCode: Code,
    'Direct Mail': Mail
  };

  return (
    <section
      id="connect"
      className="relative py-24 border-b border-neutral-900/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6 text-xs font-mono text-neutral-500">
          <span className="text-accent-red font-bold">{connect.eyebrow}</span>
          <span className="text-neutral-700">|</span>
          <span>COMMUNICATION CHANNEL</span>
        </div>

        {/* Heading */}
        <div className="mb-12">
          <h2 className="font-condensed text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-none">
            {connect.heading}
          </h2>
          <p className="mt-3 font-mono text-xs sm:text-sm text-neutral-400 max-w-xl">
            {connect.subheading}
          </p>
        </div>

        {/* Main Transmission Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Email CTA Box (Cols 1-7) */}
          <div className="lg:col-span-7">
            <FigmaBoundingBox
              agentColor="#D93636"
              agentName="VED"
              dimensions="W: 580 H: 220"
              isActive={true}
            >
              <div className="p-8 bg-neutral-900/80 border border-neutral-800 rounded-lg space-y-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    PRIMARY CONTACT ENDPOINT
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-white break-all">
                    {connect.email}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={`mailto:${connect.email}`}
                    className="px-6 py-3 bg-accent-red hover:bg-accent-red-glow text-white font-mono text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 flex items-center gap-2 shadow-[0_4px_20px_rgba(217,54,54,0.35)]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>LAUNCH EMAIL CLIENT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={handleCopy}
                    className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/80 rounded font-mono text-xs font-medium tracking-wider flex items-center gap-2 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-accent-green" />
                        <span className="text-accent-green">EMAIL COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-neutral-400" />
                        <span>COPY ADDRESS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </FigmaBoundingBox>
          </div>

          {/* Right Column: Social Profiles List (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
              EXTERNAL PROFILES & NETWORKS
            </div>

            {connect.socials.map((social, idx) => {
              const Icon = socialIcons[social.name] || ArrowUpRight;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 rounded flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-950 rounded border border-neutral-800 group-hover:border-accent-red/40 transition-colors">
                      <Icon className="w-4 h-4 text-neutral-300 group-hover:text-accent-red transition-colors" />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-white group-hover:text-neutral-100">
                        {social.name}
                      </div>
                      <div className="font-mono text-[11px] text-neutral-500">
                        {social.handle}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
