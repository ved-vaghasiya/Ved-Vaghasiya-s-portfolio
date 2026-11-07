import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../../data/portfolioData';
import { AgentCursor } from './AgentCursor';
import { ResizeHandles, AlignmentGuides } from './DesignTools';
import { Sparkles, Play, FastForward, CheckCircle2 } from 'lucide-react';

export const StitchLiveConstruction = ({ onConstructionComplete, isReplay = false }) => {
  const containerRef = useRef(null);
  const cursorRefs = useRef({});
  const mainTimelineRef = useRef(null);

  // Construction Stages
  const [stage, setStage] = useState('initializing'); // initializing, frame, typography, portrait, components, finalizing, done
  const [telemetryText, setTelemetryText] = useState('GOOGLE STITCH // INITIALIZING GENERATIVE CANVAS...');
  const [typedTitle, setTypedTitle] = useState('');
  const [showHeroFrame, setShowHeroFrame] = useState(false);
  const [showTypography, setShowTypography] = useState(false);
  const [showNameBadge, setShowNameBadge] = useState(false);
  const [showPortraitSlot, setShowPortraitSlot] = useState(false);
  const [portraitLoaded, setPortraitLoaded] = useState(false);
  const [showBioBlock, setShowBioBlock] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showSectionsPreview, setShowSectionsPreview] = useState(false);
  const [activeGuide, setActiveGuide] = useState(null);
  const [agentActions, setAgentActions] = useState({});

  // Fast forward / Skip button
  const handleSkip = () => {
    if (mainTimelineRef.current) {
      mainTimelineRef.current.progress(1);
    }
    setStage('done');
    onConstructionComplete();
  };

  useEffect(() => {
    // If user prefers reduced motion, complete immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleSkip();
      return;
    }

    const agents = portfolioData.collaborativeAgents;
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setStage('done');
        onConstructionComplete();
      }
    });
    mainTimelineRef.current = tl;

    // Helper: pixel coordinates from percentage of viewport
    const getPos = (pctX, pctY) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      return { x: (pctX / 100) * w, y: (pctY / 100) * h };
    };

    // Set initial agent positions outside viewport
    agents.forEach((ag) => {
      const el = cursorRefs.current[ag.id];
      if (el) {
        const init = getPos(ag.initialPos.x, ag.initialPos.y);
        gsap.set(el, { x: init.x, y: init.y, force3D: true });
      }
    });

    // ==========================================
    // SCENE 1 — EMPTY CANVAS & AGENTS ENTER (0s - 1.8s)
    // ==========================================
    tl.to({}, {
      duration: 0.3,
      onStart: () => {
        setStage('initializing');
        setTelemetryText('● STITCH ENGINE // 6 AUTONOMOUS AGENTS CONNECTING TO CANVAS...');
      }
    });

    // Agents enter with smooth staggered easing
    const entryTargets = {
      design: { x: 20, y: 22, action: 'Ready: Draw Frames' },
      typo: { x: 50, y: 18, action: 'Ready: Heading Typography' },
      visual: { x: 74, y: 32, action: 'Ready: Asset Placement' },
      layout: { x: 12, y: 55, action: 'Ready: Alignment Guides' },
      motion: { x: 30, y: 68, action: 'Ready: Easing Curves' },
      build: { x: 55, y: 78, action: 'Ready: Component Mount' }
    };

    Object.entries(entryTargets).forEach(([agentId, target], i) => {
      const el = cursorRefs.current[agentId];
      if (!el) return;
      const pt = getPos(target.x, target.y);
      tl.to(el, {
        x: pt.x,
        y: pt.y,
        duration: 1.4,
        ease: "power3.out",
        onStart: () => {
          setAgentActions(prev => ({ ...prev, [agentId]: target.action }));
        }
      }, 0.2 + i * 0.12);
    });

    // ==========================================
    // SCENE 2 — CREATING THE HERO FRAME (1.8s - 5.0s)
    // ==========================================
    tl.to({}, {
      duration: 0.2,
      onStart: () => {
        setStage('frame');
        setTelemetryText('// SCENE 02: DESIGN AGENT DRAWING MAIN HERO FRAME [W: 1140 H: 640]...');
        setShowHeroFrame(true);
      }
    }, "+=0.2");

    // DESIGN moves to draw start point
    const designEl = cursorRefs.current['design'];
    const heroStart = getPos(18, 20);
    const heroEnd = getPos(82, 85);

    tl.to(designEl, {
      x: heroStart.x,
      y: heroStart.y,
      duration: 1.2,
      ease: "power2.inOut",
      onStart: () => {
        setAgentActions(prev => ({ ...prev, design: 'Drawing: Hero Frame' }));
      }
    });

    // DESIGN drags to expand frame
    tl.to(designEl, {
      x: heroEnd.x,
      y: heroEnd.y,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: function() {
        const progress = this.progress();
        const frameEl = document.getElementById('stitch-hero-frame');
        if (frameEl) {
          frameEl.style.width = `${Math.round(200 + progress * 940)}px`;
          frameEl.style.height = `${Math.round(150 + progress * 490)}px`;
        }
      }
    });

    // LAYOUT snaps alignment guides
    const layoutEl = cursorRefs.current['layout'];
    const guidePos = getPos(50, 52);
    tl.to(layoutEl, {
      x: guidePos.x,
      y: guidePos.y,
      duration: 1.2,
      ease: "power2.out",
      onStart: () => {
        setAgentActions(prev => ({ ...prev, layout: 'Snapping Center Axis' }));
        setActiveGuide({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.52, label: 'CENTER_SNAP' });
      }
    }, "-=1.0");

    // Hide alignment guide
    tl.to({}, {
      duration: 0.3,
      onComplete: () => setActiveGuide(null)
    });

    // ==========================================
    // SCENE 3 — CREATING TYPOGRAPHY (5.0s - 9.0s)
    // ==========================================
    tl.to({}, {
      duration: 0.2,
      onStart: () => {
        setStage('typography');
        setTelemetryText('// SCENE 03: TYPO & BUILD AGENTS GENERATING HEADINGS & IDENTITY...');
        setShowTypography(true);
      }
    });

    // TYPO moves to heading area
    const typoEl = cursorRefs.current['typo'];
    const typoTarget = getPos(50, 16);
    tl.to(typoEl, {
      x: typoTarget.x,
      y: typoTarget.y,
      duration: 1.2,
      ease: "power2.inOut",
      onStart: () => {
        setAgentActions(prev => ({ ...prev, typo: 'Typing: PORTFOLIO Display' }));
      }
    });

    // Progressively reveal letters of "PORTFOLIO"
    const fullTitle = "PORTFOLIO";
    for (let c = 1; c <= fullTitle.length; c++) {
      const currentLetters = fullTitle.slice(0, c);
      tl.to({}, {
        duration: 0.16,
        onStart: () => setTypedTitle(currentLetters)
      });
    }

    // BUILD stamps down VED VAGHASIYA badge
    const buildEl = cursorRefs.current['build'];
    const badgeTarget = getPos(25, 32);
    tl.to(buildEl, {
      x: badgeTarget.x,
      y: badgeTarget.y,
      duration: 1.4,
      ease: "power3.inOut",
      onStart: () => {
        setAgentActions(prev => ({ ...prev, build: 'Stamping: VED VAGHASIYA Badge' }));
      }
    }, "-=1.0");

    tl.to({}, {
      duration: 0.2,
      onStart: () => {
        setShowNameBadge(true);
        // Soft click ripple on stamp
        const badgeEl = document.getElementById('stitch-name-badge');
        if (badgeEl) {
          gsap.fromTo(badgeEl, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" });
        }
      }
    });

    // ==========================================
    // SCENE 4 — ADDING PORTRAIT (9.0s - 12.5s)
    // ==========================================
    tl.to({}, {
      duration: 0.2,
      onStart: () => {
        setStage('portrait');
        setTelemetryText('// SCENE 04: VISUAL AGENT PLACING & POSITIONING PORTRAIT ASSET...');
        setShowPortraitSlot(true);
      }
    });

    const visualEl = cursorRefs.current['visual'];
    const portraitStart = getPos(68, 36);
    const portraitCorner = getPos(78, 62);

    tl.to(visualEl, {
      x: portraitStart.x,
      y: portraitStart.y,
      duration: 1.2,
      ease: "power2.inOut",
      onStart: () => {
        setAgentActions(prev => ({ ...prev, visual: 'Inserting: ved_portrait.png' }));
      }
    });

    // VISUAL drags corner to expand portrait card
    tl.to(visualEl, {
      x: portraitCorner.x,
      y: portraitCorner.y,
      duration: 1.6,
      ease: "power2.inOut",
      onStart: () => {
        setAgentActions(prev => ({ ...prev, visual: 'Scaling: 300×380 Portrait Aspect' }));
      },
      onComplete: () => {
        setPortraitLoaded(true);
      }
    });

    // ==========================================
    // SCENE 5 — BUILDING REST OF PAGE (12.5s - 16.0s)
    // ==========================================
    tl.to({}, {
      duration: 0.2,
      onStart: () => {
        setStage('components');
        setTelemetryText('// SCENE 05: PARALLEL SWARM ASSEMBLING BIO, STATS, ACTIONS & SECTIONS...');
        setShowBioBlock(true);
        setShowStats(true);
        setShowButtons(true);
        setShowSectionsPreview(true);
      }
    });

    // BUILD moves to bio block
    tl.to(buildEl, {
      x: getPos(28, 48).x,
      y: getPos(28, 48).y,
      duration: 1.2,
      onStart: () => setAgentActions(prev => ({ ...prev, build: 'Mounting Bio Terminal' }))
    }, "parallel-assembly");

    // MOTION moves to CTA button
    const motionEl = cursorRefs.current['motion'];
    tl.to(motionEl, {
      x: getPos(25, 62).x,
      y: getPos(25, 62).y,
      duration: 1.2,
      onStart: () => setAgentActions(prev => ({ ...prev, motion: 'Binding Dispatch Trigger' }))
    }, "parallel-assembly");

    // LAYOUT moves to top navigation
    tl.to(layoutEl, {
      x: getPos(50, 8).x,
      y: getPos(50, 8).y,
      duration: 1.2,
      onStart: () => setAgentActions(prev => ({ ...prev, layout: 'Mounting Sticky Navigation' }))
    }, "parallel-assembly");

    // DESIGN & TYPO sweep down to layout following sections
    tl.to(designEl, {
      x: getPos(35, 82).x,
      y: getPos(35, 82).y,
      duration: 1.4,
      onStart: () => setAgentActions(prev => ({ ...prev, design: 'Scaffolding 4 Projects' }))
    }, "parallel-assembly+=0.2");

    tl.to(typoEl, {
      x: getPos(65, 82).x,
      y: getPos(65, 82).y,
      duration: 1.4,
      onStart: () => setAgentActions(prev => ({ ...prev, typo: 'Generating Skill & Experience Matrices' }))
    }, "parallel-assembly+=0.3");

    // ==========================================
    // SCENE 6 — FINAL REVEAL & UNLOCK (16.0s - 18.0s)
    // ==========================================
    tl.to({}, {
      duration: 0.4,
      onStart: () => {
        setStage('finalizing');
        setTelemetryText('✔ 18 LAYERS GENERATED • AGENT VERIFICATION COMPLETE • MOUNTING LIVE SITE...');
        agents.forEach(a => {
          setAgentActions(prev => ({ ...prev, [a.id]: 'Verified ✔' }));
        });
      }
    }, "+=0.6");

    // Fade out construction overlay
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: "power2.inOut",
      delay: 0.8
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (stage === 'done') return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#101010] text-[#F2EEE8] overflow-hidden select-none"
      style={{ willChange: 'opacity' }}
    >
      {/* Subtle CAD Blueprint Canvas Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-80 pointer-events-none" />

      {/* Blueprint Cross Marks */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-6 grid-rows-6 opacity-20 text-neutral-600 font-mono text-[10px]">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">+</div>
        ))}
      </div>

      {/* Dynamic Alignment Guide Lines */}
      <AlignmentGuides activeGuide={activeGuide} />

      {/* Top Google Stitch Telemetry Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#121212]/90 border-b border-neutral-800 backdrop-blur-md px-6 flex items-center justify-between z-40 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-red"></span>
          </span>
          <span className="text-white font-bold tracking-wider">GOOGLE STITCH</span>
          <span className="text-neutral-600">|</span>
          <span className="text-accent-amber font-medium truncate max-w-lg">
            {telemetryText}
          </span>
        </div>

        {/* Action Controls: Skip Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded text-[11px] font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>SKIP TO SITE</span>
            <FastForward className="w-3.5 h-3.5 text-accent-red" />
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* LIVE GENERATIVE CANVAS: ELEMENTS BEING BUILT IN REAL TIME */}
      {/* ==================================================== */}
      <div className="relative w-full h-full pt-16 flex items-center justify-center px-4 sm:px-8">
        
        {/* HERO CONTAINER FRAME DRAWN BY 'DESIGN' */}
        {showHeroFrame && (
          <div
            id="stitch-hero-frame"
            className="relative border border-[#3B82F6] bg-neutral-950/40 rounded shadow-2xl transition-all duration-300 overflow-hidden"
            style={{ width: '400px', height: '280px', minWidth: '320px', maxWidth: '1180px', maxHeight: '680px' }}
          >
            {/* Corner & edge handles */}
            <ResizeHandles color="#3B82F6" />

            {/* Frame tag */}
            <div className="absolute -top-6 left-0 flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider text-white bg-[#3B82F6]">
              <span className="font-bold">DESIGN</span>
              <span className="opacity-60">|</span>
              <span>Frame: Hero_Container [W: 1180 H: 640]</span>
            </div>

            {/* Content inside the generated Hero Frame */}
            <div className="p-6 sm:p-8 h-full flex flex-col justify-between relative">
              
              {/* TYPOGRAPHY: Letters of PORTFOLIO typing out */}
              {showTypography && (
                <div className="absolute top-2 left-0 right-0 flex justify-center pointer-events-none select-none z-0">
                  <div className="relative">
                    <span className="font-condensed text-[12vw] sm:text-[14vw] font-black tracking-tight leading-none text-stroke-red opacity-70">
                      {typedTitle}
                    </span>
                    {typedTitle.length < 9 && (
                      <span className="inline-block w-[4px] h-[8vw] bg-[#F59E0B] animate-pulse align-middle ml-1" />
                    )}
                    {/* Typo tag */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#F59E0B] text-white text-[8px] font-mono">
                      TYPO | Text: PORTFOLIO_HEAD
                    </div>
                  </div>
                </div>
              )}

              {/* TOP IDENTITY ROW */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
                
                {/* LEFT: Name Badge + Bio + Stats */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Name Badge */}
                  {showNameBadge && (
                    <div id="stitch-name-badge" className="inline-block relative">
                      <div className="bg-accent-red text-white px-5 py-2.5 shadow-xl">
                        <h2 className="font-condensed text-3xl sm:text-4xl font-extrabold tracking-wide uppercase leading-none">
                          VED VAGHASIYA.
                        </h2>
                      </div>
                      <div className="absolute -top-5 left-0 px-2 py-0.5 rounded bg-accent-red text-white text-[8px] font-mono">
                        BUILD | Component: Identity_Badge
                      </div>
                      <div className="pt-2 flex items-center gap-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-200">
                          ASPIRING AI + FULL-STACK DEVELOPER
                        </span>
                        <span className="px-2 py-0.5 bg-accent-red/20 text-accent-red border border-accent-red/30">
                          OPEN SOURCE ENTHUSIAST
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bio block */}
                  {showBioBlock && (
                    <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded relative">
                      <p className="font-mono text-xs text-neutral-300 leading-relaxed">
                        Architecting modern web experiences, intelligent systems, and interactive digital products from first principles.
                      </p>
                      <div className="mt-2 text-[10px] font-mono text-neutral-500">
                        First-year B.Tech CS & AI at CodingGita × Swaminarayan University
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  {showButtons && (
                    <div className="flex items-center gap-3 pt-2">
                      <button className="px-5 py-2.5 bg-accent-red text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <span>INITIATE DISPATCH</span>
                      </button>
                      <button className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs uppercase">
                        EXPLORE ARCHITECTURE
                      </button>
                    </div>
                  )}

                  {/* Stats */}
                  {showStats && (
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="p-2 bg-neutral-900/60 border border-neutral-800 rounded text-[10px] font-mono">
                        <div className="text-neutral-500">MCP TOOLS</div>
                        <div className="text-white font-bold">478 Active</div>
                      </div>
                      <div className="p-2 bg-neutral-900/60 border border-neutral-800 rounded text-[10px] font-mono">
                        <div className="text-neutral-500">CORE STACK</div>
                        <div className="text-white font-bold">7-Layer</div>
                      </div>
                      <div className="p-2 bg-neutral-900/60 border border-neutral-800 rounded text-[10px] font-mono">
                        <div className="text-neutral-500">ARCHITECTURE</div>
                        <div className="text-white font-bold">100% Offline</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT: Portrait Slot Created by VISUAL */}
                {showPortraitSlot && (
                  <div className="lg:col-span-5 flex justify-center">
                    <div
                      className="relative w-[240px] sm:w-[260px] aspect-[3/4] border-2 border-dashed border-[#EC4899] bg-neutral-900/80 rounded overflow-hidden flex flex-col items-center justify-center transition-all duration-500"
                    >
                      <ResizeHandles color="#EC4899" />
                      <div className="absolute -top-5 left-0 px-2 py-0.5 rounded bg-[#EC4899] text-white text-[8px] font-mono">
                        VISUAL | Asset: ved_portrait.png
                      </div>

                      {portraitLoaded ? (
                        <div className="relative w-full h-full animate-fade-in">
                          <img
                            src="/assets/ved_portrait.png"
                            alt="Ved Vaghasiya"
                            className="w-full h-full object-cover filter grayscale contrast-125"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-accent-red/20 opacity-70" />
                          <div className="absolute bottom-2 left-2 right-2 p-2 bg-[#101010]/90 border border-neutral-800 flex justify-between items-center text-[10px] font-mono">
                            <span className="text-white">VED VAGHASIYA</span>
                            <span className="text-accent-red font-bold">[ACTIVE]</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center font-mono text-xs text-[#EC4899] p-4">
                          <div className="animate-spin w-6 h-6 border-2 border-[#EC4899] border-t-transparent rounded-full mx-auto mb-2" />
                          <span>FETCHING PORTRAIT ASSET...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* 6 DISTINCTIVE AGENT ARROW CURSORS */}
      {/* ==================================================== */}
      {portfolioData.collaborativeAgents.map((agent) => (
        <AgentCursor
          key={agent.id}
          ref={(el) => (cursorRefs.current[agent.id] = el)}
          agent={agent}
          activeAction={agentActions[agent.id]}
        />
      ))}
    </div>
  );
};
