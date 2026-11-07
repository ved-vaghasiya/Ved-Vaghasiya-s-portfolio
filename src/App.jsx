import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Connect } from './components/Connect';
import { Footer } from './components/Footer';
import { CadRuler } from './components/CadRuler';
import { MultiCursorEngine } from './components/MultiCursor/MultiCursorEngine';
import { BottomAgentDock } from './components/MultiCursor/BottomAgentDock';
import { StitchLiveConstruction } from './components/StitchEngine/StitchLiveConstruction';

export default function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isSimulating, setIsSimulating] = useState(true);
  const [isBuilding, setIsBuilding] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

  // Smooth scroll handler
  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
  };

  // Replay live Stitch construction
  const handleReplayConstruction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentSection('hero');
    setReplayKey((k) => k + 1);
    setIsBuilding(true);
  };

  // Section Observer for active indicator & cursor choreography
  useEffect(() => {
    const sectionIds = ['hero', 'profile', 'skills', 'work', 'experience', 'connect'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setCurrentSection(id);
            }
          });
        },
        { threshold: [0.3, 0.6] }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#101010] text-[#F2EEE8] selection:bg-[#D93636] selection:text-white">
      {/* GOOGLE STITCH LIVE GENERATIVE CONSTRUCTION EXPERIENCE */}
      {isBuilding && (
        <StitchLiveConstruction
          key={replayKey}
          onConstructionComplete={() => setIsBuilding(false)}
        />
      )}

      {/* CAD Architectural Ruler Guide along left margin */}
      <CadRuler currentSection={currentSection} />

      {/* Signature Multi-Cursor Engine (Ambient mode after construction) */}
      {!isBuilding && isSimulating && (
        <MultiCursorEngine currentSection={currentSection} />
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onReplayBuild={handleReplayConstruction}
      />

      {/* Page Content Flow */}
      <main className="relative pl-0 lg:pl-8">
        <Hero onNavigate={handleNavigate} />
        <Profile />
        <Skills />
        <Projects />
        <Experience />
        <Connect />
      </main>

      {/* Page Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Bottom Agent Dock (Telemetry Island) */}
      <BottomAgentDock
        isSimulating={isSimulating}
        onToggleSimulation={() => setIsSimulating(!isSimulating)}
        onReplayConstruction={handleReplayConstruction}
      />
    </div>
  );
}
