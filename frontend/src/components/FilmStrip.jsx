import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

// Only real creative works Pranav has mentioned
const frames = [
  { label: 'EXALT Fest Poster', type: 'Design · 1st Place', emoji: '🥇', color: '#f59e0b', year: '2024', desc: 'Won 1st at APSIT annual tech fest' },
  { label: 'Project Presentation', type: 'Design · 2nd Place', emoji: '🥈', color: '#94a3b8', year: '2024', desc: 'EXALT, APSIT' },
  { label: 'DevOps Club Posters', type: 'Design', emoji: '🎨', color: '#8b5cf6', year: '2025', desc: '100+ designs for the club' },
  { label: 'Club Event Banners', type: 'Design', emoji: '✏️', color: '#06b6d4', year: '2025', desc: 'Social media & event collaterals' },
  { label: 'Drama Performance', type: 'Performing Arts · 1st Place', emoji: '🎭', color: '#8b5cf6', year: '2024', desc: 'Ojus Fest, APSIT S.E.' },
  { label: 'AI for Bharat', type: 'Hackathon · Finalist', emoji: '🤖', color: '#06b6d4', year: '2025', desc: 'Powered by AWS' },
  { label: 'ContentGenei', type: 'Hackathon Project', emoji: '⚡', color: '#10b981', year: '2025', desc: 'AI content platform' },
  { label: 'Video Editing', type: 'Cinematography', emoji: '🎞️', color: '#ef4444', year: '2024', desc: '50+ videos edited' },
  { label: 'Photography', type: 'Creative', emoji: '📸', color: '#f59e0b', year: '2024', desc: 'Inspired by Aai' },
];

export default function FilmStrip() {
  const stripRef = useRef(null);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const c = {
    bg: isDark ? '#0a0a0f' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#111111',
    muted: isDark ? '#94a3b8' : '#555555',
    filmBg: '#111118',
    hole: isDark ? '#0a0a0f' : '#222230',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current.scrollWidth - stripRef.current.offsetWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth * 1.1}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.fromTo('.filmstrip-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.filmstrip-header', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const holes = Array.from({ length: 18 });

  return (
    <section id="creative" ref={sectionRef} style={{ background: c.bg, position: 'relative', zIndex: 1 }}>
      <div className="filmstrip-header text-center pt-24 pb-10 px-6">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
          style={{ color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)' }}>
          Creative Works
        </span>
        <h2 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: c.text }}>
          Beyond <span className="gradient-text">Code</span>
        </h2>
        <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: c.muted }}>
          Designs, performances, hackathons, and creativity — scroll to pan through the reel.
        </p>
        <p className="mt-2 text-xs animate-bounce" style={{ color: c.muted }}>↓ Scroll to pan</p>
      </div>

      {/* Film strip viewport */}
      <div ref={stripRef} className="overflow-hidden relative" style={{ height: '360px' }}>
        <div ref={trackRef} className="flex items-center h-full" style={{ width: 'max-content', paddingLeft: '6vw', paddingRight: '6vw' }}>

          <div className="relative flex flex-col" style={{ background: c.filmBg, borderRadius: '6px', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}>

            {/* Top sprocket holes */}
            <div className="flex items-center gap-4 px-5 py-2.5">
              {holes.map((_, i) => (
                <div key={i} className="w-5 h-3.5 rounded flex-shrink-0" style={{ background: c.hole }} />
              ))}
            </div>

            {/* Frames */}
            <div className="flex gap-2 px-5">
              {frames.map((frame, i) => (
                <div key={i} className="flex-shrink-0 relative group"
                  style={{ width: '190px', height: '230px' }}>
                  {/* Frame border lines (film gate) */}
                  <div className="absolute inset-0" style={{ border: '2px solid rgba(255,255,255,0.07)', borderRadius: '2px' }} />

                  {/* Frame content */}
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 transition-all duration-400 group-hover:scale-[1.03]"
                    style={{ background: `linear-gradient(145deg, ${frame.color}20, ${frame.color}06, transparent)` }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ background: `${frame.color}18`, border: `1px solid ${frame.color}35` }}>
                      {frame.emoji}
                    </div>
                    <div className="text-center px-3">
                      <p className="text-white text-xs font-bold leading-snug">{frame.label}</p>
                      <p className="text-[10px] mt-1 font-semibold" style={{ color: frame.color }}>{frame.type}</p>
                      <p className="text-[10px] mt-0.5 opacity-50 text-white">{frame.desc}</p>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold"
                      style={{ background: `${frame.color}22`, color: frame.color, border: `1px solid ${frame.color}40` }}>
                      {frame.year}
                    </span>
                  </div>

                  {/* Frame number (film aesthetic) */}
                  <div className="absolute bottom-1.5 right-2 text-[9px] font-mono opacity-30 text-white select-none">
                    {String(i + 1).padStart(2, '0')}A
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom sprocket holes */}
            <div className="flex items-center gap-4 px-5 py-2.5">
              {holes.map((_, i) => (
                <div key={i} className="w-5 h-3.5 rounded flex-shrink-0" style={{ background: c.hole }} />
              ))}
            </div>
          </div>
        </div>

        {/* Edge vignettes */}
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none z-10"
          style={{ background: `linear-gradient(to right, ${c.bg}, transparent)` }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none z-10"
          style={{ background: `linear-gradient(to left, ${c.bg}, transparent)` }} />
      </div>

      <div className="pb-24" />
    </section>
  );
}
