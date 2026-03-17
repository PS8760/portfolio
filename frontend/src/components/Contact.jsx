import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Github, Instagram, Linkedin, XTwitter, Clock, CheckCircle, Copy, Check, Eye } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const MAX_MSG = 500;

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [views, setViews] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const c = {
    bg: isDark ? '#111111' : '#f5f5f3',
    surface: isDark ? '#141414' : '#ffffff',
    border: isDark ? 'rgba(255,184,0,0.15)' : 'rgba(0,0,0,0.1)',
    text: isDark ? '#ffffff' : '#111111',
    muted: isDark ? '#94a3b8' : '#555555',
    inputBg: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    inputBorder: isDark ? 'rgba(255,184,0,0.2)' : 'rgba(0,0,0,0.15)',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left', { opacity: 0, x: -50 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-left', start: 'top 80%' },
      });
      gsap.fromTo('.contact-right', { opacity: 0, x: 50 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-right', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Fetch + increment view counter once
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    fetch(`${API}/api/views`, { method: 'POST' })
      .then(r => r.json())
      .then(d => setViews(d.views))
      .catch(() => {});
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_MSG) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    setErrorMsg('');
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
      else { setStatus('error'); setErrorMsg(data.detail || data.error || ''); }
    } catch { setStatus('error'); setErrorMsg('Cannot reach server. Make sure the backend is running.'); }
    setLoading(false);
  };

  const inputStyle = {
    background: c.inputBg,
    border: `1px solid ${c.inputBorder}`,
    borderRadius: '10px',
    padding: '12px 14px',
    color: c.text,
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const socials = [
    { icon: <Github size={17} />, href: personalInfo.github, label: 'GitHub', color: isDark ? '#e2e8f0' : '#0f172a' },
    { icon: <Instagram size={17} />, href: personalInfo.instagram, label: 'Instagram', color: '#e1306c' },
    { icon: <Linkedin size={17} />, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0a66c2' },
    { icon: <XTwitter size={17} />, href: personalInfo.twitter, label: 'Twitter / X', color: '#1d9bf0' },
  ];

  const msgLen = form.message.length;
  const msgPct = (msgLen / MAX_MSG) * 100;
  const msgColor = msgPct > 90 ? '#ef4444' : msgPct > 70 ? '#f59e0b' : '#FFB800';

  return (
    <section id="contact" ref={sectionRef} className="py-24" style={{ background: c.bg }}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
            style={{ color: '#FFB800', background: 'rgba(255,184,0,0.1)', borderColor: 'rgba(255,184,0,0.3)' }}>
            Let's Talk
          </span>
          <h2 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: c.text }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">

          {/* Left */}
          <div className="contact-left flex flex-col gap-6">

            {/* Availability card */}
            <div className="p-5 rounded-2xl border" style={{ background: c.surface, borderColor: 'rgba(16,185,129,0.25)' }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 glow-pulse" />
                <span className="font-bold text-sm text-emerald-400">Available for Work</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: c.muted }}>
                Open to internships, freelance projects, and full-time opportunities. Let's build something great together.
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: c.muted }}>
                <Clock size={12} /> Usually responds within 24 hours
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm" style={{ background: c.surface, borderColor: c.border, color: c.muted }}>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-yellow-400 flex-shrink-0" />
                  <span>{personalInfo.email}</span>
                </div>
                <button onClick={copyEmail}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex-shrink-0"
                  style={{
                    background: copied ? 'rgba(16,185,129,0.12)' : 'rgba(255,184,0,0.1)',
                    color: copied ? '#10b981' : '#FFB800',
                    border: `1px solid ${copied ? 'rgba(16,185,129,0.3)' : 'rgba(255,184,0,0.3)'}`,
                  }}>
                  {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                </button>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm" style={{ background: c.surface, borderColor: c.border, color: c.muted }}>
                <MapPin size={16} className="text-yellow-400 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
              {views !== null && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm" style={{ background: c.surface, borderColor: c.border, color: c.muted }}>
                  <Eye size={16} className="text-yellow-400 flex-shrink-0" />
                  <span><span className="font-bold" style={{ color: '#FFB800' }}>{views.toLocaleString()}</span> portfolio views</span>
                </div>
              )}
            </div>

            {/* Socials */}
            <div className="p-5 rounded-2xl border" style={{ background: c.surface, borderColor: c.border }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: c.muted }}>Find me on</p>
              <div className="grid grid-cols-2 gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: c.border, color: c.muted, textDecoration: 'none' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color; e.currentTarget.style.background = `${s.color}10`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.muted; e.currentTarget.style.background = 'transparent'; }}>
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-right">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 rounded-2xl border"
              style={{ background: c.surface, borderColor: c.border }}>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: c.muted }}>Name *</label>
                  <input id="name" name="name" type="text" placeholder="Pranav Ghodke"
                    value={form.name} onChange={handleChange} required style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#FFB800'; e.target.style.boxShadow = '0 0 0 3px rgba(255,184,0,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = c.inputBorder; e.target.style.boxShadow = 'none'; }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: c.muted }}>Email *</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange} required style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#FFB800'; e.target.style.boxShadow = '0 0 0 3px rgba(255,184,0,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = c.inputBorder; e.target.style.boxShadow = 'none'; }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold" style={{ color: c.muted }}>Message *</label>
                  <span className="text-xs font-medium" style={{ color: msgColor }}>{msgLen}/{MAX_MSG}</span>
                </div>
                <textarea id="message" name="message" rows={5} placeholder="Tell me about your project or idea..."
                  value={form.message} onChange={handleChange} required
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => { e.target.style.borderColor = '#FFB800'; e.target.style.boxShadow = '0 0 0 3px rgba(255,184,0,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = c.inputBorder; e.target.style.boxShadow = 'none'; }} />
                {/* Char progress bar */}
                <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${msgPct}%`, background: msgColor }} />
                </div>
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
                  <CheckCircle size={16} /> Message sent! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="text-sm font-semibold px-4 py-3 rounded-xl text-red-400 bg-red-400/10 border border-red-400/20">
                  <p>Something went wrong. Please try again or email me directly.</p>
                  {errorMsg && <p className="text-xs mt-1 opacity-70 font-normal">{errorMsg}</p>}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(255,184,0,0.45)] disabled:opacity-60 disabled:cursor-not-allowed shimmer-btn"
                style={{ border: 'none' }}>
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  : <><Send size={15} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
