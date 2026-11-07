import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../../data/portfolioData';

export const MultiCursorEngine = ({ currentSection = 'hero' }) => {
  const containerRef = useRef(null);
  const cursorRefs = useRef({});
  const pointerRefs = useRef({});
  const labelRefs = useRef({});
  const clickRippleRefs = useRef({});
  const isMountedRef = useRef(true);
  const activeTimeoutsRef = useRef([]);

  const [isMobile, setIsMobile] = useState(false);

  // Section waypoints (in viewport percentages: x = % of window.innerWidth, y = % of window.innerHeight)
  // Carefully mapped to real visible elements in each section.
  const waypoints = {
    hero: {
      ved: [
        { x: 26, y: 31, action: 'point', label: 'Aligning Name Badge', pause: 1.5 },
        { x: 30, y: 44, action: 'inspect_text', label: 'Reviewing Bio', pause: 1.8 },
        { x: 24, y: 30, action: 'idle', label: 'Identity Anchored', pause: 1.2 }
      ],
      design: [
        { x: 48, y: 15, action: 'drag_h', label: 'PORTFOLIO [W: 780 H: 120]', pause: 1.6 },
        { x: 68, y: 36, action: 'point', label: 'Portrait Frame Guide', pause: 1.4 },
        { x: 54, y: 18, action: 'idle', label: 'Kerning Verified', pause: 1.3 }
      ],
      code: [
        { x: 82, y: 36, action: 'point', label: 'Autonomous Core Spec', pause: 1.6 },
        { x: 24, y: 48, action: 'click', label: 'Injecting B.Tech Props', pause: 1.4 },
        { x: 82, y: 52, action: 'idle', label: 'Event Loops <50ms', pause: 1.2 }
      ],
      motion: [
        { x: 24, y: 60, action: 'click', label: 'INITIATE DISPATCH Hover', pause: 1.5 },
        { x: 48, y: 88, action: 'point', label: 'Telemetry Dock Link', pause: 1.2 },
        { x: 34, y: 60, action: 'idle', label: 'Easing: power2.inOut', pause: 1.4 }
      ],
      build: [
        { x: 84, y: 46, action: 'point', label: 'Hackathon Benchmark', pause: 1.5 },
        { x: 84, y: 68, action: 'point', label: 'Sync: 6/6 Allocated', pause: 1.3 },
        { x: 50, y: 88, action: 'idle', label: 'Hero Assembly Complete', pause: 1.6 }
      ],
      pixel: [
        { x: 64, y: 56, action: 'drag_h', label: 'Corner Radius 4px', pause: 1.7 },
        { x: 72, y: 26, action: 'point', label: 'Border: 1px #D93636', pause: 1.4 },
        { x: 12, y: 38, action: 'point', label: 'CAD Axis Calibration', pause: 1.5 }
      ]
    },
    profile: {
      ved: [
        { x: 30, y: 52, action: 'drag_h', label: 'Motto: LEARN. BUILD. REPEAT.', pause: 1.8 },
        { x: 25, y: 34, action: 'point', label: 'Philosophy Narrative', pause: 1.5 },
        { x: 34, y: 44, action: 'idle', label: 'Identity In Sync', pause: 1.2 }
      ],
      design: [
        { x: 72, y: 46, action: 'point', label: 'Principle 02: Aesthetic Precision', pause: 1.6 },
        { x: 68, y: 32, action: 'point', label: 'First-Principles Grid', pause: 1.4 },
        { x: 72, y: 62, action: 'idle', label: 'Principle 03: Iteration', pause: 1.3 }
      ],
      code: [
        { x: 32, y: 38, action: 'point', label: 'B.Tech CS & AI Architecture', pause: 1.7 },
        { x: 28, y: 46, action: 'inspect_text', label: 'Synthesizing Clean Code', pause: 1.5 }
      ],
      motion: [
        { x: 26, y: 24, action: 'point', label: 'Section Easing Verified', pause: 1.4 },
        { x: 44, y: 68, action: 'idle', label: 'Smooth Scroll Guide', pause: 1.3 }
      ],
      build: [
        { x: 76, y: 34, action: 'point', label: 'Bento Card Bounds', pause: 1.5 },
        { x: 76, y: 54, action: 'idle', label: 'Layout Grid Responsive', pause: 1.2 }
      ],
      pixel: [
        { x: 8, y: 36, action: 'point', label: 'Left Ruler Tick Align', pause: 1.6 },
        { x: 32, y: 56, action: 'idle', label: 'Sub-pixel Accent Red', pause: 1.4 }
      ]
    },
    skills: {
      ved: [
        { x: 24, y: 32, action: 'point', label: 'Core Languages Section', pause: 1.5 },
        { x: 28, y: 44, action: 'point', label: 'Python & JavaScript Core', pause: 1.7 }
      ],
      design: [
        { x: 76, y: 44, action: 'point', label: 'Figma & UI/UX Systems', pause: 1.8 },
        { x: 76, y: 56, action: 'idle', label: 'Design System Tokens', pause: 1.3 }
      ],
      code: [
        { x: 48, y: 42, action: 'click', label: 'React / Node.js Engine', pause: 1.6 },
        { x: 28, y: 50, action: 'inspect_text', label: 'Validating Syntax & Types', pause: 1.7 }
      ],
      motion: [
        { x: 48, y: 32, action: 'point', label: 'Hover States Smooth', pause: 1.4 },
        { x: 52, y: 62, action: 'idle', label: 'Micro-interactions 60fps', pause: 1.2 }
      ],
      build: [
        { x: 78, y: 62, action: 'point', label: 'Cybersecurity Fundamentals', pause: 1.6 },
        { x: 50, y: 54, action: 'idle', label: 'Vite Bundler Active', pause: 1.4 }
      ],
      pixel: [
        { x: 46, y: 48, action: 'drag_h', label: 'Pill Padding: 12px 20px', pause: 1.6 },
        { x: 76, y: 36, action: 'idle', label: 'Matrix Alignment 100%', pause: 1.3 }
      ]
    },
    work: {
      ved: [
        { x: 32, y: 44, action: 'point', label: 'UPSC Zone AI (Unstop Solo)', pause: 1.8 },
        { x: 28, y: 56, action: 'idle', label: 'Antigravity + Vite Build', pause: 1.4 }
      ],
      design: [
        { x: 30, y: 34, action: 'click', label: 'SKILLORA (Figma Wireframes)', pause: 1.8 },
        { x: 72, y: 42, action: 'point', label: 'Inspection Buffer [SKILLORA]', pause: 1.5 }
      ],
      code: [
        { x: 72, y: 56, action: 'point', label: 'GARBA (3D WebGL / Audio)', pause: 1.7 },
        { x: 34, y: 62, action: 'idle', label: 'PawPal (QuantaCrew Team)', pause: 1.5 }
      ],
      motion: [
        { x: 70, y: 64, action: 'click', label: 'Interactive 3D Stage', pause: 1.6 },
        { x: 26, y: 70, action: 'point', label: 'Live Deployments Active', pause: 1.3 }
      ],
      build: [
        { x: 36, y: 66, action: 'point', label: 'PawPal Component Library', pause: 1.6 },
        { x: 68, y: 38, action: 'idle', label: 'Inspection Buffer Ready', pause: 1.3 }
      ],
      pixel: [
        { x: 42, y: 40, action: 'drag_h', label: 'Card Blueprint [W: 560 H: 380]', pause: 1.7 },
        { x: 30, y: 58, action: 'idle', label: 'External Links Verified', pause: 1.3 }
      ]
    },
    experience: {
      ved: [
        { x: 44, y: 44, action: 'click', label: 'PixelRush 2026 Certificate', pause: 1.8 },
        { x: 36, y: 62, action: 'point', label: 'Official Verification Confirmed', pause: 1.5 }
      ],
      design: [
        { x: 42, y: 34, action: 'point', label: 'CodingGita Hackathon Committee', pause: 1.6 },
        { x: 72, y: 48, action: 'idle', label: 'Certificate Certificate Preview', pause: 1.4 }
      ],
      code: [
        { x: 36, y: 54, action: 'point', label: 'HTML + CSS + Figma Sprint', pause: 1.7 },
        { x: 42, y: 64, action: 'idle', label: 'Frontend Prototyping Clean', pause: 1.3 }
      ],
      motion: [
        { x: 56, y: 64, action: 'click', label: 'VIEW CERTIFICATE Hover', pause: 1.5 },
        { x: 48, y: 72, action: 'idle', label: 'Modal Animation Ready', pause: 1.2 }
      ],
      build: [
        { x: 72, y: 52, action: 'point', label: 'Certificate Badge [Active]', pause: 1.6 },
        { x: 40, y: 42, action: 'idle', label: 'October 2026 Participation', pause: 1.3 }
      ],
      pixel: [
        { x: 28, y: 46, action: 'point', label: 'Official Badge Alignment', pause: 1.5 },
        { x: 68, y: 60, action: 'idle', label: 'Certificate Frame 1:1', pause: 1.4 }
      ]
    },
    connect: {
      ved: [
        { x: 36, y: 44, action: 'click', label: 'ved.vaghasiya.cg@gmail.com', pause: 1.8 },
        { x: 28, y: 56, action: 'point', label: 'LAUNCH EMAIL CLIENT', pause: 1.5 }
      ],
      design: [
        { x: 74, y: 52, action: 'point', label: 'LinkedIn Profile Ready', pause: 1.6 },
        { x: 40, y: 60, action: 'idle', label: 'Copy Address Trigger', pause: 1.3 }
      ],
      code: [
        { x: 74, y: 40, action: 'point', label: 'GitHub Repositories', pause: 1.7 },
        { x: 74, y: 64, action: 'idle', label: 'LeetCode Activity', pause: 1.4 }
      ],
      motion: [
        { x: 28, y: 58, action: 'click', label: 'Send Transmission Pulse', pause: 1.5 },
        { x: 50, y: 86, action: 'idle', label: 'Back To Top Transition', pause: 1.3 }
      ],
      build: [
        { x: 36, y: 48, action: 'point', label: 'Direct Mailto Protocol', pause: 1.6 },
        { x: 74, y: 76, action: 'idle', label: 'Networks Connected', pause: 1.2 }
      ],
      pixel: [
        { x: 50, y: 88, action: 'point', label: 'Back To Top Anchor', pause: 1.6 },
        { x: 42, y: 52, action: 'idle', label: 'Communication Open', pause: 1.4 }
      ]
    }
  };

  // Screen size check for mobile/tablet optimization
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Choreography Controller
  useEffect(() => {
    if (isMobile) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    isMountedRef.current = true;
    const timeouts = activeTimeoutsRef.current;
    const currentSectionWaypoints = waypoints[currentSection] || waypoints.hero;

    // Convert % coordinates to current screen pixels
    const getPixelCoords = (pctX, pctY) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return {
        x: (pctX / 100) * width,
        y: (pctY / 100) * height
      };
    };

    // Staggered initial starts: real teams don't all jump at the same instant
    // Stagger start delays: 0.2s, 0.9s, 1.8s, 0.6s, 2.3s, 1.4s
    const initialStaggers = {
      ved: 0.2,
      design: 0.9,
      code: 1.8,
      motion: 0.6,
      build: 2.3,
      pixel: 1.4
    };

    // Individual agent orchestrator
    portfolioData.collaborativeAgents.forEach((agent, agentIdx) => {
      const cursorEl = cursorRefs.current[agent.id];
      const pointerEl = pointerRefs.current[agent.id];
      const labelEl = labelRefs.current[agent.id];
      const rippleEl = clickRippleRefs.current[agent.id];

      if (!cursorEl) return;

      const agentWps = currentSectionWaypoints[agent.id] || currentSectionWaypoints.ved || [
        { x: 50, y: 50, action: 'idle', label: agent.name, pause: 1.5 }
      ];

      // If this is initial render, set starting position
      if (!cursorEl._gsapInitialized) {
        const initial = getPixelCoords(agent.initialPos.x, agent.initialPos.y);
        gsap.set(cursorEl, {
          x: initial.x,
          y: initial.y,
          force3D: true
        });
        cursorEl._gsapInitialized = true;
      }

      let currentWpIndex = 0;

      const runNextStep = () => {
        if (!isMountedRef.current) return;

        const wp = agentWps[currentWpIndex];
        currentWpIndex = (currentWpIndex + 1) % agentWps.length;

        // Add subtle human jitter to avoid robotic precision (±8px)
        const jitterX = (Math.random() * 16 - 8);
        const jitterY = (Math.random() * 14 - 7);
        const target = getPixelCoords(wp.x, wp.y);
        const finalX = target.x + jitterX;
        const finalY = target.y + jitterY;

        // CINEMATIC HUMAN TRAVEL DURATION: 2.6s to 3.8s
        const travelDuration = 2.6 + Math.random() * 1.2;

        // Human-like smooth acceleration and gentle deceleration
        const travelEase = "power2.inOut";

        gsap.to(cursorEl, {
          x: finalX,
          y: finalY,
          duration: travelDuration,
          ease: travelEase,
          overwrite: "auto",
          onComplete: () => {
            if (!isMountedRef.current) return;

            // Stable, smooth label update upon arrival
            if (labelEl && wp.label) {
              labelEl.textContent = wp.label;
            }

            // HUMAN BEHAVIORS AT TARGET:
            // 1. Click action with pointer scale pulse
            if (wp.action === 'click') {
              const clickDelayTimer = setTimeout(() => {
                if (!isMountedRef.current) return;

                // Subtle pointer press
                if (pointerEl) {
                  gsap.to(pointerEl, {
                    scale: 0.86,
                    duration: 0.16,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut"
                  });
                }

                // Soft ripple animation
                if (rippleEl) {
                  gsap.fromTo(rippleEl,
                    { scale: 0.8, opacity: 0.8 },
                    { scale: 2.2, opacity: 0, duration: 0.65, ease: "power2.out" }
                  );
                }
              }, 400);
              timeouts.push(clickDelayTimer);
            }

            // 2. Slow horizontal micro-drift (e.g. reading text or measuring bounding box)
            else if (wp.action === 'drag_h' || wp.action === 'inspect_text') {
              gsap.to(cursorEl, {
                x: finalX + (wp.action === 'drag_h' ? 24 : 35),
                duration: 1.8,
                ease: "power1.inOut",
                delay: 0.3
              });
            }

            // NATURAL HUMAN PAUSE: 0.9s to 1.8s
            const naturalPause = wp.pause ? wp.pause : (0.9 + Math.random() * 0.9);

            const pauseTimer = setTimeout(() => {
              if (isMountedRef.current) {
                runNextStep();
              }
            }, naturalPause * 1000);

            timeouts.push(pauseTimer);
          }
        });
      };

      // Start each agent with its deliberate initial delay so they work asynchronously
      const startDelay = initialStaggers[agent.id] || (agentIdx * 0.4);
      const initTimer = setTimeout(() => {
        if (isMountedRef.current) {
          runNextStep();
        }
      }, startDelay * 1000);
      timeouts.push(initTimer);
    });

    // Optional gentle mouse-awareness:
    // Lead agent (VED) softly acknowledges real mouse with a slow, cinematic follow (duration: 1.2s, ease: power2.out)
    const leadEl = cursorRefs.current['ved'];
    let quickToX, quickToY;
    if (leadEl) {
      quickToX = gsap.quickTo(leadEl, "x", { duration: 1.2, ease: "power2.out" });
      quickToY = gsap.quickTo(leadEl, "y", { duration: 1.2, ease: "power2.out" });
    }

    let userMovingTimer = null;
    const handleMouseMove = (e) => {
      // Only subtly influence when cursor is in the viewport and not on initial render
      if (quickToX && quickToY && Math.random() > 0.6) {
        // Softly offset towards user's mouse position with a gentle 35px companion offset
        quickToX(e.clientX + 30);
        quickToY(e.clientY + 25);
        
        clearTimeout(userMovingTimer);
        userMovingTimer = setTimeout(() => {
          // Resumes autonomous cycle naturally
        }, 1200);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Cleanup when unmounting or when section changes
    return () => {
      isMountedRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      if (userMovingTimer) clearTimeout(userMovingTimer);

      timeouts.forEach(clearTimeout);
      timeouts.length = 0;

      portfolioData.collaborativeAgents.forEach((agent) => {
        const el = cursorRefs.current[agent.id];
        if (el) gsap.killTweensOf(el);
        const pointerEl = pointerRefs.current[agent.id];
        if (pointerEl) gsap.killTweensOf(pointerEl);
        const rippleEl = clickRippleRefs.current[agent.id];
        if (rippleEl) gsap.killTweensOf(rippleEl);
      });
    };
  }, [currentSection, isMobile]);

  // Mobile/touch optimization: disable synthetic cursors on touch screens
  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Dynamic Collaborative Agents */}
      {portfolioData.collaborativeAgents.map((agent) => (
        <div
          key={agent.id}
          ref={(el) => (cursorRefs.current[agent.id] = el)}
          className="absolute top-0 left-0 will-change-transform pointer-events-none select-none"
        >
          {/* Custom SVG Cursor Arrow */}
          <div className="relative">
            <svg
              ref={(el) => (pointerRefs.current[agent.id] = el)}
              className="transition-transform duration-150 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] origin-top-left"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 2L10.5 21L13.8 13.8L21 10.5L3 2Z"
                fill={agent.color}
                stroke="#101010"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            {/* Click Ripple Indicator for physical interaction feedback */}
            <span
              ref={(el) => (clickRippleRefs.current[agent.id] = el)}
              className="absolute -top-1.5 -left-1.5 w-7 h-7 rounded-full opacity-0 pointer-events-none"
              style={{
                border: `2px solid ${agent.color}`,
              }}
            />

            {/* Agent Badge & Dynamic Action Label */}
            <div
              className="absolute left-4 top-4 flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-semibold tracking-wider text-white shadow-xl whitespace-nowrap backdrop-blur-sm select-none"
              style={{
                backgroundColor: agent.color,
                boxShadow: `0 4px 16px ${agent.color}45`
              }}
            >
              <span className="font-bold">{agent.name}</span>
              <span className="opacity-60 text-[9px]">/</span>
              <span
                ref={(el) => (labelRefs.current[agent.id] = el)}
                className="opacity-95 font-normal text-[9px] max-w-[150px] truncate"
              >
                {agent.role}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
