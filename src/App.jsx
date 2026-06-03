import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Quote,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  TerminalSquare,
  Users,
  X,
} from 'lucide-react'
import {
  SiPython,
  SiFastapi,
  SiReact,
  SiVite,
  SiLanggraph,
  SiLangchain,
  SiOpenai,
  SiClaude,
  SiModelcontextprotocol,
  SiDocker,
  SiPostgresql,
  SiGithub,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import kushwanthImage from './assets/kushwanth.png'
import AvatarBadge from './components/AvatarBadge'

const primaryTech = [
  { name: 'Python', Icon: SiPython, color: '#FFD43B' },
  { name: 'FastAPI', Icon: SiFastapi, color: '#05B6A2' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'LangChain', Icon: SiLangchain, color: '#2ECC71' },
  { name: 'LangGraph', Icon: SiLanggraph, color: '#A78BFA' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#5B9BD5' },
]

const extraTech = [
  { name: 'Vite', Icon: SiVite, color: '#A259FF' },
  { name: 'OpenAI', Icon: SiOpenai, color: '#E5ECF6' },
  { name: 'Claude', Icon: SiClaude, color: '#D97757' },
  { name: 'ChatGPT', Icon: SiOpenai, color: '#74AA9C' },
  { name: 'MCP', Icon: SiModelcontextprotocol, color: '#CBD7E8' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'GitHub', Icon: SiGithub, color: '#E5ECF6' },
  { name: 'AWS', Icon: FaAws, color: '#FF9900' },
]

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const highlights = [
  {
    icon: BrainCircuit,
    title: 'LLM & Agent Systems',
    text: 'Building multi-step AI agents that automate complex enterprise workflows using LangChain & LangGraph.',
  },
  {
    icon: Layers3,
    title: 'RAG & Knowledge Retrieval',
    text: 'Production-grade RAG pipelines with vector databases for semantic search over large knowledge bases.',
  },
  {
    icon: Code2,
    title: 'FastAPI Backend Engineering',
    text: 'Secure, scalable REST APIs integrating LLM models with backend systems, databases, and enterprise platforms at production scale.',
  },
  {
    icon: Database,
    title: 'Data Analytics & BI',
    text: 'End-to-end data pipelines and Power BI dashboards transforming raw enterprise data into business insights.',
  },
]

const skills = [
  {
    icon: BrainCircuit,
    title: 'AI & LLM Engineering',
    tags: ['LangChain', 'LangGraph', 'OpenAI API', 'AI Agents', 'MCP', 'Prompt Engineering'],
  },
  {
    icon: Sparkles,
    title: 'RAG & Knowledge Systems',
    tags: ['RAG Pipelines', 'Knowledge Retrieval', 'Vector Databases', 'NLP', 'Embeddings', 'Semantic Search'],
  },
  {
    icon: Code2,
    title: 'Backend & APIs',
    tags: ['Python', 'FastAPI', 'RESTful APIs', 'SQL Generation', 'Microservices'],
  },
  {
    icon: ShieldCheck,
    title: 'Auth & Security',
    tags: ['Microsoft Entra ID', 'JWT', 'OAuth 2.0', 'SSO', 'RBAC'],
  },
  {
    icon: Database,
    title: 'Databases',
    tags: ['PostgreSQL', 'Oracle', 'Pinecone', 'Chroma', 'MySQL', 'Neo4j'],
  },
  {
    icon: TerminalSquare,
    title: 'Data Analytics',
    tags: ['Pandas', 'NumPy', 'Power BI', 'Matplotlib', 'Excel', 'Seaborn'],
  },
  {
    icon: Code2,
    title: 'Dev Tools & Cloud',
    tags: ['Git', 'GitHub', 'Docker', 'VS Code', 'Azure', 'Linux'],
  },
  {
    icon: ArrowUpRight,
    title: 'Web & Integration',
    tags: ['HTML/CSS', 'JavaScript', 'Webhook', 'API Integration', 'Postman'],
  },
]

const projects = [
  {
    status: 'Active',
    statusBadge: 'Live',
    company: 'Apollo Health and Lifestyle Limited',
    category: 'Enterprise Healthcare AI',
    featured: true,
    title: 'Apollo ARIA - AI-Powered Multi-Agent Healthcare Assistant | Apollo Hospitals',
    description:
      'Developing a production-grade multi-agent AI healthcare assistant for Apollo Hospitals managing the complete patient journey - from symptom understanding and doctor discovery to appointment booking, diagnostics, invoice generation, and payment processing. Architected a modular LangGraph orchestration layer with dedicated agents for intent parsing, RAG retrieval, doctor search, booking, memory management, queue workflows, and hospital guidance systems. Powered by GPT-4 with session-based conversational memory, QdrantDB RAG pipelines, OCR-based medical report analysis, and Sarvam AI multilingual voice interactions across English, Telugu, Hindi, Tamil, and Kannada.',
    stack: ['Live Project', 'Production AI', 'Multi-Agent AI', 'Healthcare AI', 'LangGraph', 'GPT-4', 'Apollo Hospitals', 'FastAPI', 'QdrantDB', 'Redis', 'PostgreSQL', 'Sarvam AI', 'React.js', 'Razorpay'],
    lines: ['w-92', 'w-88', 'w-78'],
  },
  {
    status: 'Completed',
    statusBadge: 'Completed',
    company: 'Enterprise AI',
    category: 'Enterprise AI Architecture',
    title: 'AI-Driven SQL Generation using Knowledge Graph',
    description:
      'Intelligent system that translates natural language into optimized SQL queries using knowledge graphs, allowing non-technical users to query complex enterprise databases without writing SQL. Integrates graph-based schema understanding with LLM reasoning for accurate, context-aware query generation.',
    stack: ['Python', 'LangGraph', 'Knowledge Graph', 'FastAPI', 'LLM', 'Neo4j', 'PostgreSQL'],
    lines: ['w-92', 'w-76', 'w-58'],
  },
  {
    status: 'Completed',
    company: 'Enterprise AI',
    category: 'Knowledge Retrieval',
    title: 'Enterprise RAG (Retrieval-Augmented Generation) System',
    description:
      'Production-grade RAG pipeline enabling AI agents to retrieve and process information from enterprise knowledge bases using vector databases. Features optimized chunking strategies, hybrid search, and re-ranking for high-accuracy semantic retrieval at scale.',
    stack: ['RAG', 'LangChain', 'Pinecone', 'FAISS', 'Python', 'OpenAI', 'FastAPI'],
    lines: ['w-84', 'w-68', 'w-78'],
  },
  {
    status: 'Completed',
    company: 'Enterprise AI',
    category: 'Predictive Maintenance',
    title: 'Asset Health Care - Real-Time Asset Monitoring System',
    description:
      'Real-time monitoring platform for enterprise asset health tracking with AI-powered anomaly detection to predict failures before they occur, reducing downtime across critical infrastructure. Designed RESTful APIs for live sensor data ingestion and alert management.',
    stack: ['Python', 'FastAPI', 'Predictive Maintenance', 'K-means', 'Clustering', 'Anomaly Detection', 'PostgreSQL'],
    lines: ['w-72', 'w-88', 'w-52'],
  },
  {
    status: 'Completed',
    company: 'Analytics',
    category: 'Reporting Dashboards',
    title: 'Data Analytics & Reporting Dashboards',
    description:
      'Analyzed large-scale clinical datasets using Python by performing data cleaning and preprocessing with Pandas and NumPy. Conducted EDA to identify patterns and anomalies, and created visualizations using Matplotlib and Seaborn to generate actionable insights.',
    stack: ['Python', 'Pandas', 'Seaborn', 'SQL', 'NumPy', 'Excel', 'Matplotlib'],
    lines: ['w-88', 'w-56', 'w-72'],
  },
]

const blogs = [
  {
    title: 'Designing Reliable Multi-Agent AI Workflows',
    description:
      'A practical look at how orchestration, memory, tools, and guardrails shape dependable AI agents for real users.',
    category: 'AI',
    date: 'May 12, 2026',
  },
  {
    title: 'From APIs to Products: Lessons in FastAPI Delivery',
    description:
      'Notes from building clean backend services that connect LLM features with secure enterprise systems.',
    category: 'Web Development',
    date: 'Apr 28, 2026',
  },
  {
    title: 'My Learning Journey Through RAG Systems',
    description:
      'How chunking, embeddings, retrieval quality, and evaluation changed the way I approach knowledge applications.',
    category: 'Learning Journey',
    date: 'Mar 17, 2026',
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Product Manager',
    initials: 'PS',
    text: 'Kushwanth brings a rare mix of AI depth and product thinking. He explains complex ideas clearly and moves quickly from prototype to usable solution.',
  },
  {
    name: 'Rahul Mehta',
    role: 'Senior Backend Engineer',
    initials: 'RM',
    text: 'His API work is thoughtful, reliable, and easy to integrate. He pays attention to edge cases while keeping the implementation clean.',
  },
  {
    name: 'Ananya Reddy',
    role: 'Data Analytics Lead',
    initials: 'AR',
    text: 'Kushwanth turns ambiguous business requirements into practical AI and analytics workflows that teams can actually use.',
  },
]

const galleryItems = [
  {
    title: 'AI Workspace',
    caption: 'Daily setup for planning agent workflows, APIs, and product notes.',
    category: 'Workspace',
    size: 'tile-tall',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Model Experiments',
    caption: 'Prompt tests, retrieval checks, and evaluation passes.',
    category: 'Projects',
    size: 'tile-wide',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Healthcare AI Build',
    caption: 'Conversational healthcare automation and patient journey systems.',
    category: 'Projects',
    size: 'tile-large',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Kushwanth',
    caption: 'Personal portfolio photo placeholder.',
    category: 'Workspace',
    size: 'tile-tall',
    image: kushwanthImage,
  },
  {
    title: 'Backend Notes',
    caption: 'FastAPI architecture, service boundaries, and integration planning.',
    category: 'Workspace',
    size: 'tile-medium',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Analytics Dashboard',
    caption: 'Data stories, reporting flows, and insight reviews.',
    category: 'Projects',
    size: 'tile-wide',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Learning Milestone',
    caption: 'Certification and continuous learning highlights.',
    category: 'Certifications',
    size: 'tile-medium',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Team Collaboration',
    caption: 'Sprint planning, demos, and stakeholder discussions.',
    category: 'Events',
    size: 'tile-large',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Code Review',
    caption: 'Quality checks before shipping production-ready AI features.',
    category: 'Projects',
    size: 'tile-medium',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Conference Moment',
    caption: 'Learning from builders and exploring new AI product ideas.',
    category: 'Events',
    size: 'tile-wide',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
  },
]

const galleryFilters = ['All', 'Workspace', 'Projects', 'Certifications', 'Events']

const experiences = [
  {
    company: 'Apollo Health and Lifestyle Limited (AHLL)',
    role: 'AI Solutions Engineer - Agentic AI',
    type: 'Present',
    period: 'Apr 2026 - Present',
    location: 'Greater Hyderabad Area - Hybrid',
    project: 'Apollo ARIA - AI-Powered Multi-Agent Healthcare Assistant',
    achievements: [
      'Developing a production-grade multi-agent AI healthcare assistant for Apollo Hospitals managing the complete patient journey - from symptom understanding and doctor discovery to appointment booking, diagnostics, invoice generation, and payment processing.',
      'Architected a modular LangGraph orchestration layer with dedicated agents for intent parsing, RAG retrieval, doctor search, booking, memory management, queue workflows, and hospital guidance systems.',
      'Powered by GPT-4 with session-based conversational memory, QdrantDB RAG pipelines for real-time service/pricing retrieval, OCR-based medical report analysis with AI-generated summaries, and Sarvam AI multilingual voice interactions across English, Telugu, Hindi, Tamil, and Kannada.',
      'Integrated deeply with Apollo UAT APIs for live patient lookup, family profile matching, real-time doctor discovery, slot management, booking workflows, WhatsApp/email automation, arrival detection, and live queue workflows.',
      'Built scalable backend architecture using FastAPI, Redis, PostgreSQL, LangGraph, realtime WebSocket orchestration, SQLAlchemy, Razorpay, Twilio, and SendGrid.',
    ],
  },
  {
    company: 'Cognitive Techware',
    role: 'AI Engineer',
    type: 'Full-time',
    period: 'June 2024 - Mar 2026',
    location: 'Hyderabad, India',
    project: 'NLP-to-SQL / AI-Driven SQL Generation - Completed Apr 2026',
    achievements: [
      'Designed and deployed enterprise AI agents using LangChain and LangGraph to automate complex multi-step workflows and enable natural language data interactions.',
      'Built and optimized RAG pipelines with vector databases (Pinecone, FAISS, Chroma) enabling high-accuracy semantic search over large enterprise knowledge bases.',
      'Developed secure RESTful APIs using FastAPI to integrate LLM models with backend systems, databases, and enterprise platforms at production scale.',
      'Implemented enterprise-grade authentication using Microsoft Entra ID, OAuth 2.0, and JWT to protect AI-driven applications and manage role-based user access.',
      'Engineered an AI-driven SQL generation system using knowledge graphs that translates natural language into optimized SQL queries for non-technical users. Completed April 2026.',
      'Built real-time asset monitoring system with AI-powered anomaly detection, reducing equipment downtime across critical infrastructure.',
      'Collaborated with cross-functional teams to gather requirements, iterate on AI solutions, and deliver production-ready features within sprint timelines.',
    ],
  },
  {
    company: 'IBEAP Solutions Pvt. Ltd.',
    role: 'Data Analyst Intern',
    type: 'Internship',
    period: 'June 2023 - May 2024',
    location: 'Hyderabad, India',
    achievements: [
      'Analyzed large enterprise datasets using Python (Pandas, NumPy) to extract actionable business insights and support data-driven decision making for stakeholders.',
      'Built interactive dashboards and reports in Power BI and Excel, presenting complex data findings clearly and visually to non-technical business audiences.',
      'Developed automated data processing pipelines that eliminated repetitive manual reporting, saving significant weekly effort across the analytics team.',
      'Wrote complex SQL queries to extract, transform, and load data from relational databases for downstream analytics and reporting workflows.',
    ],
  },
]
const education = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    college: 'Audisankara College of Engineering & Technology',
    period: '2021 - 2024',
    location: 'Gudur, Andhra Pradesh',
    tags: ['Electrical & Electronics Engineering', 'Internet of Things (IoT)', 'Embedded Systems', 'ESP32', 'Sensors & Actuators'],
  },
  {
    degree: 'Diploma in Electrical Engineering',
    college: 'Audisankara College of Engineering & Technology',
    period: '2019 - 2021',
    location: 'Gudur, Andhra Pradesh',
    tags: ['Electrical Fundamentals', 'Circuit Analysis', 'Troubleshooting', 'Embedded Systems'],
  },
]

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kushwanthyantrapati5@gmail.com',
    href: 'mailto:kushwanthyantrapati5@gmail.com',
  },
  {
    icon: BriefcaseBusiness,
    label: 'LinkedIn',
    value: 'kushwanth-yantrapati-48356838a',
    href: 'https://www.linkedin.com/in/kushwanth-yantrapati-48356838a/',
  },
  {
    icon: Code2,
    label: 'GitHub',
    value: 'github.com/kushwanth-AI',
    href: 'https://github.com/kushwanth-AI',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Hyderabad, Telangana, India',
  },
  {
    icon: MessageSquare,
    label: 'Availability',
    value: 'Building Multi-Agent Healthcare AI Systems',
    accent: true,
  },
]

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header reveal">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function Tag({ children }) {
  return <span className="tag">{children}</span>
}

function BlogCard({ blog }) {
  return (
    <article className="blog-card reveal">
      <div className="blog-meta">
        <span>{blog.category}</span>
        <small><CalendarDays size={14} /> {blog.date}</small>
      </div>
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>
      <a className="read-more" href="#contact" aria-label={`Read more about ${blog.title}`}>
        Read More
        <ArrowUpRight size={16} />
      </a>
    </article>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <article className="testimonial-card reveal">
      <Quote className="quote-mark" size={28} />
      <p>{testimonial.text}</p>
      <div className="testimonial-person">
        <span className="avatar-initials">{testimonial.initials}</span>
        <span>
          <strong>{testimonial.name}</strong>
          <small>{testimonial.role}</small>
        </span>
      </div>
    </article>
  )
}

function GalleryCard({ item }) {
  return (
    <article className={`gallery-card reveal ${item.size}`}>
      <img src={item.image} alt={item.title} />
      <div className="gallery-content">
        <span>{item.category}</span>
        <h3>{item.title}</h3>
        <p>{item.caption}</p>
      </div>
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  const [activeSection, setActiveSection] = useState('about')
  const [galleryFilter, setGalleryFilter] = useState('All')
  const [techOpen, setTechOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const currentIcon = useMemo(() => (theme === 'dark' ? Sun : Moon), [theme])
  const ThemeIcon = currentIcon
  const visibleGalleryItems = useMemo(
    () => galleryItems.filter((item) => galleryFilter === 'All' || item.category === galleryFilter),
    [galleryFilter],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.14 },
    )

    revealItems.forEach((item, index) => {
      item.style.setProperty('--delay', `${Math.min(index * 45, 360)}ms`)
      revealObserver.observe(item)
    })

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )

    document.querySelectorAll('section[id]').forEach((section) => sectionObserver.observe(section))

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function sendMessage(event) {
    event.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()
    const subject = form.subject.trim() || 'Portfolio Inquiry'

    if (!name || !email || !message) {
      window.alert('Please fill in your name, email, and message.')
      return
    }

    const body = `${message}\n\nFrom: ${name}\nEmail: ${email}`
    window.location.href = `mailto:kushwanthyantrapati5@gmail.com?subject=${encodeURIComponent(`${subject} from ${name}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="site-shell">
      <div className="noise-layer" />
      <div className="grid-layer" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />

      <header className="navbar">
        <a className="brand" href="#hero" onClick={() => setMenuOpen(false)}>
          <AvatarBadge initials="KY" size={46} />
          <span className="brand-text">
            <strong>Kushwanth Yantrapati</strong>
            <small>AI Engineer</small>
          </span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={activeSection === item.href.replace('#', '') ? 'active' : ''}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <ThemeIcon size={18} />
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-copy reveal">
            <div className="hero-pills">
              <span><span className="pill-dot" /> AI Engineer | Building Multi-Agent Healthcare AI Systems</span>
            </div>
            <h1>
              Hi, I'm <span>Kushwanth Yantrapati</span>
            </h1>
            <p className="hero-role">
              AI Engineer specializing in Generative AI, LLMs, and Agentic systems. I build scalable RAG pipelines, intelligent agents, and production-grade AI applications.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                <Layers3 size={18} />
                View Projects
              </a>
              <a className="secondary-button" href="#contact">
                <MessageSquare size={18} />
                Get In Touch
              </a>
            </div>
            <div className="hero-tech">
              <span className="hero-tech-label">Trusted Technologies</span>
              <div className="hero-tech-row">
                {primaryTech.map(({ name, Icon, color }) => (
                  <span
                    className="tech-chip"
                    key={name}
                    title={name}
                    aria-label={name}
                    style={{ '--logo-color': color }}
                  >
                    <Icon className="tech-logo" aria-hidden="true" focusable="false" />
                  </span>
                ))}

                <div
                  className="tech-more"
                  onMouseEnter={() => setTechOpen(true)}
                  onMouseLeave={() => setTechOpen(false)}
                >
                  <button
                    type="button"
                    className={`tech-chip tech-more-btn ${techOpen ? 'is-open' : ''}`}
                    aria-label="Show more technologies"
                    aria-expanded={techOpen}
                    onClick={() => setTechOpen((open) => !open)}
                  >
                    <MoreHorizontal className="tech-logo" aria-hidden="true" focusable="false" />
                  </button>

                  <div className={`tech-popover ${techOpen ? 'is-open' : ''}`} role="menu">
                    {extraTech.map(({ name, Icon, color }) => (
                      <span
                        className="tech-chip tech-chip-sm"
                        key={name}
                        title={name}
                        aria-label={name}
                        role="menuitem"
                        style={{ '--logo-color': color }}
                      >
                        <Icon className="tech-logo" aria-hidden="true" focusable="false" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="profile-card">
              <div className="profile-rings">
                <img src={kushwanthImage} alt="Kushwanth Yantrapati" />
                <div className="floating-chip chip-top">4+ <span>AI Projects</span></div>
                <div className="floating-chip chip-right">15+ <span>Technologies</span></div>
              </div>
            </div>
          </div>

          <div className="stat-bar reveal">
            <div className="stat-item">
              <span className="stat-icon"><Rocket size={20} /></span>
              <div><strong>3+</strong><span>Years Experience</span></div>
            </div>
            <div className="stat-item">
              <span className="stat-icon"><Code2 size={20} /></span>
              <div><strong>4+</strong><span>Enterprise Projects</span></div>
            </div>
            <div className="stat-item">
              <span className="stat-icon"><Users size={20} /></span>
              <div><strong>2+</strong><span>Happy Clients</span></div>
            </div>
            <div className="stat-item">
              <span className="stat-icon"><Sparkles size={20} /></span>
              <div><strong>15+</strong><span>Technologies</span></div>
            </div>
          </div>
        </section>

        <section id="about" className="content-section">
          <SectionHeader
            eyebrow="Who I Am"
            title="About Me"
            description="I'm Kushwanth Yantrapati, an AI Engineer with 3 years of experience in Generative AI and Machine Learning, building intelligent systems that solve real enterprise problems."
          />
          <div className="about-layout">
            <div className="glass-panel about-text reveal">
              <div className="about-profile">
                <img src={kushwanthImage} alt="Kushwanth Yantrapati" />
                <div>
                  <strong>Kushwanth Yantrapati</strong>
                  <span>AI Solutions Engineer - Agentic AI</span>
                </div>
              </div>
              <p>
                AI Solutions Engineer specializing in Generative AI, Multi-Agent Systems, and Enterprise AI Platforms. Currently working at Apollo Health and Lifestyle Limited (AHLL), developing Apollo ARIA - a production-grade AI-powered healthcare assistant for Apollo Hospitals that streamlines the complete patient journey through intelligent automation, conversational AI, realtime appointment orchestration, multilingual voice interactions, and enterprise healthcare workflows.
              </p>
              <p>
                Experienced in building scalable AI architectures using Python, FastAPI, LangGraph, GPT-4, Redis, PostgreSQL, vector databases, and modern AI frameworks. Passionate about designing enterprise-grade AI systems that combine RAG pipelines, intelligent agents, realtime APIs, and workflow automation to solve complex operational challenges and deliver impactful real-world AI products.
              </p>
              <p>
                Strongly focused on building intelligent, scalable, and production-ready AI solutions that bridge advanced machine learning with real-world enterprise operations. Skilled in developing end-to-end AI systems including conversational assistants, enterprise search platforms, intelligent workflow automation, realtime data pipelines, and AI-driven decision support systems with a strong emphasis on performance, reliability, and user experience.
              </p>
              <p>
                Driven by a passion for solving complex problems through AI, I enjoy transforming ambitious ideas into scalable digital products that create measurable real-world impact. I thrive in fast-paced collaborative environments, continuously exploring emerging AI technologies, system design patterns, and intelligent automation strategies to build next-generation enterprise applications.
              </p>
            </div>
            <div className="highlight-grid">
              {highlights.map(({ icon: Icon, title, text }) => (
                <article className="mini-card reveal" key={title}>
                  <span className="card-icon"><Icon size={22} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="content-section">
          <SectionHeader
            eyebrow="Expertise"
            title="Skills & Technologies"
            description="A curated stack built around enterprise AI - from intelligent agents to secure API architecture."
          />
          <div className="skills-grid">
            {skills.map(({ icon: Icon, title, tags }) => (
              <article className="skill-card reveal" key={title}>
                <span className="card-icon"><Icon size={22} /></span>
                <h3>{title}</h3>
                <div className="tag-list">
                  {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section">
          <SectionHeader
            eyebrow="Work"
            title="Featured Projects"
            description="Enterprise AI systems designed to simplify how users interact with data, knowledge, and enterprise platforms."
          />
          <div className="projects-grid">
            {projects.map((project) => (
              <article className={`project-card reveal ${project.featured ? 'featured-project' : ''}`} key={project.title}>
                <div className="project-preview">
                  <div className="preview-window">
                    <div className="preview-dots"><span /><span /><span /></div>
                    <div className="preview-lines">
                      {project.lines.map((line, index) => <span className={line} key={`${line}-${index}`} />)}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-meta-row">
                    <span className={`project-status ${project.status === 'Active' ? 'active' : project.status === 'Live' ? 'live' : 'completed'}`}>{project.statusBadge || project.status}</span>
                    {project.company && <span className="project-company">{project.company}</span>}
                  </div>
                  {project.category && <div className="project-category">{project.category}</div>}
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.stack.map((item) => <Tag key={item}>{item}</Tag>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="blogs" className="content-section">
          <SectionHeader
            eyebrow="Insights"
            title="Blogs"
            description="Short notes and practical lessons from building AI systems, web APIs, and project workflows."
          />
          <div className="blogs-grid">
            {blogs.map((blog) => <BlogCard blog={blog} key={blog.title} />)}
          </div>
        </section>

        <section id="testimonials" className="content-section">
          <SectionHeader
            eyebrow="Feedback"
            title="Testimonials"
            description="Sample feedback placeholders for collaborators, teammates, and stakeholders."
          />
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard testimonial={testimonial} key={testimonial.name} />
            ))}
          </div>
        </section>

        <section id="gallery" className="content-section">
          <SectionHeader
            eyebrow="Snapshots"
            title="Gallery"
            description="A photo-style wall for project work, workspace moments, events, and certification highlights."
          />
          <div className="gallery-filters reveal" aria-label="Gallery filters">
            {galleryFilters.map((filter) => (
              <button
                className={galleryFilter === filter ? 'active' : ''}
                type="button"
                onClick={() => setGalleryFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {visibleGalleryItems.map((item) => <GalleryCard item={item} key={item.title} />)}
          </div>
        </section>

        <section id="experience" className="content-section">
          <SectionHeader
            eyebrow="Career"
            title="Work Experience"
            description="Building intelligent AI systems at scale across enterprise environments in Hyderabad."
          />
          <div className="timeline">
            {experiences.map((item) => (
              <article className="timeline-card reveal" key={item.company}>
                <div className="timeline-head">
                  <div>
                    <h3>{item.company}</h3>
                    <p>{item.role}</p>
                    {item.project && <small className="timeline-project">{item.project}</small>}
                  </div>
                  <span>{item.type}</span>
                </div>
                <div className="meta-line">
                  <BriefcaseBusiness size={16} />
                  {item.period}
                  <MapPin size={16} />
                  {item.location}
                </div>
                <ul>
                  {item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="content-section">
          <SectionHeader
            eyebrow="Academics"
            title="Education"
            description="The academic foundation that sparked a passion for AI and intelligent systems."
          />
          <div className="education-grid">
            {education.map((item) => (
              <article className="education-card reveal" key={item.degree}>
                <span className="card-icon"><GraduationCap size={24} /></span>
                <div>
                  <h3>{item.degree}</h3>
                  <p className="education-college">{item.college}</p>
                  <p className="meta-line">{item.period} - {item.location}</p>
                  <div className="tag-list">
                    {item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section">
          <SectionHeader
            eyebrow="Let's Connect"
            title="Get in Touch"
            description="Open to AI engineering roles, freelance projects, and collaboration. Let's build something intelligent together."
          />
          <div className="contact-grid">
            <div className="contact-list">
              {contacts.map(({ icon: Icon, label, value, href, accent }) => {
                const content = (
                  <>
                    <span className="contact-icon"><Icon size={20} /></span>
                    <span>
                      <small>{label}</small>
                      <strong className={accent ? 'available' : ''}>{value}</strong>
                    </span>
                  </>
                )

                return href ? (
                  <a className="contact-card reveal" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} key={label}>
                    {content}
                  </a>
                ) : (
                  <div className="contact-card reveal" key={label}>{content}</div>
                )
              })}
            </div>

            <form className="contact-form reveal" onSubmit={sendMessage}>
              <label>
                Your Name
                <input name="name" value={form.name} onChange={updateForm} placeholder="John Doe" />
              </label>
              <label>
                Email Address
                <input name="email" type="email" value={form.email} onChange={updateForm} placeholder="john@company.com" />
              </label>
              <label>
                Subject
                <input name="subject" value={form.subject} onChange={updateForm} placeholder="Job Opportunity / Collaboration / Freelance" />
              </label>
              <label>
                Message
                <textarea name="message" value={form.message} onChange={updateForm} placeholder="Let's build something intelligent together..." />
              </label>
              <button className="primary-button" type="submit">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>Built by <span>Kushwanth Yantrapati</span> - AI Solutions Engineer - Hyderabad, India - 2026</p>
      </footer>
    </div>
  )
}

export default App
















