import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const calc = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };

    window.addEventListener('scroll', calc, { passive: true });
    // Recalculate when GSAP adds/removes pin spacers (changes scrollHeight)
    ScrollTrigger.addEventListener('refresh', calc);

    return () => {
      window.removeEventListener('scroll', calc);
      ScrollTrigger.removeEventListener('refresh', calc);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '3px', zIndex: 9997, pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: 'linear-gradient(90deg, #FFB800, #FF4D00)',
        transition: 'width 0.08s linear',
        boxShadow: '0 0 8px rgba(255,184,0,0.6)',
      }} />
    </div>
  );
}
