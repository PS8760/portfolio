import { useState, useRef, useEffect } from 'react';
import { Type, Check, ChevronDown } from 'lucide-react';
import { useFont } from '../context/FontContext';
import { useTheme } from '../context/ThemeContext';

export default function FontPicker() {
  const { fontId, setFontId, activeFont, fontOptions } = useFont();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isDark = theme === 'dark';

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const surface = isDark ? '#13131f' : '#ffffff';
  const border = isDark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.3)';
  const textMain = isDark ? '#f1f5f9' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const hoverBg = isDark ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.06)';

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change font"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer"
        style={{
          borderColor: open ? '#8b5cf6' : 'rgba(139,92,246,0.3)',
          color: open ? '#8b5cf6' : textMuted,
          background: open ? 'rgba(139,92,246,0.1)' : 'transparent',
        }}
      >
        <Type size={14} />
        <span className="hidden sm:inline">{activeFont.label}</span>
        <ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-56 rounded-2xl border shadow-2xl z-50 overflow-hidden"
          style={{ background: surface, borderColor: border }}
        >
          <div className="px-3 pt-3 pb-1">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: textMuted }}>
              Choose Font
            </p>
          </div>
          {fontOptions.map((font) => {
            const isActive = font.id === fontId;
            return (
              <button
                key={font.id}
                onClick={() => { setFontId(font.id); setOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-150 cursor-pointer"
                style={{
                  background: isActive ? 'rgba(139,92,246,0.1)' : 'transparent',
                  borderLeft: isActive ? '2px solid #8b5cf6' : '2px solid transparent',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = hoverBg; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <div>
                  <p
                    className="text-sm font-semibold leading-tight"
                    style={{ fontFamily: font.body, color: isActive ? '#8b5cf6' : textMain }}
                  >
                    {font.label}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ fontFamily: font.heading, color: textMuted }}
                  >
                    {font.sub}
                  </p>
                </div>
                <span
                  className="text-lg font-bold flex-shrink-0"
                  style={{ fontFamily: font.heading, color: isActive ? '#8b5cf6' : textMuted }}
                >
                  Ag
                </span>
                {isActive && <Check size={14} className="text-violet-400 flex-shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
