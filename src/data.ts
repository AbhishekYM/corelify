import { Course, Mentor, Opportunity, Workshop, Scholarship, BlogPost, Notification, SupportTicket, UserProfile, LiveClass, MentorProduct } from "./types";

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Product Design Strategy & Systems",
    provider: "Lumina Academy",
    category: "Design",
    level: "Intermediate",
    rating: 4.9,
    reviewCount: 342,
    instructor: "Adrian Thompson (Ex-Figma)",
    duration: "18h 45m",
    lessonsCount: 12,
    enrolled: true,
    progress: 45,
    image: "https://picsum.photos/seed/msq1rw8/800/600",
    description: "Learn how to build comprehensive, production-ready design systems from scratch. Master variables, auto-layout, interactive components, and token architectures used by Stripe and Linear.",
    curriculum: [
      {
        id: "sec-1",
        title: "Introduction to Design Systems",
        lessons: [
          { id: "les-1", title: "What is a Design System?", duration: "12m", isCompleted: true },
          { id: "les-2", title: "System Anatomy & Architecture", duration: "25m", isCompleted: true },
          { id: "les-3", title: "Auditing Existing Interfaces", duration: "18m", isCompleted: true }
        ]
      },
      {
        id: "sec-2",
        title: "Foundations & Tokens",
        lessons: [
          { id: "les-4", title: "Establishing Type Scales & Grids", duration: "30m", isCompleted: true },
          { id: "les-5", title: "Configuring Figma Variables", duration: "45m", isCompleted: false },
          { id: "les-6", title: "Spacing Systems & Margin Rhythms", duration: "20m", isCompleted: false }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "Next-Gen Fullstack Architectures with React 19",
    provider: "Vercel Institute",
    category: "Engineering",
    level: "Advanced",
    rating: 4.8,
    reviewCount: 512,
    instructor: "Sarah Jenkins (Next.js Core)",
    duration: "24h 15m",
    lessonsCount: 18,
    enrolled: false,
    progress: 0,
    image: "https://picsum.photos/seed/yzpiwoq/800/600",
    description: "Master React Server Actions, concurrent rendering, resource preloading, and optimal hydration strategies. Built specifically for elite software builders.",
    curriculum: [
      {
        id: "c2-sec-1",
        title: "React 19 Server Components",
        lessons: [
          { id: "c2-les-1", title: "Deep Dive: Server Actions", duration: "15m", isCompleted: false },
          { id: "c2-les-2", title: "Form Actions & useActionState", duration: "22m", isCompleted: false }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "AI Product Management & Agentic AI",
    provider: "Stanford Online",
    category: "Product Management",
    level: "Intermediate",
    rating: 4.9,
    reviewCount: 201,
    instructor: "Dr. Ryan Vance (AI Architect)",
    duration: "14h 30m",
    lessonsCount: 10,
    enrolled: false,
    progress: 0,
    image: "https://picsum.photos/seed/z1c92ca/800/600",
    description: "Learn to design, spec, and ship product features driven by Large Language Models and multi-agent workflows. Understand costs, latency, and system evaluation metrics.",
    curriculum: []
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: "mentor-1",
    name: "Alex Rivera",
    role: "Staff Product Designer",
    company: "Stripe",
    rating: 4.98,
    reviewsCount: 124,
    price: 85,
    bio: "Ex-Apple & Linear. Specialized in high-craft user interfaces, interactive animations, and structural design systems. I will help you polish your portfolio to land FAANG and top-tier SaaS roles.",
    image: "https://picsum.photos/seed/61iis3t/800/600",
    skills: ["Figma", "Design Systems", "Product Strategy", "Framer", "Front-end"],
    availability: ["Monday 3:00 PM", "Wednesday 10:00 AM", "Thursday 5:00 PM"],
    reviews: [
      { id: "r-1", user: "Sophia Lin", rating: 5, comment: "Alex completely re-shaped how I think about layout hierarchy. Highly recommended!", date: "2 days ago" },
      { id: "r-2", user: "Marcus Vance", rating: 5, comment: "Phenomenal insights! Worth every dollar.", date: "1 week ago" }
    ]
  },
  {
    id: "mentor-2",
    name: "Evelyn Chen",
    role: "Director of Engineering",
    company: "Figma",
    rating: 4.95,
    reviewsCount: 89,
    price: 110,
    bio: "Passionate about building performant collaborative canvases and leading diverse engineering teams. Over 12 years of experience at Google and Adobe.",
    image: "https://picsum.photos/seed/dfmr1qi/800/600",
    skills: ["React", "C++", "System Architecture", "Leadership", "Career Pivoting"],
    availability: ["Tuesday 9:00 AM", "Friday 2:00 PM"],
    reviews: []
  },
  {
    id: "mentor-3",
    name: "Marcus Aurelius",
    role: "Lead PM, Growth Engine",
    company: "Linear",
    rating: 4.92,
    reviewsCount: 73,
    price: 95,
    bio: "I guide aspiring PMs on how to spec highly polished products, conduct meticulous user research, and drive developer-focused workflows.",
    image: "https://picsum.photos/seed/l60ifoz/800/600",
    skills: ["Product Roadmap", "Metrics & Analytics", "SQL", "Technical PM"],
    availability: ["Wednesday 4:00 PM", "Saturday 11:00 AM"],
    reviews: []
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "Linear",
    logo: "https://picsum.photos/seed/s28ppl8/800/600",
    type: "Job",
    location: "Remote (Global)",
    stipendOrSalary: "$140,000 - $185,000",
    matchScore: 94,
    skillsRequired: ["Figma", "Design Systems", "Webflow/CSS", "Product Strategy"],
    description: "We are looking for a singular Senior Designer to join our small core team. You will have full ownership over entire features, from raw customer requirements to pristine front-end production alignments.",
    applied: true,
    saved: false,
    status: "Reviewing",
    applicationDate: "2026-06-28"
  },
  {
    id: "job-2",
    title: "Frontend Engineering Intern (React/Next)",
    company: "Stripe",
    logo: "https://picsum.photos/seed/1vsprv2/800/600",
    type: "Internship",
    location: "San Francisco, CA (Hybrid)",
    duration: "6 Months",
    stipendOrSalary: "$8,500 / month",
    matchScore: 88,
    skillsRequired: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    description: "Join the Dashboard Platform team at Stripe. You will build and optimize user-facing analytics, configure state machines, and write high-craft components serving millions of global merchants.",
    applied: false,
    saved: true
  },
  {
    id: "job-3",
    title: "AI Research Engineer",
    company: "OpenAI",
    logo: "https://picsum.photos/seed/m9kqcor/800/600",
    type: "Job",
    location: "San Francisco, CA",
    stipendOrSalary: "$220,000 - $310,000",
    matchScore: 72,
    skillsRequired: ["Python", "PyTorch", "Transformer Architectures", "LLMs"],
    description: "Advance the capabilities of our multi-modal agentic systems. Conduct fundamental research and translate high-impact findings into robust production micro-agents.",
    applied: false,
    saved: false
  },
  {
    id: "job-4",
    title: "Product Manager Intern",
    company: "Figma",
    logo: "https://picsum.photos/seed/v0u7s0b/800/600",
    type: "Internship",
    location: "New York, NY (Onsite)",
    duration: "3 Months",
    stipendOrSalary: "$7,000 / month",
    matchScore: 85,
    skillsRequired: ["Product Spec", "UI/UX Awareness", "SQL", "User Research"],
    description: "Support product execution for Figma's collaboration ecosystem. Work side-by-side with engineers, designers, and marketers to bring game-changing editor tools to market.",
    applied: false,
    saved: false
  }
];

export const INITIAL_WORKSHOPS: Workshop[] = [
  {
    id: "work-1",
    title: "Crafting High-Conversion SaaS Checkouts",
    host: "Adrian Thompson",
    company: "Stripe",
    date: "July 12, 2026",
    time: "10:00 AM - 12:30 PM PST",
    duration: "2.5 Hours",
    price: 29,
    registrants: 412,
    image: "https://picsum.photos/seed/v66n1x7/800/600",
    description: "An intensive interactive workshop focusing on typography, field flow, micro-copy, payment localizations, and structural trust-builders that push checkout conversion by up to 25%.",
    registered: false
  },
  {
    id: "work-2",
    title: "Mastering Framer Motion in Production",
    host: "Sarah Jenkins",
    company: "Framercraft",
    date: "July 18, 2026",
    time: "2:00 PM - 5:00 PM PST",
    duration: "3 Hours",
    price: 49,
    registrants: 289,
    image: "https://picsum.photos/seed/pbku801/800/600",
    description: "Learn how to orchestrate complex layout animations, gesture recognitions, staggered entrances, and eye-catching WebGL-level micro-transitions using framer-motion/react.",
    registered: true
  }
];

export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "sch-1",
    title: "Lumina Merit Tech Fellowship 2026",
    provider: "Lumina Foundation",
    amount: "$15,000",
    deadline: "August 15, 2026",
    eligibility: ["Current student or self-taught developer", "Demonstrated work on open-source or creative portfolios", "Underrepresented background in STEM preferred"],
    description: "Provides financial backing, premium mentor mapping, and guaranteed interview passes to top-tier startups for exceptional digital craftspeople.",
    applied: false
  },
  {
    id: "sch-2",
    title: "NextGen Designer Grant",
    provider: "Framer & Figma Collaborative",
    amount: "$8,000 + Software Licenses",
    deadline: "July 30, 2026",
    eligibility: ["Passionate about UI/UX and product architecture", "Portfolio demonstrating at least 3 detailed case studies"],
    description: "Supporting the next generation of creative product builders with capital, software access, and intensive executive mentoring.",
    applied: true,
    status: "Pending"
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Architecture of Quality: Why Linear Feels Good",
    category: "Design Systems",
    author: "Karim Al-Husseini",
    authorRole: "Principal Architect",
    date: "June 25, 2026",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/mzuz2ca/800/600",
    snippet: "A deep dive into how keyboard shortcuts, aggressive client-side caching, fluid layout physics, and beautiful micro-interactions create an unmatched software experience.",
    content: `When we talk about the "feel" of software, we are often talking about latencies, physics, and predictability. Linear is widely cited as the gold standard of modern developer workflows.

How do they do it?

### 1. Zero Latency Optimizations
Linear loads the entire workspace directly into memory. Changes are performed locally, then synced in the background. If a server is slow, the interface is still instant. This offline-first paradigm changes how users perceive reliability.

### 2. High-Craft Typography
They use specialized monospaced indicators paired with tightly leaded display headings. This makes structured issues highly scan-readable without contributing visual fatigue.

### 3. Deliberate Micro-interactions
Transitions in Linear do not just start and stop. They utilize customized bezier curves (e.g., cubic-bezier(0.16, 1, 0.3, 1)) that match natural deceleration. Every keypress gives visual feedback.`,
    comments: [
      { id: "c-1", author: "Airi Tanaka", comment: "This is a masterpiece of analysis. Offline-first changed our team's velocity completely.", date: "2 days ago" }
    ],
    bookmarksCount: 242,
    bookmarked: false
  },
  {
    id: "blog-2",
    title: "Design System Tokens: Best Practices for Scale",
    category: "Design",
    author: "Alex Rivera",
    authorRole: "Staff Designer, Stripe",
    date: "May 14, 2026",
    readTime: "8 min read",
    image: "https://picsum.photos/seed/19zqupi/800/600",
    snippet: "Stop naming colors 'blue-500'. Build an semantic, intent-based variables tier that powers themes, component contracts, and accessibility without developer friction.",
    content: "When engineering teams scale, standard hardcoded variables lead to visual inconsistencies. Here is our blueprint on building a semantic token mapping engine...",
    comments: [],
    bookmarksCount: 189,
    bookmarked: true
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n-1",
    type: "alert",
    title: "New AI Recommendation",
    description: "Your resume matches 94% of the Senior Product Designer role at Linear. Ready to apply?",
    time: "10m ago",
    read: false
  },
  {
    id: "n-2",
    type: "application",
    title: "Application Status Updated",
    description: "Linear updated your status to: 'Reviewing'.",
    time: "2h ago",
    read: false
  },
  {
    id: "n-3",
    type: "message",
    title: "Alex Rivera (Stripe)",
    description: "Hey! Let's schedule our 1:1 call for Thursday. Feel free to book on my calendar.",
    time: "1d ago",
    read: true
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: "ticket-109",
    subject: "Scholarship Merit Credentials Issue",
    category: "Scholarships",
    status: "Open",
    priority: "High",
    createdAt: "July 01, 2026",
    messages: [
      { id: "m-1", sender: "user", message: "Hi support team, my NextGen designer grant upload keeps failing. My portfolio PDF is only 8MB.", time: "July 01, 2026 at 4:15 PM" },
      { id: "m-2", sender: "support", message: "Hello! Thanks for reaching out. We had a brief maintenance cycle on our upload node. Can you please try uploading again now? It should go through perfectly.", time: "July 01, 2026 at 4:45 PM" }
    ]
  }
];

export const INITIAL_PROFILE: UserProfile = {
  fullName: "Abhishek Makwana",
  email: "abhishek.makwana@sapphiresolutions.net",
  headline: "Product Architect & Fullstack Engineer",
  bio: "Crafting beautiful digital experiences, design systems, and fast backend pipelines. Specialized in React 19, Tailwind CSS, and multi-agent AI ecosystems.",
  avatar: "https://picsum.photos/seed/v2p5q5e/800/600",
  resumeUrl: "abhishek_resume_2026.pdf",
  skills: ["React", "TypeScript", "Tailwind CSS", "Figma", "Design Systems", "Next.js", "AI Integrations"],
  projects: [
    {
      id: "p-1",
      title: "Synthetix Design Token Engine",
      category: "Product Design",
      image: "https://picsum.photos/seed/ejdlkq0/800/600",
      link: "https://github.com/synthetix/design-engine",
      description: "A automated Figma plugin that compiles visual variables into production-ready Tailwind token JSON files instantly.",
      tags: ["TypeScript", "Figma API", "Tailwind CSS"]
    }
  ],
  experience: [
    { role: "Product Architect", company: "Sapphire Solutions", duration: "2024 - Present" },
    { role: "UI Engineer", company: "Framer Builders", duration: "2022 - 2024" }
  ],
  education: [
    { degree: "B.Tech in Computer Science & Engineering", school: "IIT Bombay", year: "2018 - 2022" }
  ]
};

export const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: "lc-1",
    title: "Advanced Figma Component Architecture",
    instructor: "Adrian Thompson",
    date: "2026-07-05",
    time: "10:00 AM PST",
    duration: "1.5 hours",
    status: "Upcoming"
  },
  {
    id: "lc-2",
    title: "Building LLM Wrappers with Next.js",
    instructor: "Sarah Chen",
    date: "2026-07-06",
    time: "2:00 PM EST",
    duration: "2 hours",
    status: "Upcoming"
  }
];

export const INITIAL_MENTOR_PRODUCTS: MentorProduct[] = [
  {
    id: "mp-1",
    title: "Product Design Interview Playbook",
    mentorId: "m-1",
    type: "Guide",
    price: 29.99,
    image: "https://picsum.photos/seed/hjut5nx/800/600",
    downloads: 1240,
    description: "The complete playbook for acing product design interviews at FAANG companies."
  },
  {
    id: "mp-2",
    title: "Figma Design System Template",
    mentorId: "m-1",
    type: "Template",
    price: 49.00,
    image: "https://picsum.photos/seed/esi4v5g/800/600",
    downloads: 856,
    description: "A production-ready Figma design system template to kickstart your next project."
  }
];
