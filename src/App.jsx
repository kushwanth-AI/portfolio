import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Moon,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  TerminalSquare,
  X,
} from 'lucide-react'
import kushwanthImage from './assets/kushwanth.png'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
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
    company: 'IBM',
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  const [activeSection, setActiveSection] = useState('about')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const currentIcon = useMemo(() => (theme === 'dark' ? Sun : Moon), [theme])
  const ThemeIcon = currentIcon

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
          
          <span>Kushwanth Yantrapati</span>
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
          <a className="nav-cta" href="mailto:kushwanthyantrapati5@gmail.com">
            <Send size={16} />
            Hire Me
          </a>
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
            <div className="availability">
              <span />
              BUILDING MULTI-AGENT HEALTHCARE AI SYSTEMS
            </div>
            <div className="hero-pills">
              <span><Sparkles size={15} /> AI Engineer</span>
              <span><BrainCircuit size={15} /> LLM Systems</span>
              <span><MapPin size={15} /> Hyderabad, India</span>
            </div>
            <h1>
              Hi, I'm <span>Kushwanth</span>
            </h1>
            <p>
              AI Engineer specializing in Generative AI, LLMs, and Agentic systems, with experience in building scalable RAG pipelines, knowledge-driven applications, and secure APIs using Python, FastAPI, LangChain, and LangGraph.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                <Layers3 size={18} />
                View Projects
              </a>
              <a className="secondary-button" href="#contact">
                <MessageSquare size={18} />
                Get in Touch
              </a>
            </div>
            <div className="stat-grid">
              <div><strong>3 yrs</strong><span>AI, ML and analytics experience</span></div>
              <div><strong>4+</strong><span>Enterprise AI project builds</span></div>
              <div><strong>15+</strong><span>Production-ready technologies</span></div>
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
















