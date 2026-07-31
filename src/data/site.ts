export const SITE = {
  name: "One Tech Nations",
  tagline: "AI & Cybersecurity, made human.",
  email: "techsupport@onetechnations.com",
  phone: "+1 240 422 8488",
  address: "Fredericksburg, VA 22407 USA",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export type ServiceItem = {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  body: string;
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    slug: "tech-solution",
    icon: "Boxes",
    title: "Tech Solution",
    summary:
      "Customized training programs tailored to individuals or organizations, plus regular cybersecurity networking events.",
    body: "Customized Training Programs designed around the specific needs of your people, paired with Cybersecurity Networking Events that give professionals a space to connect, share ideas, and form collaborations.",
  },
  {
    slug: "cybersecurity",
    icon: "ShieldCheck",
    title: "Cybersecurity",
    summary:
      "Interactive virtual labs for hands-on experience with real AI and cybersecurity tooling.",
    body: "Interactive Virtual Labs let members engage in hands-on experiences with AI and cybersecurity tools. These labs facilitate practical learning, allowing enthusiasts to experiment safely in a controlled environment and gain valuable, job-ready skill.",
  },
  {
    slug: "artificial-intelligence",
    icon: "BrainCircuit",
    title: "Artificial Intelligence",
    summary:
      "Skill development programs, a project collaboration platform, and a mentorship initiative.",
    body: "AI Skill Development Programs tailored for enthusiasts, an AI Project Collaboration Platform where members team up on innovative projects, and an AI Mentorship Program connecting you with experienced practitioners.",
  },
  {
    slug: "tech-analysis",
    icon: "LineChart",
    title: "Tech Analysis",
    summary:
      "Navigate a complicated digital world with recommendations grounded in your real objectives.",
    body: "As the digital world gets more complicated, we help your business figure out how to navigate it. By collaborating closely with your team to understand your objectives and obstacles, we provide customized suggestions on implementing new technologies, streamlining processes, and undertaking digital transformation.",
  },
  {
    slug: "it-consultation",
    icon: "Handshake",
    title: "IT Consultation",
    summary:
      "Assessments, strategic planning, vendor evaluation, system integration and awareness training.",
    body: "We advise customers on how to optimize their technological environments to facilitate business objectives. Our advisory services encompass evaluations, strategic planning, vendor evaluation, system integration, change administration, training, and cybersecurity awareness training — with a consulting model built to adapt.",
  },
  {
    slug: "market-analysis",
    icon: "Radar",
    title: "Market Analysis",
    summary:
      "A profound comprehension of the competitive IT landscape to anchor your decisions.",
    body: "We meticulously analyze prevailing market trends, scrutinize competitor activities, and evaluate customer preferences to furnish you with insights that serve as the bedrock for astute business decisions.",
  },
];

export const OFFERS = [
  {
    slug: "soc-analyst",
    badge: "SOC Analyst",
    title: "SOC Analyst Training",
    period: "January 2025",
    blurb:
      "The Security Operation Center is the heart of corporate defenses. As a SOC Analyst you monitor traffic and actions inside a company's network to safeguard against cyber threats.",
    price: "Seats limited",
    highlights: ["Live monitoring drills", "Virtual lab access", "Job-market ready portfolio"],
  },
  {
    slug: "rsa-archer",
    badge: "RSA Archer",
    title: "RSA Archer Specialist",
    period: "Rolling cohorts",
    blurb:
      "Master Governance, Risk and Compliance. Configure and customize RSA Archer applications, streamline risk and compliance processes, and design solutions for advanced GRC challenges.",
    price: "Certification included",
    highlights: ["Hands-on configuration", "Advanced GRC design", "Specialist credential"],
  },
  {
    slug: "iso-27001",
    badge: "ISO 27001 LA",
    title: "ISO 27001 Lead Auditor",
    period: "Free training",
    blurb:
      "Gain the expertise to audit, manage and improve Information Security Management Systems. Flexible learning with recorded sessions plus career placement support.",
    price: "Exam fee $340",
    highlights: ["Risk assessment mastery", "Recorded + live sessions", "Placement assistance"],
  },
  {
    slug: "iso-42001",
    badge: "ISO 42001 AIMS",
    title: "ISO 42001 Lead Implementer",
    period: "Free training",
    blurb:
      "Artificial Intelligence Management Systems training for professionals moving into AI governance, compliance and risk management.",
    price: "Exam fee $360",
    highlights: ["AI governance depth", "Learn from anywhere", "Networking + guidance"],
  },
];

export const TESTIMONIALS = [
  {
    title: "5-Star Training",
    quote:
      "The course uses engaging virtual labs that helped me get better at what I do. With its dynamic course material and hands-on video labs, this is the best cybersecurity training you can get.",
    author: "Serwaa",
    role: "Security Analyst",
  },
  {
    title: "Look no further",
    quote:
      "Impressive cybersecurity course content. The live practice sessions in class using virtual labs and the LabEX platform added substantial value to the learning experience.",
    author: "Bahijah",
    role: "GRC Consultant",
  },
  {
    title: "Genuinely practical",
    quote:
      "I moved from theory to real detection work in weeks. The mentors answer fast and the labs mirror what an actual SOC shift feels like.",
    author: "Daniel",
    role: "SOC Tier 1",
  },
];

export const PROJECTS = [
  {
    no: "01",
    title: "Animation Studio",
    tag: "Digital Media",
    body: "An award-winning animation studio specializing in digital marketing content. We translated their brand message into compelling animations, comics, illustrations and designs that cut through digital noise and deliver proven ROI.",
  },
  {
    no: "02",
    title: "GRC Tool",
    tag: "Product Design",
    body: "We partnered with Blue Team Expert to elevate their digital presence through human-centered design — user research, intuitive navigation, streamlined workflows and visuals tailored to their brand.",
  },
  {
    no: "03",
    title: "Risk Assessment",
    tag: "Cyber Risk",
    body: "An in-depth evaluation of Digital Creation's cyber risk posture for the media production landscape, producing a clear risk profile and an actionable roadmap for strengthening defenses.",
  },
];

export const POSTS = [
  {
    slug: "latest-it-solutions",
    category: "IT Solutions",
    title: "Exploring the Latest IT Solutions",
    excerpt:
      "From platform consolidation to automation-first operations, here is what actually moves the needle for lean IT teams this year.",
    date: "Mar 12, 2025",
    read: "6 min read",
  },
  {
    slug: "advancing-cybersecurity",
    category: "Cybersecurity",
    title: "Advancing Cybersecurity",
    excerpt:
      "Detection engineering, threat-informed defense and why your SOC playbooks need to be living documents.",
    date: "Feb 28, 2025",
    read: "5 min read",
  },
  {
    slug: "datakey-ai",
    category: "DATAKEY (AI)",
    title: "Artificial Intelligence in Practice",
    excerpt:
      "Beyond the demos: governance, evaluation and the operational habits that make AI programs survive contact with production.",
    date: "Feb 09, 2025",
    read: "7 min read",
  },
  {
    slug: "biometric-data",
    category: "Data Privacy",
    title: "Why Your Biometric Data Is the New Target",
    excerpt:
      "Digital identity theft is shifting toward biometrics. You can change a password — you cannot change your fingerprint.",
    date: "Jan 22, 2025",
    read: "4 min read",
  },
];

export const FAQS = [
  {
    q: "What information security services do you offer?",
    a: "Advanced technologies, expert consultation and ongoing support that protect your data and operations — covering assessment, hardening, compliance management and continuous monitoring.",
  },
  {
    q: "Do you tailor training to our organization?",
    a: "Yes. Every training program is designed around the specific needs of your individuals or teams, from beginner awareness through advanced SOC and GRC tracks.",
  },
  {
    q: "How do the virtual labs work?",
    a: "Members get interactive lab environments with real AI and cybersecurity tooling. You experiment safely in a controlled environment and build practical, demonstrable skill.",
  },
  {
    q: "Are the certification exams included?",
    a: "Training for ISO 27001 Lead Auditor and ISO 42001 is free; participants cover the professional certification exam fee ($340 and $360 respectively).",
  },
  {
    q: "How quickly can we get started?",
    a: "Most engagements begin with a short discovery call within 48 hours, followed by a scoped proposal and a delivery timeline agreed up front.",
  },
];

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "Linkedin" },
  { label: "X", href: "https://x.com/", icon: "Twitter" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "Youtube" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "Facebook" },
] as const;

export const METRICS = [
  { value: 1200, suffix: "+", label: "Professionals trained", hint: "Across 3 continents" },
  { value: 40, suffix: "+", label: "Virtual lab scenarios", hint: "Updated every quarter" },
  { value: 98, suffix: "%", label: "Would recommend", hint: "Post-cohort survey" },
  { value: 24, suffix: "/7", label: "Support coverage", hint: "Humans and assistant" },
];

export const VALUES = [
  {
    icon: "Users",
    title: "Community first",
    body: "Every member is a contributor. Knowledge here is a shared currency, not a gated asset.",
  },
  {
    icon: "ShieldCheck",
    title: "Practice over theory",
    body: "If you cannot do it in a lab, you cannot do it on a shift. We teach with real tooling.",
  },
  {
    icon: "Sparkles",
    title: "Tech made easy",
    body: "We translate complexity into plain language so decisions get made, not deferred.",
  },
  {
    icon: "Handshake",
    title: "Long-term partnership",
    body: "We stay past go-live — reviews, mentorship and iteration are part of the deal.",
  },
];

export const TIMELINE = [
  {
    year: "2019",
    title: "A small study circle",
    body: "A handful of analysts and students started meeting to break down real incidents together.",
  },
  {
    year: "2021",
    title: "Virtual labs launched",
    body: "Hands-on lab environments replaced slide decks, and the first SOC cohort shipped.",
  },
  {
    year: "2023",
    title: "GRC and AI tracks",
    body: "RSA Archer, ISO 27001 and AI governance programs joined the catalogue.",
  },
  {
    year: "2025",
    title: "One Tech Nations",
    body: "A full hub — training, consulting, labs and a community that spans time zones.",
  },
];

export const SERVICE_STORIES = [
  {
    slug: "cybersecurity",
    kicker: "Defend",
    title: "Security programs that hold up on a real shift",
    body: "We build detection, response and hardening around how your team actually works — then prove it in labs that mirror live conditions rather than tidy classroom scenarios.",
    points: [
      "Threat-informed detection engineering",
      "Incident response playbooks your team rehearses",
      "Continuous monitoring and posture reviews",
    ],
    image: "security",
  },
  {
    slug: "artificial-intelligence",
    kicker: "Accelerate",
    title: "AI adoption with governance built in from day one",
    body: "From skill development to project collaboration and mentorship, we help teams ship AI that survives audit, review and production traffic — not just a convincing demo.",
    points: [
      "AI skill development programs",
      "Project collaboration platform and mentorship",
      "Evaluation, guardrails and ISO 42001 alignment",
    ],
    image: "ai",
  },
  {
    slug: "tech-solution",
    kicker: "Practice",
    title: "Interactive virtual labs for job-ready skill",
    body: "Members experiment safely in controlled environments with the same tooling used in modern security operations, turning theory into demonstrable, portfolio-grade experience.",
    points: [
      "40+ scenario-based lab environments",
      "Customized training for teams and individuals",
      "Networking events that turn into collaborations",
    ],
    image: "labs",
  },
  {
    slug: "it-consultation",
    kicker: "Advise",
    title: "Consulting that respects your constraints",
    body: "Assessments, strategic planning, vendor evaluation, system integration and awareness training — a consulting model that adapts to your budget, timeline and appetite for change.",
    points: [
      "Environment assessment and roadmap",
      "Vendor evaluation and integration support",
      "Change management and awareness training",
    ],
    image: "consulting",
  },
];

export const PROCESS = [
  { step: "01", title: "Discovery", body: "A short call to understand objectives, obstacles and constraints." },
  { step: "02", title: "Assessment", body: "We map your environment, surface risk and quantify the gap." },
  { step: "03", title: "Delivery", body: "Training, labs or implementation — scoped, timeboxed and measured." },
  { step: "04", title: "Iteration", body: "Reviews, mentorship and continuous improvement after go-live." },
];
