import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Code2, Film, Lightbulb, MapPin, GraduationCap, Trophy, Star, Palette } from 'lucide-react';
import { experience, achievements, certifications, cgpaData } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const traits = [
  { icon: <Code2 size={20} />, label: 'Full-Stack Dev', color: '#8b5cf6' },
  { icon: <Camera size={20} />, label: 'Photographer', color: '#06b6d4' },
  { icon: <Film size={20} />, label: 'Cinematographer', color: '#f59e0b' },
  { icon: <Lightbulb size={20} />, label: 'Innovator', color: '#10b981' },
];

const funFacts = [
  { icon: '🤖', text: 'Exploring ML & AWS' },
  { icon: '📸', text: 'Photographer & Filmmaker' },
  { icon: '🏆', text: 'Multiple award winner' },
  { icon: '🌐', text: 'Built 4+ live projects' },
];

const tabs = ['Timeline', 'Achievements', 'Certifications'];

// Average CGPA helper
const completedSems = cgpaData.filter((s) => s.cgpa);
const avgCgpa = (completedSems.reduce((a, s) => a + s.cgpa, 0) / completedSems.length).toFixed(2);
const bestSem = completedSems.reduce((best, s) => (s.cgpa > best.cgpa ? s : best), completedSems[0]);

export default function About() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Timeline');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const c = {
    bg: isDark ? '#0a0a0f' : '#ffffff',
    surface: isDark ? '#13131f' : '#f5f5f3',
    surface2: isDark ? '#0f0f1a' : '#ebebea',
    border: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(0,0,0,0.1)',
    text: isDark ? '#f1f5f9' : '#111111',
    muted: isDark ? '#94a3b8' : '#555555',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-left', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-left', start: 'top 80%' },
      });
      gsap.fromTo('.about-right', { opacity: 0, x: 60 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-right', start: 'top 80%' },
      });
      gsap.fromTo('.trait-card', { opacity: 0, scale: 0.85 }, {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.traits-grid', start: 'top 85%' },
      });
      gsap.fromTo('.fun-fact', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.fun-facts', start: 'top 88%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate tab content on switch
  useEffect(() => {
    gsap.fromTo('.tab-content', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
  }, [activeTab]);

  const timelineIcons = [<GraduationCap size={15} />, <Palette size={15} />];

  return (
    <section id="about" ref={sectionRef} className="py-24" style={{ background: c.bg }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
            style={{ color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)' }}>
            About Me
          </span>
          <h2 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: c.text }}>
            Tech meets <span className="gradient-text">Creativity</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left ── */}
          <div className="about-left">

            {/* Avatar card */}
            <div className="flex items-center gap-5 mb-8 p-5 rounded-2xl border" style={{ background: c.surface, borderColor: c.border }}>
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-extrabold"
                  style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', color: 'white' }}>
                  PG
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 glow-pulse"
                  style={{ borderColor: c.surface }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: c.text }}>Pranav Umesh Ghodke</h3>
                <p className="text-sm font-medium text-violet-400">IT Student & Creative Technologist</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs" style={{ color: c.muted }}>
                  <MapPin size={12} /> A. P. Shah Institute of Technology, Mumbai
                </div>
              </div>
            </div>

            <p className="mb-4 leading-relaxed text-[0.95rem]" style={{ color: c.muted }}>
              I'm a Bachelor's student in Information Technology at APSIT, Mumbai — currently deep in the world of
              Machine Learning, AWS, and Data Science while building full-stack products that solve real problems.
            </p>
            <p className="mb-8 leading-relaxed text-[0.95rem]" style={{ color: c.muted }}>
              Beyond code, I bring a creative edge through photography, cinematography, and video editing.
              I've competed in hackathons, led teams, and I'm currently in the final phase of the{' '}
              <span className="text-violet-400 font-medium">AI for Bharat Hackathon</span> powered by AWS.
              See my creative side on{' '}
              <a href="https://www.instagram.com/ghodke.1984/" target="_blank" rel="noreferrer"
                className="text-violet-400 border-b border-violet-400/40 hover:border-violet-400 transition-colors font-medium">
                @ghodke.1984
              </a>.
            </p>

            {/* Trait cards */}
            <div className="traits-grid grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {traits.map((t) => (
                <div key={t.label} className="trait-card flex items-center gap-3 p-4 rounded-2xl border cursor-default transition-all duration-300 hover:-translate-y-1"
                  style={{ background: c.surface, borderColor: c.border }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.color; e.currentTarget.style.boxShadow = `0 8px 24px ${t.color}22`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = 'none'; }}>
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0" style={{ color: t.color, background: `${t.color}18` }}>
                    {t.icon}
                  </span>
                  <span className="font-semibold text-sm" style={{ color: c.text }}>{t.label}</span>
                </div>
              ))}
            </div>

            {/* Fun facts */}
            <div className="fun-facts grid grid-cols-1 sm:grid-cols-2 gap-2">
              {funFacts.map((f) => (
                <div key={f.text} className="fun-fact flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm" style={{ background: c.surface2, color: c.muted }}>
                  <span className="text-base">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Tabbed panel ── */}
          <div className="about-right">

            {/* Tab switcher */}
            <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ background: c.surface2 }}>
              {tabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: activeTab === tab ? (isDark ? '#13131f' : '#ffffff') : 'transparent',
                    color: activeTab === tab ? '#8b5cf6' : c.muted,
                    boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.15)' : 'none',
                    border: 'none',
                  }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* ── Timeline tab ── */}
            {activeTab === 'Timeline' && (
              <div className="tab-content relative pl-7">
                <div className="absolute left-0 top-6 bottom-0 w-px"
                  style={{ background: 'linear-gradient(to bottom, #8b5cf6, transparent)' }} />

                {experience.map((item, i) => (
                  <div key={i} className="relative mb-5">
                    <div className="absolute -left-[1.85rem] top-4 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', color: 'white', boxShadow: '0 0 12px rgba(139,92,246,0.5)' }}>
                      {timelineIcons[i]}
                    </div>
                    <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      style={{ background: c.surface, borderColor: c.border }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; }}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-[0.95rem]" style={{ color: c.text }}>{item.role}</h4>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                          style={{ color: '#8b5cf6', background: 'rgba(139,92,246,0.1)' }}>
                          {item.year}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-cyan-400">{item.org}</span>
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: c.muted }}>{item.desc}</p>
                    </div>
                  </div>
                ))}

                {/* Currently exploring */}
                <div className="relative mb-5">
                  <div className="absolute -left-[1.85rem] top-4 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>
                    🚀
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: c.surface, borderColor: 'rgba(16,185,129,0.2)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-[0.95rem]" style={{ color: c.text }}>Currently Exploring</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-400/10">Now</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Machine Learning', 'AWS', 'Data Science', 'Next.js', 'Docker'].map((tech) => (
                        <span key={tech} className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CGPA Achievement Cards */}
                <div className="relative mb-5">
                  <div className="absolute -left-[1.85rem] top-4 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', color: 'white', boxShadow: '0 0 14px rgba(245,158,11,0.5)' }}>
                    <Trophy size={15} />
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: c.surface, borderColor: 'rgba(245,158,11,0.25)' }}>

                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div>
                        <h4 className="font-bold text-[0.95rem]" style={{ color: c.text }}>Academic Excellence</h4>
                        <p className="text-xs mt-0.5" style={{ color: c.muted }}>B.E. IT · APSIT</p>
                      </div>
                      {/* Trophy stat */}
                      <div className="flex flex-col items-center px-4 py-2 rounded-xl"
                        style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}>
                        <span className="text-2xl font-extrabold leading-none" style={{ color: '#f59e0b' }}>{avgCgpa}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: '#f59e0b' }}>Avg CGPA</span>
                      </div>
                    </div>

                    {/* Achievement banner */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
                      style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(251,191,36,0.06))', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <span className="text-xl">🏆</span>
                      <div>
                        <p className="text-xs font-bold" style={{ color: '#f59e0b' }}>
                          Best Semester: {bestSem.sem} — {bestSem.cgpa}
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: c.muted }}>
                          Consistently above 8.9 across all completed semesters
                        </p>
                      </div>
                    </div>

                    {/* Semester progress bars */}
                    <div className="flex flex-col gap-2.5">
                      {cgpaData.map((s) => {
                        const isBest = s.cgpa === bestSem.cgpa;
                        const isCurrent = !s.cgpa;
                        const pct = s.cgpa ? ((s.cgpa - 8) / (10 - 8)) * 100 : 0;
                        return (
                          <div key={s.sem} className="flex items-center gap-3">
                            {/* Sem label */}
                            <span className="text-[11px] font-bold w-10 flex-shrink-0" style={{ color: c.muted }}>{s.sem}</span>
                            {/* Bar */}
                            <div className="flex-1 h-2 rounded-full overflow-hidden relative"
                              style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)' }}>
                              {!isCurrent && (
                                <div className="h-full rounded-full transition-all duration-700"
                                  style={{
                                    width: `${pct}%`,
                                    background: isBest
                                      ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                                      : 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                                  }} />
                              )}
                              {isCurrent && (
                                <div className="h-full w-1/3 rounded-full animate-pulse"
                                  style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.4), transparent)' }} />
                              )}
                            </div>
                            {/* Value */}
                            <div className="flex items-center gap-1 w-20 flex-shrink-0 justify-end">
                              {isCurrent ? (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                  style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
                                  In Progress
                                </span>
                              ) : (
                                <>
                                  <span className="text-sm font-extrabold" style={{ color: isBest ? '#f59e0b' : c.text }}>{s.cgpa}</span>
                                  {isBest && <Star size={11} fill="#f59e0b" color="#f59e0b" />}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                </div>

              </div>
            )}
            {activeTab === 'Achievements' && (
              <div className="tab-content flex flex-col gap-3">
                {achievements.map((a, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: c.surface, borderColor: c.border }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${a.color}55`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${a.color}18`, border: `1px solid ${a.color}30` }}>
                      {a.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm" style={{ color: c.text }}>{a.title}</h4>
                        {a.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${a.color}20`, color: a.color, border: `1px solid ${a.color}40` }}>
                            {a.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold mt-0.5 mb-1" style={{ color: a.color }}>{a.event}</p>
                      <p className="text-xs leading-relaxed" style={{ color: c.muted }}>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Certifications tab ── */}
            {activeTab === 'Certifications' && (
              <div className="tab-content grid grid-cols-1 gap-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: c.surface, borderColor: c.border }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${cert.color}55`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; }}>
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}30` }}>
                      {cert.icon}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm" style={{ color: c.text }}>{cert.title}</h4>
                        {cert.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${cert.color}20`, color: cert.color, border: `1px solid ${cert.color}40` }}>
                            {cert.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: c.muted }}>{cert.issuer}</p>
                    </div>
                    {/* Year badge */}
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0"
                      style={{ background: `${cert.color}12`, color: cert.color, border: `1px solid ${cert.color}25` }}>
                      {cert.year}
                    </span>
                  </div>
                ))}

                <p className="text-xs text-center mt-2 italic" style={{ color: c.muted }}>
                  * Certificate images can be added by updating the data file with image URLs.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
