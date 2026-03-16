import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const radarSkills = [
  { label: 'Frontend', value: 88, color: '#8b5cf6' },
  { label: 'Backend', value: 80, color: '#06b6d4' },
  { label: 'Database', value: 74, color: '#10b981' },
  { label: 'Tools', value: 82, color: '#f59e0b' },
  { label: 'Deployment', value: 72, color: '#f97316' },
  { label: 'Creative', value: 90, color: '#ef4444' },
];

function polarToCartesian(cx, cy, r, angleIndex, total) {
  const angle = (Math.PI * 2 * angleIndex) / total - Math.PI / 2;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function buildPolygon(cx, cy, maxR, values, total) {
  return values
    .map((v, i) => {
      const r = (v / 100) * maxR;
      const pt = polarToCartesian(cx, cy, r, i, total);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');
}

export default function RadarChart() {
  const ref = useRef(null);
  const polygonRef = useRef(null);
  const dotsRef = useRef([]);
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cx = 200, cy = 200, maxR = 140;
  const total = radarSkills.length;
  const levels = [0.25, 0.5, 0.75, 1];

  const fullPolygon = buildPolygon(cx, cy, maxR, radarSkills.map(s => s.value), total);
  const zeroPolygon = buildPolygon(cx, cy, maxR, radarSkills.map(() => 0), total);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 75%',
        onEnter: () => {
          setAnimated(true);
          // Animate polygon points from center outward
          if (polygonRef.current) {
            gsap.fromTo(polygonRef.current,
              { attr: { points: zeroPolygon } },
              { attr: { points: fullPolygon }, duration: 1.6, ease: 'power3.out' }
            );
          }
          // Animate dots
          dotsRef.current.forEach((dot, i) => {
            if (!dot) return;
            const skill = radarSkills[i];
            const pt = polarToCartesian(cx, cy, (skill.value / 100) * maxR, i, total);
            gsap.fromTo(dot,
              { attr: { cx: cx, cy: cy, r: 0 } },
              { attr: { cx: pt.x, cy: pt.y, r: 5 }, duration: 1.6, ease: 'power3.out', delay: i * 0.08 }
            );
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const c = {
    text: isDark ? '#f1f5f9' : '#111111',
    muted: isDark ? '#94a3b8' : '#555555',
    grid: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    surface: isDark ? '#13131f' : '#ffffff',
    border: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(0,0,0,0.1)',
  };

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width="400" height="400" viewBox="0 0 400 400" className="w-full max-w-sm">
        {/* Grid rings */}
        {levels.map((lvl, li) => {
          const pts = radarSkills.map((_, i) => {
            const pt = polarToCartesian(cx, cy, maxR * lvl, i, total);
            return `${pt.x},${pt.y}`;
          }).join(' ');
          return (
            <polygon key={li} points={pts} fill="none"
              stroke={c.grid} strokeWidth="1" />
          );
        })}

        {/* Axis lines */}
        {radarSkills.map((_, i) => {
          const pt = polarToCartesian(cx, cy, maxR, i, total);
          return (
            <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y}
              stroke={c.grid} strokeWidth="1" />
          );
        })}

        {/* Filled polygon */}
        <polygon
          ref={polygonRef}
          points={animated ? fullPolygon : zeroPolygon}
          fill="rgba(139,92,246,0.15)"
          stroke="#8b5cf6"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {radarSkills.map((skill, i) => {
          const pt = polarToCartesian(cx, cy, (skill.value / 100) * maxR, i, total);
          return (
            <circle
              key={i}
              ref={el => dotsRef.current[i] = el}
              cx={animated ? pt.x : cx}
              cy={animated ? pt.y : cy}
              r={hovered === i ? 8 : 5}
              fill={skill.color}
              stroke={isDark ? '#0a0a0f' : '#ffffff'}
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ filter: hovered === i ? `drop-shadow(0 0 8px ${skill.color})` : 'none' }}
            />
          );
        })}

        {/* Labels */}
        {radarSkills.map((skill, i) => {
          const pt = polarToCartesian(cx, cy, maxR + 28, i, total);
          const isHovered = hovered === i;
          return (
            <g key={i}>
              <text
                x={pt.x} y={pt.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={isHovered ? '13' : '11'}
                fontWeight="700"
                fontFamily="Space Grotesk, sans-serif"
                fill={isHovered ? skill.color : c.muted}
                className="transition-all duration-200 cursor-pointer select-none"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {skill.label}
              </text>
              {isHovered && (
                <text
                  x={pt.x} y={pt.y + 14}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="10" fontWeight="600"
                  fontFamily="Space Grotesk, sans-serif"
                  fill={skill.color}
                >
                  {skill.value}%
                </text>
              )}
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="3" fill="#8b5cf6" opacity="0.5" />
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {radarSkills.map((s, i) => (
          <div key={i}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200"
            style={{
              background: hovered === i ? `${s.color}20` : 'transparent',
              border: `1px solid ${hovered === i ? s.color : c.border}`,
              color: hovered === i ? s.color : c.muted,
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            {s.label} · {s.value}%
          </div>
        ))}
      </div>
    </div>
  );
}
