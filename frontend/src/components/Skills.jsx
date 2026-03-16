import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

import RadarChart from './RadarChart';

gsap.registerPlugin(ScrollTrigger);

const categoryColors = {
  Frontend: '#FFB800',
  Backend: '#FF4D00',
  Database: '#10b981',
  Language: '#f59e0b',
  Creative: '#ef4444',
  Tools: '#64748b',
  Deployment: '#f97316',
};

const ALL = 'All';
const categories = [ALL, ...new Set(skills.map((s) => s.category))];

// Top 4 skills for circular display
const topSkills = skills.sort((a, b) => b.level - a.level).slice(0, 4);

function CircleSkill({ skill, isDark }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const color = categoryColors[skill.category];
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { strokeDashoffset: circ }, {
        strokeDashoffset: circ - (skill.level / 100) * circ,
        duration: 1.5, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
    return () => ctx.revert();
  }, [circ, skill.level]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} fill="none" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} strokeWidth="6" />
          <circle ref={ref} cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-extrabold" style={{ color }}>{skill.level}%</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-center" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{skill.name}</span>
      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color, background: `${color}15` }}>{skill.category}</span>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(ALL);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const c = {
    bg: isDark ? '#111111' : '#f5f5f3',
    surface: isDark ? '#141414' : '#ffffff',
    border: isDark ? 'rgba(255,184,0,0.15)' : 'rgba(0,0,0,0.1)',
    text: isDark ? '#ffffff' : '#111111',
    muted: isDark ? '#94a3b8' : '#555555',
    barBg: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    tabBg: isDark ? '#141414' : '#ffffff',
    tabActiveBg: isDark ? 'rgba(255,184,0,0.12)' : 'rgba(0,0,0,0.08)',
  };

  const filtered = activeTab === ALL ? skills : skills.filter((s) => s.category === activeTab);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-header', start: 'top 85%' },
      });
      ScrollTrigger.create({
        trigger: '.skills-bars',
        start: 'top 80%',
        onEnter: () => {
          document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
            gsap.fromTo(bar, { width: 0 }, {
              width: bar.dataset.level + '%',
              duration: 1.2, ease: 'power3.out',
              delay: parseFloat(bar.dataset.delay || 0),
            });
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-animate bars when tab changes
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
        gsap.fromTo(bar, { width: 0 }, {
          width: bar.dataset.level + '%',
          duration: 1, ease: 'power3.out',
          delay: parseFloat(bar.dataset.delay || 0),
        });
      });
    }, 50);
  }, [activeTab]);

  return (
    <section id="skills" ref={sectionRef} className="py-24" style={{ background: c.bg }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="skills-header text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
            style={{ color: '#FFB800', background: 'rgba(255,184,0,0.1)', borderColor: 'rgba(255,184,0,0.3)' }}>
            What I Know
          </span>
          <h2 className="font-extrabold leading-tight mb-3" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: c.text }}>
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: c.muted }}>
            A blend of technical depth and creative breadth — built through real projects and hands-on experience.
          </p>
        </div>

        {/* Radar chart + top skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 p-8 rounded-2xl border items-center" style={{ background: c.surface, borderColor: c.border }}>
          <RadarChart />
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg" style={{ color: c.text }}>Skill Overview</h3>
            <p className="text-sm leading-relaxed" style={{ color: c.muted }}>
              A radar view of my core competency areas — hover each axis to see the exact proficiency level.
              Built through real projects, not just tutorials.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { label: 'Projects Built', value: '5+', color: '#FFB800' },
                { label: 'Designs Created', value: '100+', color: '#FF4D00' },
                { label: 'Videos Edited', value: '50+', color: '#10b981' },
                { label: 'Avg CGPA', value: '9.32', color: '#f59e0b' },
              ].map(stat => (
                <div key={stat.label} className="p-3 rounded-xl border" style={{ background: isDark ? '#111111' : '#f5f5f3', borderColor: c.border }}>
                  <div className="text-xl font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: c.muted }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => {
            const isActive = cat === activeTab;
            const color = cat === ALL ? '#FFB800' : categoryColors[cat];
            return (
              <button key={cat} onClick={() => setActiveTab(cat)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border"
                style={{
                  background: isActive ? `${color}18` : 'transparent',
                  borderColor: isActive ? color : c.border,
                  color: isActive ? color : c.muted,
                }}>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill bars */}
        <div className="skills-bars grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => {
            const color = categoryColors[skill.category];
            return (
              <div key={skill.name} className="skill-item group p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: c.surface, borderColor: c.border }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${color}55`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; }}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-sm font-semibold" style={{ color: c.text }}>{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color }}>{skill.level}%</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium hidden group-hover:inline-block transition-all"
                      style={{ color, background: `${color}15` }}>
                      {skill.category}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: c.barBg }}>
                  <div className="skill-bar-fill" data-level={skill.level} data-delay={i * 0.05}
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
