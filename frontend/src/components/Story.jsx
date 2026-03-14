import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    emoji: '🏫',
    year: 'School',
    title: 'Where It All Began',
    color: '#8b5cf6',
    text: `From my school days, I was either a top scorer or an average one — it varied. After 10th grade, with an SSC score of 84%, I chose Science. Due to some misguidance, I went with PCMB (Pure Science). It was only in 12th grade that I discovered bifocal subjects like Computer Science, IT, and Electronics — and that's when my interest in technology truly sparked.`,
  },
  {
    emoji: '📸',
    year: 'Always',
    title: 'Creativity Runs in the Family',
    color: '#06b6d4',
    text: `Photography and cinematography were never something I consciously chose — they were already in me, thanks to my Aai (Mom). She was always clicking pictures and recording videos, and that love for capturing moments quietly passed on to me. It became a natural extension of who I am.`,
  },
  {
    emoji: '🎓',
    year: '2023–Now',
    title: 'Engineering & Beyond',
    color: '#10b981',
    text: `After 12th, based on my CET score, I got into A. P. Shah Institute of Technology to pursue my Bachelor's degree in Information Technology. That's where everything came together — code, creativity, and curiosity. My journey is still in progress, and every new technology or skill I come across only deepens my drive to explore further.`,
  },
];

export default function Story() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const c = {
    bg: isDark ? '#0f0f1a' : '#f5f5f3',
    surface: isDark ? '#13131f' : '#ffffff',
    border: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(0,0,0,0.1)',
    text: isDark ? '#f1f5f9' : '#111111',
    muted: isDark ? '#94a3b8' : '#555555',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-chapter', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: '.story-chapters', start: 'top 80%' },
      });
      gsap.fromTo('.story-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.story-header', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="genesis" ref={sectionRef} className="py-24 section-alt" style={{ background: c.bg }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="story-header text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
            style={{ color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)' }}>
            My Story
          </span>
          <h2 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: c.text }}>
            How I Got <span className="gradient-text">Here</span>
          </h2>
          <p className="mt-4 text-sm max-w-xl mx-auto leading-relaxed" style={{ color: c.muted }}>
            Every developer has an origin story. Here's mine.
          </p>
        </div>

        {/* Timeline */}
        <div className="story-chapters relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: `linear-gradient(to bottom, #8b5cf6, #06b6d4, transparent)` }} />

          <div className="flex flex-col gap-8">
            {chapters.map((ch, i) => (
              <div key={i} className="story-chapter relative flex gap-6 sm:gap-10 items-start">
                {/* Circle node */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${ch.color}33, ${ch.color}11)`, border: `2px solid ${ch.color}55`, boxShadow: `0 0 16px ${ch.color}33` }}>
                  {ch.emoji}
                </div>

                {/* Card */}
                <div className="flex-1 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                  style={{ background: c.surface, borderColor: c.border }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ch.color}55`; e.currentTarget.style.boxShadow = `0 12px 32px ${ch.color}18`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="font-bold text-base" style={{ color: c.text }}>{ch.title}</h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: `${ch.color}18`, color: ch.color, border: `1px solid ${ch.color}35` }}>
                      {ch.year}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: c.muted }}>{ch.text}</p>
                </div>
              </div>
            ))}

            {/* Closing note */}
            <div className="story-chapter relative flex gap-6 sm:gap-10 items-start">
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{ background: 'rgba(139,92,246,0.12)', border: '2px dashed rgba(139,92,246,0.4)' }}>
                🚀
              </div>
              <div className="flex-1 p-5 rounded-2xl border"
                style={{ background: 'rgba(139,92,246,0.06)', borderColor: 'rgba(139,92,246,0.25)' }}>
                <p className="text-sm font-semibold" style={{ color: '#a78bfa' }}>
                  The story continues — one commit at a time.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
