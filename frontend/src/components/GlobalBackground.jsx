import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Persistent animated background — subtle floating particles + slow gradient orbs
export default function GlobalBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;

    const PARTICLE_COUNT = 55;
    const particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function randomBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: randomBetween(0, W),
          y: randomBetween(0, H),
          r: randomBetween(1, 2.5),
          vx: randomBetween(-0.18, 0.18),
          vy: randomBetween(-0.22, 0.22),
          alpha: randomBetween(0.15, 0.55),
          // hue cycles slowly
          hue: randomBetween(25, 45),
          hueSpeed: randomBetween(-0.05, 0.05),
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.hue += p.hueSpeed;

        // Wrap around edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `hsla(${p.hue}, 70%, 70%, ${p.alpha})`
          : `hsla(${p.hue}, 60%, 40%, ${p.alpha * 0.5})`;
        ctx.fill();
      }

      // Draw faint connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const opacity = (1 - dist / 120) * (isDark ? 0.08 : 0.04);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(255,184,0,${opacity})`
              : `rgba(100,60,200,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    window.addEventListener('resize', () => { resize(); initParticles(); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: isDark ? 1 : 0.6,
      }}
    />
  );
}
