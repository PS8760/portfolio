import { useTheme } from '../context/ThemeContext';

const frames = [
  { emoji: '🥇', label: 'EXALT Poster', sub: '1st Place · 2024', color: '#f59e0b' },
  { emoji: '🎭', label: 'Drama Performance', sub: '1st Place · 2024', color: '#FFB800' },
  { emoji: '✏️', label: 'DevOps Club Designs', sub: '100+ Creatives · 2025', color: '#FF4D00' },
  { emoji: '🥈', label: 'Project Presentation', sub: '2nd Place · 2024', color: '#94a3b8' },
  { emoji: '🤖', label: 'AI for Bharat', sub: 'Finalist · 2025', color: '#10b981' },
  { emoji: '🎞️', label: 'Video Editing', sub: '50+ Videos · 2024', color: '#ef4444' },
  { emoji: '📸', label: 'Photography', sub: 'Creative · Ongoing', color: '#f59e0b' },
  { emoji: '⚡', label: 'Hackathons', sub: 'Multiple · 2023–25', color: '#FFB800' },
];

const doubled = [...frames, ...frames];

export default function FilmStrip() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="creative" style={{
      background: isDark ? '#0a0a0a' : '#f5f5f3',
      padding: '96px 0',
    }}>
      <style>{`
        @keyframes filmroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .fs-track {
          display: flex;
          width: max-content;
          animation: filmroll 30s linear infinite;
          will-change: transform;
        }
        .fs-track:hover { animation-play-state: paused; }
        .fs-frame {
          flex-shrink: 0;
          width: 176px;
          height: 218px;
          margin: 0 3px;
          border-radius: 3px;
          border: 1.5px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          transition: border-color 0.2s, transform 0.2s;
          cursor: default;
        }
        .fs-frame:hover {
          border-color: var(--fc);
          transform: scaleY(1.03);
          z-index: 2;
        }
        .fs-num {
          position: absolute;
          bottom: 7px; right: 9px;
          font-size: 9px;
          font-family: monospace;
          color: rgba(255,255,255,0.18);
          user-select: none;
        }
        .fs-holes {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 7px 12px;
          width: max-content;
        }
        .fs-hole {
          width: 17px;
          height: 11px;
          border-radius: 3px;
          flex-shrink: 0;
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
        }}>Creative Works</span>
        <h2 style={{
          fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15,
          color: isDark ? '#f1f5f9' : '#111111', margin: '0 0 10px',
        }}>
          Beyond <span className="gradient-text">Code</span>
        </h2>
        <p style={{ fontSize: '0.88rem', color: isDark ? '#94a3b8' : '#666', maxWidth: '400px', margin: '0 auto' }}>
          Designs, performances, hackathons — the creative side that lives outside the terminal.
        </p>
      </div>

      {/* Reel wrapper — overflow hidden only on x */}
      <div style={{ overflowX: 'hidden', background: '#111118', boxShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>

        {/* Top sprocket holes */}
        <div style={{ overflowX: 'hidden' }}>
          <div className="fs-holes">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="fs-hole" style={{ background: isDark ? '#0a0a0a' : '#1a1a2e' }} />
            ))}
          </div>
        </div>

        {/* Frames */}
        <div style={{ padding: '6px 0' }}>
          <div className="fs-track">
            {doubled.map((f, i) => (
              <div
                key={i}
                className="fs-frame"
                style={{
                  '--fc': f.color,
                  background: `linear-gradient(155deg, ${f.color}18 0%, #0d0d18 55%)`,
                }}
              >
                <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{f.emoji}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f1f5f9', textAlign: 'center', padding: '0 10px', lineHeight: 1.3 }}>
                  {f.label}
                </span>
                <span style={{ fontSize: '0.64rem', fontWeight: 600, color: f.color, letterSpacing: '0.04em', textAlign: 'center' }}>
                  {f.sub}
                </span>
                <span className="fs-num">{String((i % frames.length) + 1).padStart(2, '0')}A</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom sprocket holes */}
        <div style={{ overflowX: 'hidden' }}>
          <div className="fs-holes">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="fs-hole" style={{ background: isDark ? '#0a0a0a' : '#1a1a2e' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Side fades */}
      <div style={{ position: 'relative', height: 0 }}>
        <div style={{ position: 'absolute', top: '-250px', left: 0, width: '80px', height: '250px', background: `linear-gradient(to right, ${isDark ? '#0a0a0a' : '#f5f5f3'}, transparent)`, pointerEvents: 'none', zIndex: 3 }} />
        <div style={{ position: 'absolute', top: '-250px', right: 0, width: '80px', height: '250px', background: `linear-gradient(to left, ${isDark ? '#0a0a0a' : '#f5f5f3'}, transparent)`, pointerEvents: 'none', zIndex: 3 }} />
      </div>
    </section>
  );
}
