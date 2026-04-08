import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { skills, achievements } from '../data/portfolio';

// Group skills by category and calculate average
const categoryData = {};
skills.forEach(s => {
  if (!categoryData[s.category]) categoryData[s.category] = { total: 0, count: 0, skills: [] };
  categoryData[s.category].total += s.level;
  categoryData[s.category].count++;
  categoryData[s.category].skills.push(s.name);
});

const categories = Object.keys(categoryData).map(cat => ({
  name: cat,
  level: Math.round(categoryData[cat].total / categoryData[cat].count),
  skills: categoryData[cat].skills,
}));

const categoryColors = {
  Frontend: '#FFB800',
  Backend: '#FF4D00',
  Database: '#10b981',
  Language: '#f59e0b',
  Creative: '#ef4444',
  Tools: '#64748b',
  Deployment: '#f97316',
};

export default function Skills3D() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    let W = container.clientWidth;
    let H = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 3, 12);
    camera.lookAt(0, 0, 0);

    // Ambient + directional light
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Skill category objects
    const skillObjects = [];
    const radius = 5;
    categories.forEach((cat, i) => {
      const angle = (i / categories.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (cat.level / 100) * 2 - 1; // height based on skill level

      let geo;
      // Different shapes for variety
      if (i % 3 === 0) geo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      else if (i % 3 === 1) geo = new THREE.ConeGeometry(0.7, 1.5, 6);
      else geo = new THREE.CylinderGeometry(0.6, 0.6, 1.4, 8);

      const color = new THREE.Color(categoryColors[cat.name] || '#888888');
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.3,
        roughness: 0.4,
        emissive: color,
        emissiveIntensity: 0.2,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = { category: cat.name, level: cat.level, skills: cat.skills, index: i };
      scene.add(mesh);
      skillObjects.push(mesh);
    });

    // Achievement trophies (smaller, orbiting)
    const trophyObjects = [];
    achievements.slice(0, 5).forEach((ach, i) => {
      const angle = (i / 5) * Math.PI * 2 + Math.PI / 5;
      const r = 7.5;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      const geo = new THREE.OctahedronGeometry(0.4, 0);
      const color = new THREE.Color(ach.color);
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.6,
        roughness: 0.2,
        emissive: color,
        emissiveIntensity: 0.3,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, 0.5, z);
      mesh.userData = { achievement: ach.title, index: i };
      scene.add(mesh);
      trophyObjects.push(mesh);
    });

    // Central platform
    const platformGeo = new THREE.CylinderGeometry(6, 6, 0.2, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1a1a1a : 0xeeeeee,
      metalness: 0.1,
      roughness: 0.8,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -1.5;
    scene.add(platform);

    // Grid helper
    const gridHelper = new THREE.GridHelper(14, 14, 0xFFB800, 0x333333);
    gridHelper.position.y = -1.4;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      mouseX = (e.clientX / W) * 2 - 1;
      mouseY = (e.clientY / H) * 2 - 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([...skillObjects, ...trophyObjects]);

      if (intersects.length > 0) {
        const obj = intersects[0].object;
        setHovered(obj.userData);
        canvas.style.cursor = 'pointer';
      } else {
        setHovered(null);
        canvas.style.cursor = 'default';
      }
    };

    const onClick = () => {
      if (hovered) setSelected(hovered);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);

    // Animation loop
    let frame;
    let time = 0;

    function animate() {
      frame = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate skill objects
      skillObjects.forEach((obj, i) => {
        obj.rotation.y += 0.005;
        obj.rotation.x = Math.sin(time + i) * 0.1;
        // Pulse on hover
        if (hovered && hovered.index === obj.userData.index && hovered.category) {
          obj.scale.setScalar(1.15 + Math.sin(time * 4) * 0.05);
        } else {
          obj.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      });

      // Orbit trophies
      trophyObjects.forEach((obj, i) => {
        const angle = time * 0.3 + (i / 5) * Math.PI * 2;
        const r = 7.5;
        obj.position.x = Math.cos(angle) * r;
        obj.position.z = Math.sin(angle) * r;
        obj.position.y = 0.5 + Math.sin(time * 2 + i) * 0.3;
        obj.rotation.y += 0.02;

        if (hovered && hovered.index === obj.userData.index && hovered.achievement) {
          obj.scale.setScalar(1.3);
        } else {
          obj.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      });

      // Camera drift with mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 + 3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      W = container.clientWidth;
      H = container.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
    };
  }, [isDark, hovered]);

  const c = {
    bg: isDark ? '#0a0a0a' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    muted: isDark ? '#888888' : '#666666',
    surface: isDark ? '#141414' : '#f5f5f3',
  };

  return (
    <section id="skills" style={{ background: c.bg, padding: '96px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '999px',
            color: '#FFB800', background: 'rgba(255,184,0,0.1)',
            border: '1px solid rgba(255,184,0,0.3)', marginBottom: '14px',
          }}>Interactive 3D</span>
          <h2 style={{
            fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15,
            color: c.text, margin: '0 0 10px',
          }}>
            Skills & <span className="gradient-text">Achievements</span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: c.muted, maxWidth: '400px', margin: '0 auto' }}>
            Hover over objects to explore. Click to lock details.
          </p>
        </div>

        {/* 3D Canvas */}
        <div ref={containerRef} style={{
          position: 'relative', width: '100%', height: '500px',
          borderRadius: '20px', overflow: 'hidden',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
          background: isDark ? '#0d0d0d' : '#fafafa',
        }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

          {/* Info overlay */}
          {(hovered || selected) && (
            <div style={{
              position: 'absolute', top: '20px', left: '20px',
              background: isDark ? 'rgba(20,20,20,0.95)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(12px)',
              padding: '16px 20px', borderRadius: '12px',
              border: `1px solid ${(hovered || selected).category ? categoryColors[(hovered || selected).category] : '#FFB800'}`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              maxWidth: '280px',
            }}>
              {(hovered || selected).category && (
                <>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: categoryColors[(hovered || selected).category], marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {(hovered || selected).category}
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: c.text, marginBottom: '8px' }}>
                    {(hovered || selected).level}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: c.muted, lineHeight: 1.5 }}>
                    {(hovered || selected).skills.join(' · ')}
                  </div>
                </>
              )}
              {(hovered || selected).achievement && (
                <>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FFB800', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Achievement
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: c.text }}>
                    {(hovered || selected).achievement}
                  </div>
                </>
              )}
              {selected && (
                <button onClick={() => setSelected(null)} style={{
                  marginTop: '10px', fontSize: '0.7rem', padding: '4px 10px',
                  background: 'rgba(255,184,0,0.15)', color: '#FFB800',
                  border: '1px solid rgba(255,184,0,0.3)', borderRadius: '6px',
                  cursor: 'pointer', fontWeight: 600,
                }}>
                  Close
                </button>
              )}
            </div>
          )}

          {/* Controls hint */}
          <div style={{
            position: 'absolute', bottom: '16px', right: '16px',
            fontSize: '0.7rem', color: c.muted,
            background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
            padding: '8px 12px', borderRadius: '8px',
            backdropFilter: 'blur(8px)',
          }}>
            Move mouse to rotate camera
          </div>
        </div>

      </div>
    </section>
  );
}
