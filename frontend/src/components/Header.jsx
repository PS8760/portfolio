import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = ['Home', 'About', 'Genesis', 'Skills', 'Projects', 'Contact'];

export default function Header() {
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const sectionId = id.toLowerCase().replace(/\s+/g, '-');
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'py-3 bg-[#0a0a0f]/85 dark:bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-violet-500/15 shadow-lg'
          : 'py-5 bg-transparent'
      } ${theme !== 'dark' ? (scrolled ? '!bg-white/95 !border-black/8 shadow-sm' : '') : ''}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="font-heading-dynamic text-2xl font-extrabold tracking-wide text-slate-100 dark:text-slate-100 cursor-pointer"
          style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}
        >
          <span className="text-violet-500">&lt;</span>PG<span className="text-violet-500">/&gt;</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{ color: theme === 'dark' ? '#94a3b8' : '#475569' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#8b5cf6'; e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = theme === 'dark' ? '#94a3b8' : '#475569'; e.currentTarget.style.background = 'transparent'; }}
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 cursor-pointer"
            style={{
              borderColor: 'rgba(139,92,246,0.3)',
              color: theme === 'dark' ? '#94a3b8' : '#475569',
              background: 'transparent',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.color = '#8b5cf6'; e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'; e.currentTarget.style.color = theme === 'dark' ? '#94a3b8' : '#475569'; e.currentTarget.style.background = 'transparent'; }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-violet-500/30 cursor-pointer"
            style={{ color: theme === 'dark' ? '#f1f5f9' : '#0f172a', background: 'transparent' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-64 z-40 flex flex-col justify-center gap-2 px-8 border-l border-violet-500/20 transition-transform duration-400 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: theme === 'dark' ? '#0f0f1a' : '#f8fafc' }}
      >
        {navLinks.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="text-left px-5 py-3 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer"
            style={{ color: theme === 'dark' ? '#94a3b8' : '#475569' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#8b5cf6'; e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = theme === 'dark' ? '#94a3b8' : '#475569'; e.currentTarget.style.background = 'transparent'; }}
          >
            {link}
          </button>
        ))}
      </div>
    </header>
  );
}
