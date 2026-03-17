import { useState, useEffect } from 'react';
import { Github, Instagram, Linkedin, XTwitter, Heart, ArrowUp, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const c = {
    bg: isDark ? '#0a0a0a' : '#ffffff',
    surface: isDark ? '#141414' : '#f5f5f3',
    border: isDark ? 'rgba(255,184,0,0.1)' : 'rgba(0,0,0,0.08)',
    text: isDark ? '#ffffff' : '#111111',
    muted: isDark ? '#475569' : '#888888',
  };

  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socials = [
    { icon: <Github size={17} />, href: personalInfo.github, label: 'GitHub' },
    { icon: <Instagram size={17} />, href: personalInfo.instagram, label: 'Instagram' },
    { icon: <Linkedin size={17} />, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <XTwitter size={17} />, href: personalInfo.twitter, label: 'Twitter' },
  ];

  return (
    <>
      {/* CTA Strip */}
      <div className="py-16 relative overflow-hidden" style={{ background: isDark ? '#111111' : '#f5f5f3' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,184,0,0.12), transparent 70%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: c.text }}>
            Have a project in mind?
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: c.muted }}>
            I'm always open to discussing new opportunities, creative ideas, or just having a good conversation about tech and photography.
          </p>
          <button
            onClick={() => scrollTo('contact')}
            className="shimmer-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(255,184,0,0.45)]"
            style={{ border: 'none' }}>
            <Mail size={16} /> Let's Work Together
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap items-start justify-between gap-8">

          {/* Brand */}
          <div className="max-w-[240px]">
            <button onClick={scrollTop} className="font-extrabold text-2xl block mb-3 cursor-pointer" style={{ background: 'none', border: 'none', color: c.text }}>
              <span className="text-yellow-400">&lt;</span>PG<span className="text-yellow-400">/&gt;</span>
            </button>
            <p className="text-sm leading-relaxed mb-4" style={{ color: c.muted }}>
              IT Student & Creative Technologist building at the intersection of code and creativity.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200 hover:text-yellow-400 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:-translate-y-0.5"
                  style={{ borderColor: c.border, color: c.muted, textDecoration: 'none' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: c.muted }}>Navigation</p>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button key={link} onClick={() => scrollTo(link)}
                  className="text-left px-0 py-1.5 text-sm font-medium transition-colors cursor-pointer hover:text-yellow-400"
                  style={{ background: 'transparent', border: 'none', color: c.muted }}>
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: c.muted }}>Contact</p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: c.muted }}>
              <a href={`mailto:${personalInfo.email}`} className="hover:text-yellow-400 transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>
                {personalInfo.email}
              </a>
              <span>{personalInfo.location}</span>
              <a href={personalInfo.instagram} target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>
                @ghodke.1984
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-6 py-4 text-xs flex-wrap gap-2"
          style={{ borderTop: `1px solid ${c.border}`, color: c.muted }}>
          <span>© {new Date().getFullYear()} Pranav Umesh Ghodke. Made with <Heart size={10} className="inline text-red-400 mx-0.5" /> in India.</span>
          <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,184,0,0.08)', color: '#FFB800' }}>
            Built with React + GSAP + Tailwind
          </span>
        </div>
      </footer>

      {/* Back to top FAB */}
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,184,0,0.5)]"
        style={{
          background: 'linear-gradient(135deg,#FFB800,#FF4D00)',
          border: 'none',
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? 'auto' : 'none',
          transform: showTop ? 'translateY(0)' : 'translateY(16px)',
        }}>
        <ArrowUp size={18} color="white" />
      </button>
    </>
  );
}
