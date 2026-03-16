import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function LoadingScreen({ onDone }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 100);
    camera.position.z = 4.5;

    // ── Vortex particle spiral ──
    const COUNT = 2200;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const radii = new Float32Array(COUNT);
    const angles = new Float32Array(COUNT);
    const heights = new Float32Array(COUNT);

    const c1 = new THREE.Color('#FFB800');
    const c2 = new THREE.Color('#FF4D00');
    const c3 = new THREE.Color('#ffffff');

    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      radii[i] = 0.3 + Math.random() * 3.5;
      angles[i] = Math.random() * Math.PI * 2;
      heights[i] = (Math.random() - 0.5) * 6;
      speeds[i] = (0.3 + Math.random() * 0.7) * (Math.random() > 0.5 ? 1 : -1);

      pos[i * 3]     = radii[i] * Math.cos(angles[i]);
      pos[i * 3 + 1] = heights[i];
      pos[i * 3 + 2] = radii[i] * Math.sin(angles[i]);

      // Color gradient: violet → cyan → white based on radius
      const mix = t < 0.5 ? c1.clone().lerp(c2, t * 2) : c2.clone().lerp(c3, (t - 0.5) * 2);
      col[i * 3]     = mix.r;
      col[i * 3 + 1] = mix.g;
      col[i * 3 + 2] = mix.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const vortex = new THREE.Points(geo, mat);
    scene.add(vortex);

    // ── Glowing center orb ──
    const orbGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0xFFB800,
      transparent: true,
      opacity: 0.9,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    // Orb glow halo
    const haloGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xFFB800,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(haloGeo, haloMat));

    // ── Thin equatorial ring ──
    const ringGeo = new THREE.TorusGeometry(0.55, 0.008, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xFF4D00, transparent: true, opacity: 0.6 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(0.85, 0.005, 8, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xFFB800, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 5;
    scene.add(ring2);

    // ── Animate ──
    let frame;
    let elapsed = 0;
    const posArr = geo.attributes.position.array;

    function animate() {
      frame = requestAnimationFrame(animate);
      elapsed += 0.016;

      // Rotate vortex + spiral inward over time
      const progress = Math.min(elapsed / 2.2, 1); // 0→1 over 2.2s
      const spiralFactor = 1 - progress * 0.55; // particles drift inward

      for (let i = 0; i < COUNT; i++) {
        angles[i] += 0.008 * speeds[i];
        const r = radii[i] * spiralFactor;
        posArr[i * 3]     = r * Math.cos(angles[i]);
        posArr[i * 3 + 1] = heights[i] * (0.5 + spiralFactor * 0.5);
        posArr[i * 3 + 2] = r * Math.sin(angles[i]);
      }
      geo.attributes.position.needsUpdate = true;

      // Pulse orb
      const pulse = 1 + Math.sin(elapsed * 4) * 0.12;
      orb.scale.setScalar(pulse);
      orbMat.opacity = 0.7 + Math.sin(elapsed * 3) * 0.2;

      ring.rotation.z += 0.012;
      ring2.rotation.z -= 0.007;
      ring2.rotation.x += 0.003;

      // Slow camera drift
      camera.position.x = Math.sin(elapsed * 0.2) * 0.3;
      camera.position.y = Math.cos(elapsed * 0.15) * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    // ── GSAP timeline ──
    // Text entrance
    gsap.fromTo(textRef.current,
      { opacity: 0, scale: 0.75, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.8)', delay: 0.3 }
    );

    // Progress fill
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to({}, {
      duration: 1.6,
      ease: 'power1.inOut',
      onUpdate() {
        const v = Math.round(this.progress() * 100);
        setPct(v);
      },
    });

    // Exit: text shoots up, vortex collapses, screen fades
    tl.to(textRef.current, { y: -40, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.15');
    tl.to(mat, { opacity: 0, duration: 0.5, ease: 'power2.in' }, '<');
    tl.to(wrapRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        cancelAnimationFrame(frame);
        renderer.dispose();
        onDone();
      },
    }, '-=0.2');

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'radial-gradient(ellipse at center, #1a0f00 0%, #0d0800 60%, #000000 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Three.js canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Center content */}
      <div ref={textRef} style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
        opacity: 0,
      }}>
        {/* Logo */}
        <div style={{
          fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
          fontWeight: 900,
          fontFamily: 'Space Grotesk, sans-serif',
          color: '#ffffff',
          letterSpacing: '-2px',
          lineHeight: 1,
          filter: 'drop-shadow(0 0 30px rgba(255,184,0,0.9)) drop-shadow(0 0 60px rgba(255,77,0,0.4))',
        }}>
          <span style={{ color: '#FFB800' }}>&lt;</span>
          PG
          <span style={{ color: '#FFB800' }}>/&gt;</span>
        </div>

        {/* Tagline */}
        <p style={{
          color: 'rgba(148,163,184,0.7)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontFamily: 'Space Grotesk, sans-serif',
        }}>
          Creative Technologist
        </p>

        {/* Progress */}
        <div style={{ width: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', marginTop: '4px' }}>
          <div style={{
            width: '100%', height: '1.5px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '99px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #FFB800, #FF4D00)',
              borderRadius: '99px',
              transition: 'width 0.05s linear',
              boxShadow: '0 0 12px rgba(255,184,0,0.8)',
            }} />
          </div>
          <span style={{
            color: 'rgba(100,116,139,0.8)',
            fontSize: '0.6rem',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
          }}>
            {String(pct).padStart(3, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
}
