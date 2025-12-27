import { Project, TeamMember, Job } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NeuroFinance Core",
    category: "FinTech",
    image: "https://picsum.photos/800/600?random=1",
    aiSummary: "A distributed ledger system optimized by predictive AI algorithms to detect fraud in milliseconds.",
  },
  {
    id: 2,
    title: "EcoSense IoT",
    category: "IoT",
    image: "https://picsum.photos/800/600?random=2",
    aiSummary: "Smart city grid management using swarm intelligence to reduce energy consumption by 40%.",
  },
  {
    id: 3,
    title: "MediSynth AI",
    category: "Healthcare",
    image: "https://picsum.photos/800/600?random=3",
    aiSummary: "Generative protein folding models assisting in rapid drug discovery phases.",
  },
  {
    id: 4,
    title: "CyberVault X",
    category: "Security",
    image: "https://picsum.photos/800/600?random=4",
    aiSummary: "Autonomous threat hunting agent that patches zero-day vulnerabilities in real-time.",
  },
];

export const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Aris Thorne",
    role: "Chief AI Architect",
    image: "https://picsum.photos/400/400?random=10",
    aiBio: "Specializes in neural architecture search and large language model optimization.",
  },
  {
    id: 2,
    name: "Elena Vox",
    role: "Head of Product",
    image: "https://picsum.photos/400/400?random=11",
    aiBio: "Visionary leader bridging the gap between quantum computing concepts and consumer UX.",
  },
  {
    id: 3,
    name: "Kenji Sato",
    role: "Lead Engineer",
    image: "https://picsum.photos/400/400?random=12",
    aiBio: "Full-stack wizard with deep expertise in WebGL, WebAssembly, and edge AI deployment.",
  },
];

export const JOBS: Job[] = [
  {
    id: 1,
    title: "Senior AI Engineer",
    location: "Remote / SF",
    type: "Full-time",
    salary: "$180k - $250k",
    description: "Design and implement next-gen transformer models for enterprise clients.",
  },
  {
    id: 2,
    title: "WebGL Developer",
    location: "New York",
    type: "Contract",
    salary: "$120k - $160k",
    description: "Create immersive 3D experiences using Three.js and React Fiber.",
  },
  {
    id: 3,
    title: "Product Designer",
    location: "London",
    type: "Full-time",
    salary: "£70k - £95k",
    description: "Shape the future of human-AI interaction interfaces.",
  },
];