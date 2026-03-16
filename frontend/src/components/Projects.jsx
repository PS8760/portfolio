import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Star, ArrowUpRight, Clock } from 'lucide-react';
import { projects } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, c }) {
  const [hovered, setHovered] = useState(false);
  const isFeatured = project.featured === true;
  const isComingSoon = project.comingSoon === true && !project.github && !project.live;

  return (
    <div
      className={`project-card flex flex-col gap-4 rounded-2xl border transition-all duration-300 overflow-hidden ${isFeatured ? 'lg:col-span-2' : ''}`}
      style={{
        background: c.surface,
        borderColor: hovered ? `${project.color}55` : c.border,
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 20px 50px ${project.color}18` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient banner */}
      <div className="relative overflow-hidden" style={{
        height: isFeatured ? '160px' : '130px',
        background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-extrabold opacity-10 select-none" style={{ color: project.color, fontSize: isFeatured ? '7rem' : '5rem' }}>
            {project.title.charAt(0)}
          </div>
        </div>
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20" style={{ background: project.color }} />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-10" style={{ background: project.color }} />

        {/* Left badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {isFeatured && (
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}>
              <Star size={10} fill="currentColor" /> Featured
            </span>
          )}
          {isComingSoon && (
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,184,0,0.2)', color: '#FFD166', border: '1px solid rgba(255,184,0,0.4)' }}>
              <Clock size={10} /> Coming Soon
            </span>
          )}
        </div>

        {/* Right badges */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {project.live && !project.liveWorking && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', backdropFilter: 'blur(8px)' }}>
              Live ↗ (down)
            </span>
          )}
          {project.live && project.liveWorking && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
              style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', backdropFilter: 'blur(8px)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live
            </span>
          )}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.4)', color: '#ffffff', backdropFilter: 'blur(8px)' }}>
            {project.tags[0]}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-lg" style={{ color: c.text }}>{project.title}</h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: c.muted }}>{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{ color: project.color, background: `${project.color}12`, borderColor: `${project.color}28` }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: c.divider }}>
          <div className="flex gap-4">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-yellow-400"
                style={{ color: c.muted, textDecoration: 'none' }}>
                <Github size={15} /> Code
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: c.muted, opacity: 0.35 }}>
                <Github size={15} /> Coming Soon
              </span>
            )}
            {project.live ? (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-yellow-400"
                style={{ color: project.liveWorking ? '#10b981' : c.muted, textDecoration: 'none' }}>
                <ExternalLink size={15} /> {project.liveWorking ? 'Live' : 'Live (down)'}
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: c.muted, opacity: 0.35 }}>
                <ExternalLink size={15} /> {isComingSoon ? 'Coming Soon' : 'No Live'}
              </span>
            )}
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: hovered ? project.color : 'transparent', border: `1px solid ${hovered ? project.color : c.border}` }}>
            <ArrowUpRight size={14} style={{ color: hovered ? 'white' : c.muted }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const c = {
    bg: isDark ? '#0a0a0a' : '#ffffff',
    surface: isDark ? '#141414' : '#f5f5f3',
    border: isDark ? 'rgba(255,184,0,0.15)' : 'rgba(0,0,0,0.1)',
    text: isDark ? '#ffffff' : '#111111',
    muted: isDark ? '#94a3b8' : '#555555',
    divider: isDark ? 'rgba(255,184,0,0.1)' : 'rgba(0,0,0,0.08)',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-header', start: 'top 85%' },
      });
      gsap.fromTo('.project-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24" style={{ background: c.bg }}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="projects-header text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
            style={{ color: '#FFB800', background: 'rgba(255,184,0,0.1)', borderColor: 'rgba(255,184,0,0.3)' }}>
            My Work
          </span>
          <h2 className="font-extrabold leading-tight mb-3" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: c.text }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: c.muted }}>
            A selection of projects that showcase my technical skills and creative thinking.
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} c={c} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="https://github.com/PS8760" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,184,0,0.3)]"
            style={{ background: 'transparent', border: `1px solid ${c.border}`, color: c.muted, textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FFB800'; e.currentTarget.style.color = '#FFB800'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.muted; }}>
            <Github size={16} /> View All on GitHub
          </a>
        </div>

      </div>
    </section>
  );
}
