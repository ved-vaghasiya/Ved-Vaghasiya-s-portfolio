export const portfolioData = {
  personal: {
    name: "Ved Vaghasiya",
    tagline: "Aspiring AI + Full-Stack Developer",
    badgeRole: "OPEN SOURCE ENTHUSIAST",
    location: "Ahmedabad, India",
    education: "First-year B.Tech Computer Science & AI at CodingGita × Swaminarayan University",
    bioShort: "Architecting modern web experiences, intelligent systems, and interactive digital products from first principles.",
    motto: "LEARN. BUILD. SOLVE. IMPROVE. REPEAT.",
    portraitUrl: "/assets/ved_portrait.png",
    resumeUrl: "/Ved_Vaghasiya_Resume.pdf",
    stats: [
      { label: "MCP Tools & Agents", value: "478 Active" },
      { label: "Core Stack", value: "7-Layer" },
      { label: "Architecture", value: "100% Offline-First" }
    ]
  },

  navigation: [
    { id: "hero", label: "INDEX", indexNum: "01" },
    { id: "profile", label: "PROFILE", indexNum: "02" },
    { id: "skills", label: "SKILLS", indexNum: "03" },
    { id: "work", label: "SELECTED WORK", indexNum: "04" },
    { id: "experience", label: "EXPERIENCE", indexNum: "05" },
    { id: "connect", label: "CONNECT", indexNum: "06" }
  ],

  profile: {
    eyebrow: "// 02.00 PHILOSOPHY & BACKGROUND",
    heading: "MORE THAN JUST CODE.",
    quote: "LEARN. BUILD. SOLVE. IMPROVE. REPEAT.",
    story: [
      "I am a first-year B.Tech Computer Science and AI student at CodingGita × Swaminarayan University.",
      "I enjoy exploring AI, full-stack development, cybersecurity and open source. For me, software is not just theoretical syntax — it is the medium through which real-world problems get transformed into elegant, tangible solutions.",
      "I am driven by turning rough ideas into useful products, solving practical challenges, and continuously improving through rapid iteration, hands-on building, and deep curiosity."
    ],
    principles: [
      {
        tag: "01 / CURIOSITY",
        title: "First-Principles Thinking",
        desc: "Deconstruct complex problems to basic truths and build upwards with intention."
      },
      {
        tag: "02 / CRAFTSMANSHIP",
        title: "Aesthetic Precision",
        desc: "UI/UX isn't an afterthought. Typography, spacing, and micro-interactions define product soul."
      },
      {
        tag: "03 / ITERATION",
        title: "Continuous Evolution",
        desc: "Build fast, test rigorously, absorb feedback, and elevate the standard on every commit."
      }
    ]
  },

  skills: {
    eyebrow: "// 03.00 CAPABILITIES & PROFICIENCY",
    heading: "TECHNICAL ARSENAL",
    disclaimer: "Honest proficiency representation: actively learning, practicing daily, and advancing through hands-on project execution.",
    categories: [
      {
        name: "CORE LANGUAGES",
        items: [
          { name: "Python", level: "Intermediate", tag: "AI / Scripting", highlight: true },
          { name: "JavaScript", level: "Intermediate", tag: "ES6+ / Web", highlight: true },
          { name: "HTML5", level: "Proficient", tag: "Semantic markup" },
          { name: "CSS3", level: "Proficient", tag: "Modern layout / animations" }
        ]
      },
      {
        name: "FRAMEWORKS & LIBRARIES",
        items: [
          { name: "React", level: "Foundational", tag: "SPA / Component Architecture", highlight: true },
          { name: "Node.js", level: "Foundational", tag: "Backend / Runtime" },
          { name: "Tailwind CSS", level: "Proficient", tag: "Design Systems" },
          { name: "Vite", level: "Proficient", tag: "Tooling & Bundling" }
        ]
      },
      {
        name: "DESIGN & SYSTEMS",
        items: [
          { name: "Figma", level: "Proficient", tag: "Wireframing / Prototyping", highlight: true },
          { name: "UI/UX Design", level: "Intermediate", tag: "Design Thinking & Systems" },
          { name: "Git & GitHub", level: "Intermediate", tag: "Version Control & Collaboration" },
          { name: "Cybersecurity Fundamentals", level: "Learning", tag: "Security Principles & OWASP" }
        ]
      }
    ]
  },

  projects: [
    {
      id: "skillora",
      num: "01",
      title: "SKILLORA",
      category: "UI/UX DESIGN",
      tag: "CAREER DISCOVERY",
      description: "A career and skills discovery application designed end-to-end in Figma. Features intelligent role matching, structured career paths, interactive skill assessment flows, and refined dark-mode typography.",
      role: "Lead UI/UX Designer (Figma)",
      links: [
        { label: "View Figma Design", url: "https://www.figma.com/design/KN6AzcW3HP0NxSrgbdPs8T/Skillora-%E2%80%94-Career---Skills-Discovery?node-id=0-1&t=Yrjt0ZuAtgqGYwac-1", type: "figma" }
      ],
      metrics: ["Full Design System", "Interactive Prototype", "User-Centric Architecture"],
      accentColor: "#3B82F6"
    },
    {
      id: "upsc-zone",
      num: "02",
      title: "UPSC ZONE AI",
      category: "WEB DEVELOPMENT / HACKATHON",
      tag: "AI PREPARATION PLATFORM",
      description: "Built for an Unstop hackathon: received an initial homepage reference from a friend and independently expanded it into a comprehensive web platform using Google Antigravity, Vite, JavaScript, and modern CSS architecture.",
      role: "Solo Frontend Architecture & Recreation",
      links: [
        { label: "GitHub Repository", url: "https://github.com/ved-vaghasiya/UPSC-Zone-AI", type: "github" }
      ],
      metrics: ["Unstop Hackathon Project", "Vite + JavaScript", "Antigravity Accelerated"],
      accentColor: "#D93636"
    },
    {
      id: "pawpal",
      num: "03",
      title: "PAWPAL",
      category: "UI/UX DESIGN",
      tag: "PET HEALTH & ADOPTION",
      description: "A collaborative team product developed with QuantaCrew. Focused on delivering an empathetic, accessible pet care and adoption interface with playful yet structured component libraries.",
      role: "Core UI/UX Designer with QuantaCrew",
      links: [
        { label: "Live Website", url: "https://pawpalquantacrew.vercel.app", type: "live" }
      ],
      metrics: ["Team QuantaCrew", "Accessible UX", "Design Systems"],
      accentColor: "#10B981"
    },
    {
      id: "garba",
      num: "04",
      title: "GARBA",
      category: "CREATIVE DEVELOPMENT / 3D WEB",
      tag: "CULTURAL CELEBRATION",
      description: "An interactive digital celebration of vibrant Gujarati folk culture through authentic Garba music, real-time 3D visuals, and rhythmic Raas choreography on the web.",
      role: "Creator & Creative Developer",
      links: [
        { label: "Live Interactive Experience", url: "https://garba-topaz.vercel.app/", type: "live" },
        { label: "GitHub Code", url: "https://github.com/ved-vaghasiya/Garba-", type: "github" }
      ],
      metrics: ["3D Web Graphics", "Audio Synced Interaction", "Gujarati Heritage"],
      accentColor: "#F59E0B"
    }
  ],

  experience: {
    eyebrow: "// 05.00 HACKATHONS & RECOGNITION",
    heading: "EXPERIENCE & PARTICIPATION",
    subtitle: "Real-world collaborative hackathon experience and continuous building.",
    items: [
      {
        title: "PixelRush 2026",
        role: "Hackathon Participant",
        organizer: "CodingGita Hackathon Committee",
        dates: "5 – 6 October 2026",
        skills: ["HTML5", "CSS3", "Figma", "Frontend Architecture", "UI/UX Prototyping"],
        description: "Intensive 48-hour UI/UX and Frontend hackathon organized by CodingGita. Collaborated on designing and developing rapid web prototypes under strict time constraints, adhering to strict design fidelity and responsive execution.",
        certificateImg: "/assets/hackathon_certi.jpg"
      }
    ]
  },

  connect: {
    eyebrow: "// 06.00 TRANSMISSION PROTOCOL",
    heading: "LET'S CONNECT.",
    subheading: "Open for AI & full-stack development discussions, hackathon team-ups, open source collaborations, and learning opportunities.",
    email: "ved.vaghasiya.cg@gmail.com",
    socials: [
      { name: "GitHub", handle: "@ved-vaghasiya", url: "https://github.com/ved-vaghasiya" },
      { name: "LinkedIn", handle: "Ved Vaghasiya", url: "https://linkedin.com/in/ved-vaghasiya-977263427/" },
      { name: "LeetCode", handle: "@vedvaghasiya", url: "https://leetcode.com/u/vedvaghasiya/" },
      { name: "Direct Mail", handle: "ved.vaghasiya.cg@gmail.com", url: "mailto:ved.vaghasiya.cg@gmail.com" }
    ]
  },

  collaborativeAgents: [
    {
      id: "ved",
      name: "VED",
      color: "#D93636",
      role: "Primary Architect & Identity",
      initialPos: { x: 38, y: 32 }
    },
    {
      id: "design",
      name: "DESIGN",
      color: "#3B82F6",
      role: "Typography & Layout Engine",
      initialPos: { x: 74, y: 22 }
    },
    {
      id: "code",
      name: "CODE",
      color: "#10B981",
      role: "Components & Tech Stack",
      initialPos: { x: 22, y: 64 }
    },
    {
      id: "motion",
      name: "MOTION",
      color: "#F59E0B",
      role: "Transitions & Choreography",
      initialPos: { x: 82, y: 68 }
    },
    {
      id: "build",
      name: "BUILD",
      color: "#EC4899",
      role: "System Assembly & Structure",
      initialPos: { x: 50, y: 80 }
    },
    {
      id: "pixel",
      name: "PIXEL",
      color: "#8B5CF6",
      role: "Micro-interactions & Precision",
      initialPos: { x: 62, y: 44 }
    }
  ]
};
