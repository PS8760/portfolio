import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

// Creative works — design, photography, cinematography highlights
const frames = [
  { label: 'DevOps Club Poster', type: 'Design', emoji: '🎨', color: '#8b5cf6', year: '2025' },
  { label: 'Event Banner', type: 'Design', emoji: '✏️', color: '#06b6d4', year: '2025' },
  { label: 'Social Media Creative', type: 'Design', emoji: '📱', color: '#10b981', year: '2024' },
  { label: 'EXALT Fest Poster', type: 'Design', emoji: '🏆', color: '#f59e0b', year: '2024' },
  { label: 'Cinematic Reel', type: 'Cinematography', emoji: '🎬', color: '#ef4444', year: '2024' },
  { label: 'Street Photography', type: 'Photography', emoji: '📸', color: '#8b5cf6', year: '2024' },
  { label: 'Event Coverage', type: 'Photography', emoji: '🎭', color: '#06b6d4', year: '2024' },
  { label: 'Short Film Edit', type: 'Cinematography', emoji: '🎞️', color: '#f59e0b', year: '2023' },
  { label: 'Club Branding', type: 'Design', emoji: '🖌️', color: '#10b981', year: '2025' },
  { label: 'Motion Graphics', type: 'Cinematography', emoji: '⚡', color: '#ef4444', year: '2025' },
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
    film: isDark ? '#1a1a2e' : '#1a1a2e',
    hole: isDark ? '#0a0a0f' : '#f0f0f0',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven horizontal pan
      const totalWidth = trackRef.current.scrollWidth - stripRef.current.offsetWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth * 1.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Header fade in
      gsap.fromTo('.filmstrip-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.filmstrip-header', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const holes = Array.from({ length: 20 });

  return (
    <section id="creative" ref={sectionRef} style={{ background: c.bg }}>
      <div className="filmstrip-header text-center pt-24 pb-10 px-6">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
          style={{ color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)' }}>
          Creative Works
        </span>
        <h2 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: c.text }}>
          Beyond <span className="gradient-text">Code</span>
        </h2>
        <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: c.muted }}>
          100+ designs, cinematic reels, and photography — scroll to explore the creative side.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-xs animate-bounce" style={{ color: c.muted }}>
          <span>↓ Scroll to pan</span>
        </div>
      </div>

      {/* Film strip wrapper */}
      <div ref={stripRef} className="overflow-hidden relative" style={{ height: '340px' }}>
        {/* Film strip track */}
        <div ref={trackRef} className="flex items-center h-full" style={{ width: 'max-content', paddingLeft: '5vw', paddingRight: '5vw' }}>

          {/* Film strip container */}
          <div className="relative flex flex-col" style={{ background: c.film, borderRadius: '4px', padding: '0', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

            {/* Top sprocket holes */}
            <div className="flex items-center gap-3 px-4 py-2">
              {holes.map((_, i) => (
                <div key={i} className="w-5 h-4 rounded-sm flex-shrink-0"
                  style={{ background: c.hole, opacity: 0.7 }} />
              ))}
            </div>

            {/* Frames row */}
            <div className="flex gap-3 px-4">
              {frames.map((frame, i) => (
                <div key={i} className="flex-shrink-0 relative group cursor-default"
                  style={{ width: '200px', height: '220px' }}>
                  {/* Frame border */}
                  <div className="absolute inset-0 rounded-sm"
                    style={{ border: '3px solid rgba(255,255,255,0.08)' }} />

                  {/* Frame content */}
                  <div className="w-full h-full rounded-sm flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg, ${frame.color}22, ${frame.color}08)` }}>
                    <span className="text-5xl">{frame.emoji}</span>
                    <div className="text-center px-3">
                      <p className="text-white text-xs font-bold leading-tight">{frame.label}</p>
                      <p className="text-xs mt-1 font-medium" style={{ color: frame.color }}>{frame.type}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{ background: `${frame.color}25`, color: frame.color, border: `1px solid ${frame.color}40` }}>
                      {frame.year}
                    </span>
                  </div>

                  {/* Frame number */}
                  <div className="absolute bottom-1 right-2 text-[9px] font-mono opacity-40 text-white">
                    {String(i + 1).padStart(2, '0')}A
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom sprocket holes */}
            <div className="flex items-center gap-3 px-4 py-2">
              {holes.map((_, i) => (
                <div key={i} className="w-5 h-4 rounded-sm flex-shrink-0"
                  style={{ background: c.hole, opacity: 0.7 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Left/right fade vignette */}
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
          style={{ background: `linear-gradient(to right, ${c.bg}, transparent)` }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
          style={{ background: `linear-gradient(to left, ${c.bg}, transparent)` }} />
      </div>

      <div className="pb-24" />
    </section>
  );
}
