export const personalInfo = {
  name: 'Pranav Ghodke',
  title: 'IT Student & Creative Technologist',
  tagline: 'Building innovative projects at the intersection of technology and creativity.',
  email: 'spranav0812@gmail.com',
  location: 'Mumbai, India',
  college: 'A. P. Shah Institute of Technology',
  github: 'https://github.com/PS8760',
  instagram: 'https://www.instagram.com/ghodke.1984/',
  linkedin: 'https://www.linkedin.com/in/pranav-ghodke/',
  twitter: 'https://x.com/Pranav_1984',
};

export const skills = [
  // Frontend
  { name: 'HTML & CSS', level: 90, category: 'Frontend' },
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'TailwindCSS', level: 82, category: 'Frontend' },
  { name: 'GSAP', level: 75, category: 'Frontend' },
  // Backend
  { name: 'JavaScript', level: 88, category: 'Backend' },
  { name: 'Python', level: 75, category: 'Backend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Express.js', level: 78, category: 'Backend' },
  { name: 'Java', level: 70, category: 'Backend' },
  // Database
  { name: 'MySQL', level: 78, category: 'Database' },
  { name: 'SQLite', level: 72, category: 'Database' },
  { name: 'MongoDB', level: 75, category: 'Database' },
  { name: 'Firebase', level: 70, category: 'Database' },
  // Tools
  { name: 'Git & GitHub', level: 85, category: 'Tools' },
  { name: 'Figma', level: 72, category: 'Tools' },
  { name: 'Canva', level: 80, category: 'Tools' },
  { name: 'CapCut / VN Editor', level: 88, category: 'Tools' },
  // Deployment
  { name: 'AWS', level: 65, category: 'Deployment' },
  { name: 'Vercel', level: 78, category: 'Deployment' },
];

export const projects = [
  {
    id: 1,
    title: 'ContentGenei',
    description: 'AI-powered content creation platform built for the AI for Bharat Hackathon (AWS). Features content generation, Alex AI assistant, content optimizer, team collaboration with group chat & task assignment, and LinkoGenei — a browser extension to save & organise content from social media.',
    tags: ['React', 'Node.js', 'AI', 'Firebase'],
    color: '#FFB800',
    live: 'https://content-ai-orcin-tau.vercel.app/',
    liveWorking: true,
    featured: true,
  },
  {
    id: 2,
    title: 'EduPulse',
    description: 'AI-powered Chrome extension that detects student attentiveness in real time by analysing the online class tab — not the webcam. Uses YOLOv5 + MediaPipe + OpenCV to score engagement and give teachers a live dashboard + post-session analytics. Privacy-first: nothing stored or sent outside the browser.',
    tags: ['Python', 'YOLOv5', 'MediaPipe', 'Chrome Extension'],
    color: '#FF4D00',
    github: null,
    live: null,
    liveWorking: false,
    comingSoon: true,
  },
  {
    id: 3,
    title: 'YojanaFinder',
    description: 'A platform where students, small businesses, and startups discover eligible government schemes in India — filtered by age, gender, field, and more.',
    tags: ['React', 'Node.js', 'MongoDB'],
    color: '#f59e0b',
    github: 'https://github.com/PS8760/YojanaFinder_2025.git',
    live: 'https://yojanafinder.vercel.app/',
    liveWorking: false,
  },
  {
    id: 4,
    title: 'BookLens',
    description: 'A community-driven book review platform where users post reviews, comment on others, and build a reading community together.',
    tags: ['React', 'Express', 'MongoDB'],
    color: '#10b981',
    github: 'https://github.com/PS8760/BookLens.git',
    live: null,
    liveWorking: false,
    comingSoon: true,
  },
  {
    id: 5,
    title: 'PaperFlow',
    description: 'Generate and verify fake AI-written research papers — a tool built to explore AI content detection and academic integrity.',
    tags: ['React', 'Python', 'AI'],
    color: '#ef4444',
    github: 'https://github.com/PS8760/HackStreak.git',
    live: null,
    liveWorking: false,
    comingSoon: true,
  },
];

export const experience = [
  {
    type: 'education',
    year: '2023 – Present',
    role: 'Bachelor of Engineering (Information Technology)',
    org: 'A. P. Shah Institute of Technology',
    desc: 'Pursuing B.E. in IT with focus on full-stack development, data structures, machine learning, and cloud technologies.',
  },
  {
    type: 'role',
    year: '2025 – Present',
    role: 'Design Student Coordinator',
    org: 'DevOps Club, APSIT',
    desc: 'Holding the position of Design Student Coordinator at the DevOps Club of APSIT. Contributed 100+ designs for the club — posters, banners, social media creatives, and event collaterals.',
  },
];

export const cgpaData = [
  { sem: 'Sem 1', cgpa: 9.83 },
  { sem: 'Sem 2', cgpa: 9.35 },
  { sem: 'Sem 3', cgpa: 8.96 },
  { sem: 'Sem 4', cgpa: 9.09 },
  { sem: 'Sem 5', cgpa: 9.35 },
  { sem: 'Sem 6', cgpa: null },
];

export const achievements = [
  {
    icon: '🥇',
    title: '1st Place — Poster Competition',
    event: 'EXALT, APSIT',
    desc: 'Won first prize in the Poster Competition at EXALT, the annual technical fest of A. P. Shah Institute of Technology.',
    color: '#f59e0b',
  },
  {
    icon: '🥈',
    title: '2nd Place — Project Presentation',
    event: 'EXALT, APSIT',
    desc: 'Secured second prize in the Project Presentation event at EXALT.',
    color: '#94a3b8',
  },
  {
    icon: '🎭',
    title: '1st Place — Drama Competition',
    event: 'Ojus Fest, APSIT (S.E.)',
    desc: 'Won the Drama Competition during Ojus Fest in Second Year at APSIT College.',
    color: '#FF4D00',
  },
  {
    icon: '🤖',
    title: 'AI for Bharat Hackathon',
    event: 'Powered by AWS',
    desc: 'Currently in the final prototype submission phase of the AI for Bharat Hackathon powered by AWS.',
    color: '#FFB800',
    badge: 'In Progress',
  },
  {
    icon: '⚡',
    title: 'Multiple Hackathons',
    event: 'Various',
    desc: 'Participated in numerous hackathons — leading teams, learning fast, and building under pressure. Every one has been a lesson in speed, collaboration, and resilience.',
    color: '#10b981',
  },
];

export const certifications = [
  {
    title: 'EXALT — Poster Competition',
    issuer: 'A. P. Shah Institute of Technology',
    year: '2024',
    color: '#f59e0b',
    icon: '🥇',
  },
  {
    title: 'EXALT — Project Presentation',
    issuer: 'A. P. Shah Institute of Technology',
    year: '2024',
    color: '#94a3b8',
    icon: '🥈',
  },
  {
    title: 'Ojus Fest — Drama Competition',
    issuer: 'APSIT College',
    year: '2024',
    color: '#FF4D00',
    icon: '🎭',
  },
  {
    title: 'AI for Bharat Hackathon',
    issuer: 'AWS',
    year: '2025',
    color: '#FFB800',
    icon: '🤖',
    badge: 'Finalist',
  },
  {
    title: 'Hackathon Participation',
    issuer: 'Various Organisations',
    year: '2023–25',
    color: '#10b981',
    icon: '⚡',
  },
];
