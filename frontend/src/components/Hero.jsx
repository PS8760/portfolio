import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Github, Instagram, Linkedin, Twitter, ArrowDown, Sparkles, Download } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import heroImg from '../images/Profile_Pic.jpeg';
import resumePDF from '../resume/Pranav-Ghodke-Resume.pdf';

const ROLES = ['Full-Stack Developer', 'Photographer', 'Cinematographer', 'Creative Technologist'];

export default function Hero() {
  const heroRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const imgRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Typewriter
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIndex];
    let timeout;
    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });
    tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo('.hero-name', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.2')
      .fromTo('.hero-role-line', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero-stat', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' }, '-=0.2')
      .fromTo(socialsRef.current.children, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
      .fromTo(imgRef.current, { opacity: 0, scale: 0.85, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=1.2');

    // Blob float
    gsap.to(blob1Ref.current, { x: 40, y: -30, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(blob2Ref.current, { x: -30, y: 20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.scroll-indicator', { y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    // Subtle float on image handled by CSS animation
  }, []);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 30;
      const y = (e.clientY / h - 0.5) * 20;
      gsap.to(blob1Ref.current, { x, y, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(blob2Ref.current, { x: -x * 0.6, y: -y * 0.6, duration: 2, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(imgRef.current, { x: x * 0.15, duration: 2, ease: 'power2.out', overwrite: 'auto' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const stats = [
    { value: '5+', label: 'Projects Built' },
    { value: '100+', label: 'Designs Created' },
    { value: '50+', label: 'Videos Edited' },
  ];

  const socials = [
    { icon: <Github size={18} />, href: personalInfo.github, label: 'GitHub' },
    { icon: <Instagram size={18} />, href: personalInfo.instagram, label: 'Instagram' },
    { icon: <Linkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: personalInfo.twitter, label: 'Twitter' },
  ];

  const c = {
    bg: isDark ? '#0a0a0f' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#111111',
    muted: isDark ? '#94a3b8' : '#555555',
    surface: isDark ? '#13131f' : '#f5f5f3',
    border: isDark ? 'rgba(139,92,246,0.18)' : 'rgba(0,0,0,0.1)',
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ background: c.bg }}>
      {/* Background blobs */}
      <div ref={blob1Ref} className="absolute top-[-120px] right-[-80px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)', filter: 'blur(90px)' }} />
      <div ref={blob2Ref} className="absolute bottom-[-80px] left-[-60px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.14), transparent 70%)', filter: 'blur(80px)' }} />
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

          {/* ── Left: text content ── */}
          <div className="flex-1 max-w-2xl lg:pt-4">

            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-7"
              style={{
                color: isDark ? '#a78bfa' : '#111111',
                background: isDark ? 'rgba(139,92,246,0.1)' : 'rgba(0,0,0,0.06)',
                border: `1px solid ${isDark ? 'rgba(139,92,246,0.3)' : 'rgba(0,0,0,0.15)'}`,
              }}>
              <span className="w-1.5 h-1.5 rounded-full glow-pulse" style={{ background: isDark ? '#34d399' : '#111111' }} />
              Available for opportunities
              <Sparkles size={11} />
            </div>

            {/* Name */}
            <h1 className="hero-name font-bold leading-[1.05] tracking-tight mb-4" style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', color: c.text }}>
              Hi, I'm{' '}
              <span className="gradient-text">{personalInfo.name.split(' ')[0]}</span>
              <br />
              <span style={{ color: c.text }}>{personalInfo.name.split(' ').slice(1).join(' ')}</span>
            </h1>

            {/* Typewriter role */}
            <div className="hero-role-line flex items-center gap-3 mb-5">
              <span className="text-xl font-semibold" style={{ color: isDark ? '#8b5cf6' : '#111111' }}>
                {displayed}
                <span className="typewriter-cursor" />
              </span>
            </div>

            {/* Subtitle */}
            <p ref={subtitleRef} className="text-base max-w-lg mb-10 leading-relaxed" style={{ color: c.muted }}>
              {personalInfo.tagline} Blending code with creativity — from full-stack apps to cinematic visuals.
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="shimmer-btn inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(139,92,246,0.45)]"
                style={{ border: 'none' }}
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500 hover:text-violet-400"
                style={{ background: 'transparent', border: `1px solid ${c.border}`, color: c.text }}
              >
                Get In Touch
              </button>
              <a
                href={resumePDF}
                download="Pranav-Ghodke-Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'transparent', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`, color: c.muted, textDecoration: 'none' }}
              >
                <Download size={15} /> Resume
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-12">
              {stats.map((s) => (
                <div key={s.label} className="hero-stat stat-card px-5 py-3 rounded-2xl border" style={{ background: c.surface, borderColor: c.border }}>
                  <div className="text-2xl font-extrabold gradient-text leading-none">{s.value}</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: c.muted }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div ref={socialsRef} className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:text-violet-400 hover:bg-violet-500/10"
                  style={{ borderColor: c.border, color: c.muted }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: profile image ── */}
          <div ref={imgRef} className="hero-img-float flex flex-shrink-0 items-start justify-center relative mt-2">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle at center, rgba(139,92,246,0.25) 0%, transparent 70%)', filter: 'blur(40px)', transform: 'scale(1.3)' }} />
            {/* Decorative border ring */}
            <div className="absolute -inset-1 rounded-3xl pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.5), rgba(6,182,212,0.3), rgba(139,92,246,0.1))', padding: '1px', borderRadius: '1.5rem' }}>
              <div className="w-full h-full rounded-3xl" style={{ background: c.bg }} />
            </div>
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden border-2"
              style={{
                width: 'clamp(220px, 28vw, 320px)',
                height: 'clamp(420px, 68vh, 620px)',
                borderColor: 'rgba(139,92,246,0.35)',
                boxShadow: '0 30px 80px rgba(139,92,246,0.2)',
              }}>
              <img
                src={heroImg}
                alt="Pranav Ghodke"
                className="w-full h-full object-cover"
                style={{ objectPosition: '65% 5%', transform: 'scale(2.1)', transformOrigin: '65% 12%', filter: 'contrast(1.08) saturate(1.1) brightness(1.02)' }}
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${c.bg}cc, transparent)` }} />
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -left-5 px-4 py-2.5 rounded-2xl border flex items-center gap-2 shadow-xl"
              style={{ background: c.surface, borderColor: 'rgba(139,92,246,0.3)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 glow-pulse" />
              <span className="text-xs font-bold" style={{ color: c.text }}>Open to Work</span>
            </div>
            {/* Top-right chip */}
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-lg"
              style={{ background: 'rgba(139,92,246,0.15)', borderColor: 'rgba(139,92,246,0.4)', color: '#a78bfa' }}>
              B.E. IT · APSIT
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs tracking-widest" style={{ color: c.muted }}>
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}
