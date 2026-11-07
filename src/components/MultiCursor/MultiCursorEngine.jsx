import React, { useEffect, useRef, useState, useCallback } from 'react';
import { portfolioData } from '../../data/portfolioData';

export const MultiCursorEngine = ({ currentSection = 'hero' }) => {
  const containerRef = useRef(null);
  const cursorRefs = useRef({});
  const boundingBoxRef = useRef(null);
  const inspectorTagRef = useRef(null);
  const [isSimulating, setIsSimulating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState({ visible: true, text: 'PORTFOLIO', color: '#3B82F6' });

  // Agent target waypoints per section (percentages of viewport or container)
  const waypoints = {
    hero: {
      ved: [
        { x: 28, y: 32, action: 'point', label: 'Aligning Name Badge', duration: 3.5 },
        { x: 32, y: 44, action: 'select', label: 'Reviewing Bio', duration: 4.0 },
        { x: 24, y: 30, action: 'idle', label: 'Observing Assembly', duration: 3.0 }
      ],
      design: [
        { x: 52, y: 16, action: 'box', label: 'PORTFOLIO [W: 780 H: 120]', duration: 3.0 },
        { x: 70, y: 38, action: 'point', label: 'Positioning Portrait Frame', duration: 4.5 },
        { x: 45, y: 18, action: 'idle', label: 'Kerning Check', duration: 3.0 }
      ],
      code: [
        { x: 26, y: 48, action: 'select', label: 'Injecting Props', duration: 4.0 },
        { x: 20, y: 64, action: 'click', label: 'Mounting MCP Core', duration: 3.5 },
        { x: 34, y: 52, action: 'idle', label: 'Stack Verified', duration: 3.0 }
      ],
      motion: [
        { x: 30, y: 58, action: 'hover', label: 'Easing: cubic-bezier(0.16, 1, 0.3, 1)', duration: 3.5 },
        { x: 50, y: 92, action: 'point', label: 'Scroll Trigger Ready', duration: 4.0 },
        { x: 22, y: 56, action: 'click', label: 'Button Pulse', duration: 3.0 }
      ],
      build: [
        { x: 86, y: 36, action: 'box', label: 'Spec Card [320×140]', duration: 4.0 },
        { x: 84, y: 52, action: 'point', label: 'Telemetry Link OK', duration: 3.5 },
        { x: 50, y: 88, action: 'idle', label: 'Assembly Complete', duration: 3.0 }
      ],
      pixel: [
        { x: 62, y: 58, action: 'drag', label: 'Corner Radius 4px', duration: 3.5 },
        { x: 74, y: 26, action: 'point', label: 'Border: 1px #D93636', duration: 3.0 },
        { x: 65, y: 62, action: 'idle', label: 'Sub-pixel Grid Match', duration: 3.5 }
      ]
    },
    profile: {
      ved: [
        { x: 25, y: 35, action: 'point', label: 'Core Philosophy', duration: 4 },
        { x: 35, y: 55, action: 'select', label: 'Motto: LEARN. BUILD. SOLVE.', duration: 4 }
      ],
      design: [
        { x: 65, y: 40, action: 'box', label: 'Card Layout [400×220]', duration: 3.5 },
        { x: 75, y: 60, action: 'point', label: 'Principle 02', duration: 4 }
      ],
      code: [
        { x: 30, y: 70, action: 'point', label: 'B.Tech CS & AI Architecture', duration: 4 }
      ],
      motion: [
        { x: 20, y: 45, action: 'idle', label: 'Fade In Up', duration: 3 }
      ],
      build: [
        { x: 80, y: 30, action: 'box', label: 'Grid Bounds', duration: 3.5 }
      ],
      pixel: [
        { x: 15, y: 30, action: 'point', label: 'CAD Tick Mark Align', duration: 4 }
      ]
    },
    skills: {
      ved: [
        { x: 30, y: 40, action: 'point', label: 'Core Proficiency: Python & JS', duration: 4 }
      ],
      design: [
        { x: 70, y: 45, action: 'point', label: 'Figma & Design Systems', duration: 3.5 }
      ],
      code: [
        { x: 45, y: 55, action: 'box', label: 'React / Node.js Engine', duration: 3.5 },
        { x: 55, y: 35, action: 'select', level: 'Intermediate', label: 'Validating Syntax', duration: 4 }
      ],
      motion: [
        { x: 25, y: 60, action: 'idle', label: 'Skill Grid Hover FX', duration: 3 }
      ],
      build: [
        { x: 80, y: 50, action: 'point', label: 'Cybersecurity Fundamentals', duration: 4 }
      ],
      pixel: [
        { x: 40, y: 65, action: 'drag', label: 'Pill Padding: 12px 20px', duration: 3.5 }
      ]
    },
    work: {
      ved: [
        { x: 35, y: 45, action: 'point', label: 'UPSC Zone AI (Hackathon Solo)', duration: 4 }
      ],
      design: [
        { x: 20, y: 35, action: 'box', label: 'SKILLORA (Figma Design)', duration: 4 }
      ],
      code: [
        { x: 75, y: 50, action: 'point', label: 'GARBA (3D WebGL / Audio)', duration: 3.5 }
      ],
      motion: [
        { x: 70, y: 65, action: 'click', label: 'Interactive 3D Stage', duration: 4 }
      ],
      build: [
        { x: 25, y: 65, action: 'point', label: 'PawPal (QuantaCrew Team)', duration: 4 }
      ],
      pixel: [
        { x: 40, y: 40, action: 'box', label: 'Card 02 [W: 560 H: 380]', duration: 3.5 }
      ]
    },
    experience: {
      ved: [
        { x: 45, y: 45, action: 'click', label: 'PixelRush 2026 Certificate', duration: 4 }
      ],
      design: [
        { x: 55, y: 35, action: 'point', label: 'CodingGita UI/UX Hackathon', duration: 4 }
      ],
      code: [
        { x: 40, y: 60, action: 'point', label: 'HTML + CSS + Figma Sprint', duration: 3.5 }
      ],
      motion: [
        { x: 50, y: 70, action: 'idle', label: 'Timeline Connector', duration: 3 }
      ],
      build: [
        { x: 60, y: 50, action: 'box', label: 'Certificate Badge [Active]', duration: 4 }
      ],
      pixel: [
        { x: 30, y: 45, action: 'point', label: '5-6 October 2026', duration: 3.5 }
      ]
    },
    connect: {
      ved: [
        { x: 50, y: 42, action: 'click', label: 'ved.vaghasiya.cg@gmail.com', duration: 4 }
      ],
      design: [
        { x: 40, y: 60, action: 'point', label: 'LinkedIn Profile', duration: 3.5 }
      ],
      code: [
        { x: 60, y: 60, action: 'point', label: 'GitHub Repositories', duration: 3.5 }
      ],
      motion: [
        { x: 50, y: 75, action: 'hover', label: 'Send Transmission', duration: 3 }
      ],
      build: [
        { x: 35, y: 50, action: 'box', label: 'Direct Mailto Trigger', duration: 4 }
      ],
      pixel: [
        { x: 50, y: 85, action: 'point', label: 'Back To Top Anchor', duration: 3.5 }
      ]
    }
  };

  // Check screen width for mobile optimization
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop using requestAnimationFrame and smooth interpolation
  useEffect(() => {
    if (isMobile || !isSimulating) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrameId;
    const currentSectionWaypoints = waypoints[currentSection] || waypoints.hero;

    // Internal state per agent
    const agents = portfolioData.collaborativeAgents.map((agent) => {
      const agentWaypoints = currentSectionWaypoints[agent.id] || currentSectionWaypoints.ved || [{ x: 50, y: 50, label: 'Active' }];
      return {
        id: agent.id,
        name: agent.name,
        color: agent.color,
        // Start near assigned positions
        currentX: agent.initialPos.x + (Math.random() * 6 - 3),
        currentY: agent.initialPos.y + (Math.random() * 6 - 3),
        targetX: agentWaypoints[0].x,
        targetY: agentWaypoints[0].y,
        waypoints: agentWaypoints,
        waypointIdx: 0,
        nextChangeTime: Date.now() + (agentWaypoints[0].duration || 3) * 1000,
        currentAction: agentWaypoints[0].action || 'idle',
        currentLabel: agentWaypoints[0].label || agent.role,
        isClicking: false
      };
    });

    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const now = Date.now();

      agents.forEach((agent) => {
        // Time to transition to next waypoint?
        if (now > agent.nextChangeTime) {
          agent.waypointIdx = (agent.waypointIdx + 1) % agent.waypoints.length;
          const nextWp = agent.waypoints[agent.waypointIdx];
          agent.targetX = nextWp.x + (Math.random() * 2 - 1);
          agent.targetY = nextWp.y + (Math.random() * 2 - 1);
          agent.currentAction = nextWp.action || 'idle';
          agent.currentLabel = nextWp.label || agent.name;
          agent.nextChangeTime = now + (nextWp.duration || 3.5) * 1000;

          // Trigger click pulse if action is click
          if (nextWp.action === 'click') {
            agent.isClicking = true;
            setTimeout(() => { agent.isClicking = false; }, 400);
          }
        }

        // Smooth spring-like lerp interpolation
        const speed = 2.2;
        agent.currentX += (agent.targetX - agent.currentX) * speed * dt;
        agent.currentY += (agent.targetY - agent.currentY) * speed * dt;

        // Directly update DOM transform to avoid React render cycles
        const el = cursorRefs.current[agent.id];
        if (el) {
          el.style.transform = `translate3d(${agent.currentX}vw, ${agent.currentY}vh, 0)`;
          
          // Update label text if needed
          const labelEl = el.querySelector('.agent-action-label');
          if (labelEl && labelEl.innerText !== agent.currentLabel) {
            labelEl.innerText = agent.currentLabel;
          }

          // Active click pulse effect
          const pointerEl = el.querySelector('.cursor-pointer');
          if (pointerEl) {
            if (agent.isClicking) {
              pointerEl.style.transform = 'scale(0.85)';
            } else {
              pointerEl.style.transform = 'scale(1)';
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentSection, isMobile, isSimulating]);

  // If mobile, do not render synthetic cursors to preserve performance and touch usability
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
          className="absolute top-0 left-0 transition-opacity duration-300 will-change-transform"
          style={{
            transform: `translate3d(${agent.initialPos.x}vw, ${agent.initialPos.y}vh, 0)`
          }}
        >
          {/* Custom SVG Cursor Arrow */}
          <div className="relative">
            <svg
              className="cursor-pointer transition-transform duration-150 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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

            {/* Click Ripple Indicator */}
            <span
              className="absolute -top-1 -left-1 w-6 h-6 rounded-full opacity-0 pointer-events-none transition-opacity duration-300"
              style={{
                border: `2px solid ${agent.color}`,
              }}
            />

            {/* Agent Badge & Dynamic Action Label */}
            <div
              className="absolute left-4 top-4 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider text-white shadow-lg whitespace-nowrap backdrop-blur-sm select-none"
              style={{
                backgroundColor: agent.color,
                boxShadow: `0 4px 14px ${agent.color}40`
              }}
            >
              <span>{agent.name}</span>
              <span className="opacity-70 text-[9px]">/</span>
              <span className="agent-action-label opacity-90 font-normal text-[9px] max-w-[140px] truncate">
                {agent.role}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
