"use client";
import { useState, useEffect, useRef, use } from "react";
import Link from "next/link";

const subjects = [
  { code: "CS601", name: "Software Engineering", notes: 12, pyqs: 5, icon: "⚙️" },
  { code: "CS602", name: "Integrated Personality Development Course", notes: 15, pyqs: 6, icon: "📚" },
  { code: "CS603", name: "Artificial Intelligence", notes: 18, pyqs: 4, icon: "🤖" },
  { code: "CS604", name: "Cryptography and Network Security", notes: 10, pyqs: 7, icon: "🔒" },
  { code: "CS605", name: "Advanced Web Programming", notes: 14, pyqs: 5, icon: "💻" },
  { code: "CS606", name: "Mobile Application Development", notes: 16, pyqs: 8, icon: "📱" },
];

const premiumFeatures = [
  { title: "Handwritten Notes", desc: "Curated handwritten notes from toppers, structured chapter-wise for quick revision.", icon: "✍️" },
  { title: "PYQ Solutions", desc: "Previous year questions with detailed step-by-step solutions and marking scheme.", icon: "📝" },
  { title: "Lab Practicals", desc: "Complete practical files with programs, output screenshots and viva questions.", icon: "🔬" },
  { title: "Personal Support", desc: "One-on-one mentoring sessions with experts to clarify doubts and boost confidence.", icon: "👨‍🏫" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [subjectsRef, subjectsVisible] = useInView();
  const [premiumRef, premiumVisible] = useInView();
  const [statsRef, statsVisible] = useInView();

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; }

        .nav-link {
          color: #ccc;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #fff; }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #aaa;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .hero-badge span { color: #fff; }

        .hero-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          line-height: 1.0;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .hero-title em {
          font-style: italic;
          color: #ccc;
        }

        .hero-sub {
          color: #777;
          font-size: clamp(1rem, 2vw, 1.15rem);
          font-weight: 400;
          max-width: 480px;
          line-height: 1.65;
          margin-top: 20px;
        }

        .btn-primary {
          background: #fff;
          color: #000;
          border: none;
          border-radius: 999px;
          padding: 14px 32px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,255,255,0.2);
        }

        .btn-ghost {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 14px 32px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
          letter-spacing: 0.01em;
        }
        .btn-ghost:hover {
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-2px);
        }

        .section-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 12px;
        }

        .section-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          color: #0a0a0a;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .section-title em { font-style: italic; color: #555; }

        .subject-card {
          background: #fff;
          border: 1.5px solid #e8e8e8;
          border-radius: 16px;
          padding: 28px 24px;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s, border-color 0.2s;
          position: relative;
          overflow: hidden;
        }
        .subject-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #000;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1);
          z-index: 0;
          border-radius: 14px;
        }
        .subject-card:hover::before { transform: scaleY(1); }
        .subject-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.12); border-color: #000; }
        .subject-card:hover .sc-text,
        .subject-card:hover .sc-meta,
        .subject-card:hover .sc-code { color: #fff !important; }
        .subject-card:hover .sc-tag { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); }
        .subject-card > * { position: relative; z-index: 1; }

        .sc-icon { font-size: 2rem; margin-bottom: 16px; display: block; }
        .sc-code { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; color: #999; text-transform: uppercase; margin-bottom: 6px; transition: color 0.3s; }
        .sc-text { font-size: 1.05rem; font-weight: 600; color: #111; margin-bottom: 14px; line-height: 1.3; transition: color 0.3s; }
        .sc-meta { font-size: 0.78rem; color: #888; transition: color 0.3s; }
        .sc-tag {
          display: inline-block;
          background: #f4f4f4;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 0.7rem;
          font-weight: 500;
          color: #666;
          margin-right: 6px;
          transition: background 0.3s, color 0.3s;
        }

        .premium-card {
          background: #fff;
          border: 1.5px solid #eee;
          border-radius: 20px;
          padding: 36px 30px;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.2s;
        }
        .premium-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 50px rgba(0,0,0,0.08);
          border-color: #ccc;
        }
        .pc-icon {
          width: 52px; height: 52px;
          background: #000;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 20px;
        }
        .pc-title { font-size: 1.05rem; font-weight: 600; color: #111; margin-bottom: 10px; }
        .pc-desc { font-size: 0.875rem; color: #777; line-height: 1.65; }

        .stat-num {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: #000;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .stat-label { font-size: 0.82rem; color: #888; font-weight: 500; margin-top: 6px; letter-spacing: 0.04em; }

        .footer-link {
          color: #666;
          text-decoration: none;
          font-size: 0.82rem;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #fff; }

        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1);
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        .stagger-1 { transition-delay: 0.05s; }
        .stagger-2 { transition-delay: 0.12s; }
        .stagger-3 { transition-delay: 0.19s; }
        .stagger-4 { transition-delay: 0.26s; }
        .stagger-5 { transition-delay: 0.33s; }
        .stagger-6 { transition-delay: 0.40s; }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .hero-marquee {
          overflow: hidden;
          white-space: nowrap;
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 14px 0;
          margin-top: 60px;
        }
        .marquee-inner {
          display: inline-block;
          animation: marquee 22s linear infinite;
        }
        .marquee-item {
          display: inline-block;
          margin: 0 32px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        .marquee-dot { color: rgba(255,255,255,0.2); margin: 0 10px; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(.22,1,.36,1);
        }
        .mobile-menu.open { transform: translateY(0); }
        .mobile-menu a {
          font-family: 'Instrument Serif', serif;
          font-size: 2.5rem;
          color: #fff;
          text-decoration: none;
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .mobile-menu a:hover { opacity: 1; }

        @media (max-width: 900px) {
          .grid-3 { grid-template-columns: repeat(2, 1fr); }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .hero-btns { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 600px) {
          .grid-3 { grid-template-columns: 1fr; }
          .grid-2 { grid-template-columns: 1fr; }
          .grid-4 { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .hero-btns { flex-direction: row; }
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .footer-cols { flex-direction: column; gap: 32px; }
          .footer-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (min-width: 601px) {
          .hamburger { display: none !important; }
        }
      `}</style>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
        {["Notes", "PYQs", "Practicals", "Premium"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <Link href="/login">
  <button className="your-classes-here">
    Login
  </button>
</Link>
      </div>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(0,0,0,0.92)" : "#000",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "all 0.3s",
        padding: "0 clamp(20px, 5vw, 60px)",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: "#fff",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Instrument Serif', serif",
            fontSize: "1rem",
            color: "#000",
            fontWeight: 700,
          }}>P</div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.01em" }}>
            Pass Karadunga
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {["Notes", "PYQs", "Practicals", "Premium"].map(l => (
            <a key={l} className="nav-link" href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/login"><button className="btn-ghost desktop-nav" style={{ padding: "8px 20px", fontSize: "0.82rem" }}>Sign Up</button></Link>
          <Link href="/login"><button className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.82rem" }}>Login</button></Link>
          <button className="hamburger" onClick={() => setMenuOpen(true)} style={{
            background: "none", border: "none", cursor: "pointer", display: "none",
            flexDirection: "column", gap: 5, padding: 4
          }}>
            <span style={{ display: "block", width: 22, height: 1.5, background: "#fff" }}></span>
            <span style={{ display: "block", width: 22, height: 1.5, background: "#fff" }}></span>
            <span style={{ display: "block", width: 16, height: 1.5, background: "#fff" }}></span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        background: "#000",
        minHeight: "100vh",
        paddingTop: 64,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "100px clamp(20px, 6vw, 80px) 0",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "60vw", height: "40vh",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div className={`fade-up ${heroVisible ? "visible" : ""}`}>
            <div className="hero-badge">
              <span>✦</span> Semester 6 · 2026
            </div>
          </div>

          <div className={`fade-up stagger-1 ${heroVisible ? "visible" : ""}`}>
            <h1 className="hero-title">
              GTU me Pass Hona<br />
              <em>simple hai.</em>
            </h1>
          </div>

          <div className={`fade-up stagger-2 ${heroVisible ? "visible" : ""}`}>
            <p className="hero-sub">
              Notes, PYQs, and practicals — everything you need for Semester 6, 
              curated and organized so you can focus on what matters: passing.
            </p>
          </div>

          <div className={`fade-up stagger-3 ${heroVisible ? "visible" : ""}`}>
            <div className="hero-btns" style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
              <button className="btn-primary">Browse Notes →</button>
              <button className="btn-ghost">View PYQs</button>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className={`fade-up stagger-4 ${heroVisible ? "visible" : ""}`} style={{ maxWidth: "100%", marginTop: 60 }}>
          <div className="hero-marquee">
            <div className="marquee-inner">
              {[...Array(2)].map((_, i) => (
                <span key={i}>
                  {["Software Engineering", "Integrated Personality Development Course", "Artificial Intelligence", "Cryptography and Network Security", "Advanced Web Programming", "Mobile Application Development"].map((s, j) => (
                    <span key={j}>
                      <span className="marquee-item">{s}</span>
                      <span className="marquee-dot">◆</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section ref={statsRef} style={{
        background: "#fff",
        padding: "72px clamp(20px, 6vw, 80px)",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="grid-4">
            {[
              { num: "2,400+", label: "Students Enrolled" },
              { num: "48", label: "Subject Modules" },
              { num: "320+", label: "PYQ Solutions" },
              { num: "98%", label: "Pass Rate" },
            ].map((s, i) => (
              <div key={i} className={`fade-up stagger-${i + 1} ${statsVisible ? "visible" : ""}`} style={{ textAlign: "center", padding: "20px 0" }}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBJECTS SECTION */}
      <section id="notes" ref={subjectsRef} style={{
        background: "#fafafa",
        padding: "96px clamp(20px, 6vw, 80px)",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className={`fade-up ${subjectsVisible ? "visible" : ""}`} style={{ marginBottom: 56 }}>
            <div className="section-label">Subjects</div>
            <h2 className="section-title">All your subjects,<br /><em>one place.</em></h2>
            <p style={{ color: "#888", marginTop: 14, fontSize: "0.95rem", maxWidth: 440, lineHeight: 1.7 }}>
              Semester 6 subjects covered end-to-end. Notes, practicals, and PYQs — all linked.
            </p>
          </div>

          <div className="grid-3">
            {subjects.map((sub, i) => (
              <div key={sub.code} className={`subject-card fade-up stagger-${i + 1} ${subjectsVisible ? "visible" : ""}`}>
                <span className="sc-icon">{sub.icon}</span>
                <div className="sc-code">{sub.code}</div>
                <div className="sc-text">{sub.name}</div>
                <div style={{ marginBottom: 14 }}>
                  <span className="sc-tag">{sub.notes} Notes</span>
                  <span className="sc-tag">{sub.pyqs} PYQs</span>
                </div>
                <div className="sc-meta">→ View materials</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM NOTES SECTION */}
      <section id="premium" ref={premiumRef} style={{
        background: "#fff",
        padding: "96px clamp(20px, 6vw, 80px)",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
            <div className={`fade-up ${premiumVisible ? "visible" : ""}`}>
              <div className="section-label">Premium</div>
              <h2 className="section-title">Serious resources<br />for <em>serious marks.</em></h2>
            </div>
            <div className={`fade-up stagger-1 ${premiumVisible ? "visible" : ""}`}>
              <button style={{
                background: "#000", color: "#fff",
                border: "none", borderRadius: "999px",
                padding: "13px 28px", fontSize: "0.85rem",
                fontWeight: 600, cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
              >
                Get Premium →
              </button>
            </div>
          </div>

          {/* Featured Banner */}
          <div className={`fade-up ${premiumVisible ? "visible" : ""}`} style={{
            background: "#000",
            borderRadius: 20,
            padding: "48px 44px",
            marginBottom: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", right: -40, top: -40,
              width: 240, height: 240,
              background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
              borderRadius: "50%",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>All-Access Bundle</div>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                Everything for ₹199.<br /><em style={{ color: "#ccc", fontStyle: "italic" }}>One semester, zero stress.</em>
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 12, fontSize: "0.875rem", lineHeight: 1.65 }}>
                Full access to all subjects · Notes + PYQs + Practicals · Lifetime access
              </p>
            </div>
            <button className="btn-primary" style={{ position: "relative", zIndex: 1, whiteSpace: "nowrap" }}>
              Unlock Now →
            </button>
          </div>

          {/* Feature cards */}
          <div className="grid-2" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            {premiumFeatures.map((f, i) => (
              <div key={f.title} className={`premium-card fade-up stagger-${i + 1} ${premiumVisible ? "visible" : ""}`}>
                <div className="pc-icon">{f.icon}</div>
                <div className="pc-title">{f.title}</div>
                <div className="pc-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        background: "#000",
        padding: "96px clamp(20px, 6vw, 80px)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
            Start Today
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
            Padhai pe dhyan do,<br /><em style={{ color: "#888", fontStyle: "italic" }}>tension pe nahi.</em>
          </h2>
          <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 36 }}>
            Join 2,400+ students who trust Pass Karadunga to get through Semester 6 without losing their mind.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/login"><button className="btn-primary">Create Free Account</button></Link>
            <button className="btn-ghost">Explore Notes</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "60px clamp(20px, 6vw, 80px) 40px",
        color: "#555",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="footer-cols" style={{ display: "flex", justifyContent: "space-between", gap: 48, marginBottom: 52, flexWrap: "wrap" }}>
            {/* Brand */}
            <div style={{ maxWidth: 240 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, background: "#fff", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Instrument Serif'", color: "#000", fontWeight: 700 }}>P</div>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>Pass Karadunga</span>
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "#555" }}>
                Semester study materials for engineering students. Notes, PYQs, practicals — all in one place.
              </p>
            </div>

            {/* Links */}
            <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0 60px" }}>
              {[
                { head: "Resources", links: ["Notes", "PYQs", "Practicals", "Syllabus"] },
                { head: "Subjects", links: ["Software Engg.", "Comp. Networks", "Machine Learning", "Databases"] },
                { head: "Company", links: ["About", "Contact", "Privacy", "Terms"] },
              ].map(col => (
                <div key={col.head}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#444", marginBottom: 16 }}>{col.head}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.links.map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: "0.78rem", color: "#444" }}>© 2025 Pass Karadunga. All rights reserved.</span>
            <span style={{ fontSize: "0.78rem", color: "#333" }}>Made with ☕ for students who need to pass.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}