import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate('hero');
  };

  return (
    <footer className="relative py-12 bg-[#0c0c0c] border-t border-neutral-900 overflow-hidden font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          {/* Brand & Motto */}
          <div className="space-y-1 text-center md:text-left">
            <div className="font-condensed text-2xl font-bold tracking-wider text-white">
              VED VAGHASIYA.
            </div>
            <div className="text-neutral-500 text-[11px]">
              Designed and developed with curiosity.
            </div>
            <div className="text-accent-red font-semibold text-[11px] tracking-widest pt-1">
              LEARN. BUILD. REPEAT.
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 rounded transition-colors group"
          >
            <ArrowUp className="w-3.5 h-3.5 text-accent-red transition-transform group-hover:-translate-y-0.5" />
            <span>BACK TO TOP</span>
          </button>
        </div>

        {/* Bottom Credits & Telemetry */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-600 text-[10px]">
          <div>
            © {new Date().getFullYear()} VED VAGHASIYA. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3">
            <span>6-AGENT COLLABORATIVE SYSTEM</span>
            <span>•</span>
            <span>BUILT WITH REACT + VITE + TAILWIND</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
