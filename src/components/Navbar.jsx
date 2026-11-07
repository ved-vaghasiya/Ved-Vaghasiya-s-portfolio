import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Download, ExternalLink, Menu, X } from 'lucide-react';

export const Navbar = ({ currentSection, onNavigate }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST Time for Ahmedabad, India
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#101010]/80 backdrop-blur-md border-b border-neutral-900/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand / Name Treatment */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-widest text-white group-hover:text-accent-red transition-colors">
            VED VAGHASIYA
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
            DEV_AGENT
          </span>
        </a>

        {/* Center Editorial Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {portfolioData.navigation.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-1 text-xs font-mono tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className="opacity-40 text-[9px] mr-1">{item.indexNum}</span>
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent-red rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side telemetry & Resume */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
            <span className="text-neutral-600">AHMEDABAD</span>
            <span className="text-accent-red">{currentTime} IST</span>
          </div>

          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/60 rounded text-[11px] transition-colors"
          >
            <Download className="w-3 h-3 text-accent-red" />
            <span>RESUME.PDF</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-neutral-400 hover:text-white"
            title="Download Resume"
          >
            <Download className="w-4 h-4 text-accent-red" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121212] border-b border-neutral-800 px-6 py-4 space-y-3">
          {portfolioData.navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-mono text-sm py-1.5 text-neutral-300 hover:text-accent-red"
            >
              <span className="text-accent-red text-xs mr-2">{item.indexNum}</span>
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-xs font-mono text-neutral-400">
            <span>{portfolioData.personal.location}</span>
            <span className="text-accent-red">{currentTime}</span>
          </div>
        </div>
      )}
    </header>
  );
};
