import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const items = [
  { emoji: '🥇', title: '1st Place — Poster Competition', sub: 'EXALT, APSIT · 2024', desc: 'Designed and won first prize at the annual technical fest.', color: '#f59e0b', size: 'tall' },
  { emoji: '🎭', title: '1st Place — Drama', sub: 'Ojus Fest, APSIT · 2024', desc: 'Performed and won the drama competition in S.E.', color: '#FFB800', size: 'normal' },
  { emoji: '✏️', title: '100+ Designs', sub: 'DevOps Club · 2025', desc: 'Posters, banners, and social media creatives as Design Coordinator.', color: '#FF4D00', size: 'wide' },
  { emoji: '🥈', title: '2nd Place — Project Presentation', sub: 'EXALT, APSIT · 2024', desc: 'Secured second prize in the project presentation event.', color: '#94a3b8', size: 'normal' },
  { emoji: '🤖', title: 'AI for Bharat — Finalist', sub: 'Powered by AWS · 2025', desc: 'Final prototype phase of the national hackathon.', color: '#10b981', size: 'normal' },
  { emoji: '🎞️', title: '50+ Videos Edited', sub: 'Cinematography · 2024', desc: 'Edited reels, short films, and event recaps.', color: '#ef4444', size: 'normal' },
  { emoji: '📸', title: 'Photography', sub: 'Creative · Ongoing', desc: 'Capturing moments — a passion inherited from Aai.', color: '#f59e0b', size: 'wide' },
  { emoji: '⚡', title: 'Multiple Hackathons', sub: 'Various · 2023–25', desc: 'Led teams, built fast, learned faster.', color: '#FFB800', size: 'normal' },
];

function BentoCard({ item, i }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add('cw-in'), i * 80);
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [i]);

  return (
    <div ref={ref} className={`cw-card cw-${item.size}`} style={{ '--c': item.color }}>
      <div className="cw-card-bg" />
      <span className="cw-emoji">{item.emoji}</span>
      <div className="cw-body">
        <p className="cw-sub">{item.sub}</p>
        <h3 className="cw-title">{item.title}</h3>
        <p className="cw-desc">{item.desc}</p>
      </div>
    </div>
  );
}

export default function CreativeWall() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bg = isDark ? '#0a0a0a' : '#f5f5f3';
  const cardBg = isDark ? '#141414' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const text = isDark ? '#f1f5f9' : '#111111';
  const muted = isDark ? '#94a3b8' : '#666666';

  return (
    <section id="creative" style={{ background: bg, padding: '96px 0' }}>
      <style>{`
        .cw-card {
          position: relative;
          border-radius: 18px;
          padding: 24px;
          border: 1px solid ${border};
          background: ${cardBg};
          overflow: hidden;
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cw-card.cw-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .cw-card:hover {
          border-color: var(--c);
          box-shadow: 0 6px 36px color-mix(in srgb, var(--c) 18%, transparent);
          transform: translateY(-3px) scale(1);
        }
        .cw-card-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 10% 90%, color-mix(in srgb, var(--c) 12%, transparent), transparent 65%);
          pointer-events: none;
          z-index: 0;
        }
        .cw-emoji {
          font-size: 2rem;
          position: relative;
          z-index: 1;
          line-height: 1;
        }
        .cw-body { position: relative; z-index: 1; }
        .cw-sub {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--c);
          margin: 0 0 5px;
        }
        .cw-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: ${text};
          margin: 0 0 6px;
          line-height: 1.3;
        }
        .cw-desc {
          font-size: 0.78rem;
          color: ${muted};
          margin: 0;
          line-height: 1.55;
        }

        /* Bento grid */
        .cw-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (min-width: 768px) {
          .cw-grid { grid-template-columns: repeat(4, 1fr); }
          .cw-wide { grid-column: span 2; }
          .cw-tall { grid-row: span 2; }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '52px', padding: '0 24px' }}>
        <span style={{
          display: 'inline-block', fontSize: '0.68rem', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '5px 14px', borderRadius: '999px',
          color: '#FFB800', background: 'rgba(255,184,0,0.1)',
          border: '1px solid rgba(255,184,0,0.3)', marginBottom: '14px',
        }}>
          Creative Works
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800,
          color: text, margin: '0 0 10px', lineHeight: 1.15,
        }}>
          Beyond <span className="gradient-text">Code</span>
        </h2>
        <p style={{ fontSize: '0.88rem', color: muted, maxWidth: '400px', margin: '0 auto' }}>
          Designs, performances, hackathons — the creative side that lives outside the terminal.
        </p>
      </div>

      <div className="cw-grid">
        {items.map((item, i) => (
          <BentoCard key={i} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
