import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Code2, X, ChevronDown } from 'lucide-react';

const activities = [
  { icon: '⚡', text: 'Building ContentGenei', sub: 'AI for Bharat Hackathon', color: '#FF4D00' },
  { icon: '🧠', text: 'Learning Machine Learning', sub: 'Python · scikit-learn', color: '#FFB800' },
  { icon: '☁️', text: 'Exploring AWS', sub: 'Cloud Architecture', color: '#f59e0b' },
  { icon: '🎬', text: 'Editing a Reel', sub: 'CapCut · Cinematic', color: '#ef4444' },
  { icon: '🎨', text: 'Designing for DevOps Club', sub: 'Canva · Figma', color: '#10b981' },
];

export default function NowCoding() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [current, setCurrent] = useState(0);
  const [pulse, setPulse] = useState(true);

  // Rotate activity every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(false);
      setTimeout(() => {
        setCurrent(i => (i + 1) % activities.length);
        setPulse(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const activity = activities[current];

  const c = {
    bg: isDark ? 'rgba(13,13,25,0.92)' : 'rgba(255,255,255,0.95)',
    border: isDark ? 'rgba(255,184,0,0.3)' : 'rgba(0,0,0,0.12)',
    text: isDark ? '#ffffff' : '#111111',
    muted: isDark ? '#94a3b8' : '#666666',
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-40 transition-all duration-300"
      style={{ maxWidth: '260px' }}
    >
      <div
        className="rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          background: c.bg,
          borderColor: c.border,
          boxShadow: `0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px ${c.border}`,
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b"
          style={{ borderColor: c.border }}>
          <div className="flex items-center gap-2">
            <Code2 size={13} style={{ color: '#FFB800' }} />
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#FFB800' }}>
              Now Active
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMinimized(m => !m)}
              className="w-5 h-5 flex items-center justify-center rounded-md transition-colors hover:bg-white/10 cursor-pointer"
              style={{ color: c.muted, border: 'none', background: 'transparent' }}
            >
              <ChevronDown size={12} style={{ transform: minimized ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
            <button
              onClick={() => setVisible(false)}
              className="w-5 h-5 flex items-center justify-center rounded-md transition-colors hover:bg-white/10 cursor-pointer"
              style={{ color: c.muted, border: 'none', background: 'transparent' }}
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Content */}
        {!minimized && (
          <div className="px-3 py-3 transition-all duration-300"
            style={{ opacity: pulse ? 1 : 0, transform: pulse ? 'translateY(0)' : 'translateY(4px)' }}>
            <div className="flex items-center gap-3">
              {/* Animated icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${activity.color}18`, border: `1px solid ${activity.color}35` }}>
                {activity.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate" style={{ color: c.text }}>{activity.text}</p>
                <p className="text-[10px] mt-0.5 truncate" style={{ color: c.muted }}>{activity.sub}</p>
              </div>
            </div>

            {/* Progress bar — loops */}
            <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${activity.color}, ${activity.color}88)`,
                  animation: 'progress-loop 4s linear infinite',
                  width: '100%',
                  transformOrigin: 'left',
                }}
              />
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px]" style={{ color: c.muted }}>Pranav is online</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
