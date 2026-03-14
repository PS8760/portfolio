import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.35 });
    };

    const onEnter = () => gsap.to(ring.current, { scale: 2, opacity: 0.5, duration: 0.3 });
    const onLeave = () => gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: '#8b5cf6', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9999, transform: 'translate(-50%, -50%)',
      }} />
      <div ref={ring} style={{
        position: 'fixed', top: 0, left: 0, width: 32, height: 32,
        border: '1.5px solid rgba(139,92,246,0.6)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%, -50%)',
      }} />
    </>
  );
}
