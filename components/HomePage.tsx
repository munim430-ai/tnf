'use client'

import { useState, useEffect, useRef } from 'react'

// --- useInView hook ---
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible] as const
}

// --- Reveal wrapper ---
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// --- NAVBAR ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = ['Services', 'About', 'Why Us', 'Contact']

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(8,20,58,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(37,99,235,0.2)' : 'none',
      transition: 'all 0.4s ease',
      padding: '0 5vw',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 70,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'DM Serif Display', Georgia, serif",
          color: '#fff', fontWeight: 700, fontSize: 18,
        }}>T</div>
        <span style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          color: '#fff', fontSize: 20, fontWeight: 700,
        }}>TNF <span style={{ color: '#06B6D4' }}>Global</span></span>
      </div>

      <div className="desktop-nav" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} style={{
            color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#06B6D4')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
          >{l}</a>
        ))}
        <a href="#contact" style={{
          background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
          color: '#fff', textDecoration: 'none', borderRadius: 8,
          padding: '9px 20px', fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, fontWeight: 600,
        }}>Free Consultation</a>
      </div>
    </nav>
  )
}

// --- HERO ---
function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0B1F3A 0%, #0d2654 55%, #0a1e3e 100%)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
      padding: '100px 5vw 60px',
    }}>
      {/* BG orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        {/* Text */}
        <div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.2s' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4', display: 'inline-block' }} />
              <span style={{ color: '#06B6D4', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600 }}>Bangladesh's Premier Education Consultancy</span>
            </div>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.35s' }}>
            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#fff', fontSize: 'clamp(36px, 5vw, 62px)', lineHeight: 1.1, marginBottom: 24 }}>
              Your Pathway to<br />
              <span style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Global Education</span>
            </h1>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.5s' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'DM Sans', sans-serif", fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 460 }}>
              Study abroad with confidence. From university selection to visa approval — we guide you at every step with personalized, expert support.
            </p>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.65s', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#contact" style={{ background: 'linear-gradient(90deg, #2563EB, #1d4fd8)', color: '#fff', textDecoration: 'none', padding: '15px 32px', borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, boxShadow: '0 8px 30px rgba(37,99,235,0.4)', display: 'inline-block', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,99,235,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,99,235,0.4)' }}
            >Get Free Consultation</a>
            <a href="https://wa.me/8801700000000" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none', padding: '15px 32px', borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp Now
            </a>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transition: 'all 0.8s ease 0.8s', marginTop: 40, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex' }}>
              {['#E8A87C', '#7EB8F7', '#A8E6CF', '#F7C7B0'].map((c, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: c, border: '2px solid #0B1F3A', marginLeft: i > 0 ? -10 : 0 }} />
              ))}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
              <strong style={{ color: '#fff' }}>1,000+</strong> students trusted us
            </p>
          </div>
        </div>

        {/* Arpita Image */}
        <div className="hero-image-col" style={{ position: 'relative', display: 'flex', justifyContent: 'center', opacity: loaded ? 1 : 0, transform: loaded ? 'translateX(0)' : 'translateX(60px)', transition: 'all 1s ease 0.4s' }}>
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(37,99,235,0.15) 50%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'relative', zIndex: 1, borderRadius: 24, overflow: 'hidden', width: 'min(400px, 90vw)', aspectRatio: '3/4', boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(6,182,212,0.2)' }}>
            <img src="/arpita.jpg" alt="Arpita Raksit – Lead Consultant, TNF Global Bangladesh" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(8,20,58,0.85)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '14px 18px', border: '1px solid rgba(6,182,212,0.25)' }}>
              <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#fff', fontSize: 17, fontWeight: 700, marginBottom: 3 }}>Arpita Raksit</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#06B6D4', fontSize: 13, fontWeight: 500 }}>Lead Consultant · TNF Global Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- TRUST BAR ---
function TrustBar() {
  const items = [
    { icon: '🏢', text: 'Offices in Bangladesh, Malaysia & USA' },
    { icon: '✅', text: '95%+ Visa Success Rate' },
    { icon: '🎓', text: '1,000+ Students Processed' },
    { icon: '🤝', text: 'Personalized 1-on-1 Guidance' },
  ]
  return (
    <div style={{ background: '#020617', padding: '24px 5vw', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px 48px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500 }}>
          <span style={{ fontSize: 18 }}>{item.icon}</span>{item.text}
        </div>
      ))}
    </div>
  )
}

// --- SERVICES ---
function Services() {
  const cards = [
    { icon: '🌍', title: 'Study Abroad Consulting', desc: 'Expert guidance to choose the right country, course, and university aligned with your goals and budget.' },
    { icon: '🎓', title: 'University Admission', desc: 'Complete support for applications and offer letters — from shortlisting to final enrollment.' },
    { icon: '📋', title: 'Visa Processing', desc: 'High success rate with professional documentation, interview prep, and embassy liaison.' },
    { icon: '📄', title: 'Documentation Support', desc: 'SOP writing, financial statements, and complete application preparation by experts.' },
  ]
  return (
    <section id="services" style={{ padding: '100px 5vw', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <p style={{ textAlign: 'center', fontFamily: "'DM Sans', sans-serif", color: '#2563EB', fontWeight: 600, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>What We Offer</p>
          <h2 style={{ textAlign: 'center', fontFamily: "'DM Serif Display', Georgia, serif", color: '#0B1F3A', fontSize: 'clamp(30px, 4vw, 46px)', marginBottom: 60, lineHeight: 1.2 }}>Everything You Need for<br />Your Global Journey</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 28 }}>
          {cards.map((card, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ background: '#fff', borderRadius: 20, padding: '36px 30px', boxShadow: '0 4px 24px rgba(11,31,58,0.07)', border: '1px solid rgba(11,31,58,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default', height: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(37,99,235,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(11,31,58,0.07)' }}
              >
                <div style={{ fontSize: 38, marginBottom: 20, background: 'linear-gradient(135deg, #EFF6FF, #ECFEFF)', width: 70, height: 70, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#0B1F3A', fontSize: 22, marginBottom: 12 }}>{card.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#64748B', fontSize: 15, lineHeight: 1.7 }}>{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- ABOUT ---
function About() {
  return (
    <section id="about" style={{ padding: '100px 5vw', background: 'linear-gradient(135deg, #0B1F3A 0%, #0d2654 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="about-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center' }}>
        <Reveal>
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '3/4', maxWidth: 360, boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}>
            <img src="/arpita.jpg" alt="Arpita Raksit" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,20,58,0.7) 0%, transparent 50%)' }} />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#06B6D4', fontWeight: 600, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>Meet Your Advisor</p>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#fff', fontSize: 'clamp(28px, 3.5vw, 42px)', marginBottom: 24, lineHeight: 1.2 }}>Meet Your Trusted<br />Global Advisor</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.72)', fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
            Arpita Raksit leads TNF Global Bangladesh with a mission to simplify the study abroad journey for every student. With deep industry knowledge and a personalized approach, she has helped hundreds of students successfully secure admissions and visas in top global destinations.
          </p>
          <blockquote style={{ borderLeft: '3px solid #06B6D4', paddingLeft: 24, marginBottom: 36 }}>
            <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#fff', fontSize: 20, fontStyle: 'italic', lineHeight: 1.5 }}>"Every student deserves the right guidance to build a global future."</p>
            <p style={{ color: '#06B6D4', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, marginTop: 10 }}>— Arpita Raksit, Lead Consultant</p>
          </blockquote>
          <a href="#contact" style={{ display: 'inline-block', background: 'linear-gradient(90deg, #2563EB, #06B6D4)', color: '#fff', textDecoration: 'none', padding: '14px 28px', borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>Book a Session with Arpita</a>
        </Reveal>
      </div>
    </section>
  )
}

// --- WHY US ---
function WhyUs() {
  const points = [
    { icon: '🏛️', title: 'Real Physical Office', desc: 'Meet us in person at our Bangladesh office — no faceless online-only agency.' },
    { icon: '🌐', title: 'Direct Global Network', desc: 'Partnerships with universities across Canada, UK, Malaysia, Europe & beyond.' },
    { icon: '⚡', title: 'Fast Processing Time', desc: 'Streamlined workflows mean faster offers, approvals, and peace of mind.' },
    { icon: '👤', title: 'Personalized Support', desc: 'One dedicated counselor throughout your entire journey — no handoffs.' },
    { icon: '🔍', title: 'Transparent Process', desc: 'No hidden fees. No false promises. Just honest, step-by-step guidance.' },
  ]
  return (
    <section id="why-us" style={{ padding: '100px 5vw', background: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p style={{ textAlign: 'center', color: '#2563EB', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>Our Advantage</p>
          <h2 style={{ textAlign: 'center', fontFamily: "'DM Serif Display', Georgia, serif", color: '#0B1F3A', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 64, lineHeight: 1.2 }}>Why Students Trust TNF Global</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {points.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ textAlign: 'center', padding: '32px 20px', borderRadius: 18, background: '#F8FAFC', border: '1px solid rgba(11,31,58,0.06)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = 'rgba(11,31,58,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#0B1F3A', fontSize: 18, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#64748B', fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- DESTINATIONS ---
function Destinations() {
  const countries = [
    { flag: '🇨🇦', name: 'Canada', desc: 'PR pathways + top universities' },
    { flag: '🇬🇧', name: 'United Kingdom', desc: 'World-class degrees' },
    { flag: '🇲🇾', name: 'Malaysia', desc: 'Affordable, quality education' },
    { flag: '🇺🇸', name: 'United States', desc: 'Top-ranked institutions' },
    { flag: '🇦🇺', name: 'Australia', desc: 'Post-study work rights' },
    { flag: '🇪🇺', name: 'Europe', desc: 'Low-cost, high-quality options' },
  ]
  return (
    <section style={{ padding: '100px 5vw', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p style={{ textAlign: 'center', color: '#2563EB', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>Study Destinations</p>
          <h2 style={{ textAlign: 'center', fontFamily: "'DM Serif Display', Georgia, serif", color: '#0B1F3A', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 56, lineHeight: 1.2 }}>Where Do You Want to Study?</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
          {countries.map((c, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', border: '1px solid rgba(11,31,58,0.07)', boxShadow: '0 2px 12px rgba(11,31,58,0.05)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(37,99,235,0.15)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(11,31,58,0.05)'; e.currentTarget.style.borderColor = 'rgba(11,31,58,0.07)' }}
              >
                <div style={{ fontSize: 44, marginBottom: 12 }}>{c.flag}</div>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#0B1F3A', fontSize: 16, marginBottom: 6 }}>{c.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#94A3B8', fontSize: 13 }}>{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- TESTIMONIALS ---
function Testimonials() {
  const [active, setActive] = useState(0)
  const testimonials = [
    { name: 'Rafi Hossain', dest: 'Canada', text: 'TNF Global made my dream come true. The process was smooth and stress-free. Arpita guided me at every step!' },
    { name: 'Nusrat Jahan', dest: 'Malaysia', text: 'I was confused about which country to choose. After one session with TNF Global, everything became clear. Got my offer letter within 3 weeks!' },
    { name: 'Tanvir Ahmed', dest: 'United Kingdom', text: 'From SOP to visa, they handled everything professionally. I could not have done it without their team.' },
    { name: 'Fariha Islam', dest: 'Australia', text: 'Transparent pricing, honest advice, fast results. TNF Global is the real deal for students in Bangladesh.' },
  ]
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <section style={{ padding: '100px 5vw', background: '#020617' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <p style={{ color: '#06B6D4', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>Success Stories</p>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#fff', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 60 }}>What Our Students Say</h2>
        </Reveal>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 24, padding: '48px 40px', minHeight: 220, transition: 'all 0.4s' }}>
          <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#fff', fontSize: 'clamp(17px, 2.5vw, 22px)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 32 }}>"{testimonials[active].text}"</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18 }}>{testimonials[active].name[0]}</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15 }}>{testimonials[active].name}</p>
              <p style={{ color: '#06B6D4', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>Now studying in {testimonials[active].dest}</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 28 : 10, height: 10, borderRadius: 5, background: i === active ? '#06B6D4' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
          ))}
        </div>
      </div>
    </section>
  )
}

// --- CTA ---
function CTA() {
  return (
    <section style={{ padding: '100px 5vw', background: 'linear-gradient(135deg, #1d3a8a 0%, #0B1F3A 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <Reveal>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#fff', fontSize: 'clamp(30px, 5vw, 54px)', marginBottom: 20, lineHeight: 1.2 }}>Start Your Study Abroad<br />Journey Today</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.65)', fontSize: 17, marginBottom: 44 }}>One conversation can change your future. Book your free session now.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, boxShadow: '0 8px 30px rgba(6,182,212,0.3)' }}>Book Consultation</a>
          <a href="https://wa.me/8801700000000" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15 }}>WhatsApp Now</a>
        </div>
      </Reveal>
    </section>
  )
}

// --- CONTACT ---
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', country: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const countries = ['Canada', 'United Kingdom', 'Malaysia', 'United States', 'Australia', 'Europe', 'Other']

  return (
    <section id="contact" style={{ padding: '100px 5vw', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <Reveal>
          <p style={{ textAlign: 'center', color: '#2563EB', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>Get In Touch</p>
          <h2 style={{ textAlign: 'center', fontFamily: "'DM Serif Display', Georgia, serif", color: '#0B1F3A', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 50, lineHeight: 1.2 }}>Book Your Free<br />Consultation</h2>
        </Reveal>
        {submitted ? (
          <Reveal>
            <div style={{ background: '#fff', borderRadius: 20, padding: 60, textAlign: 'center', boxShadow: '0 8px 40px rgba(11,31,58,0.08)' }}>
              <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
              <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#0B1F3A', fontSize: 26, marginBottom: 12 }}>We will be in touch!</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#64748B', fontSize: 16 }}>Thank you, {form.name}. Our team will contact you within 24 hours.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', boxShadow: '0 8px 40px rgba(11,31,58,0.08)', border: '1px solid rgba(11,31,58,0.06)' }}>
              {[
                { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Your full name' },
                { label: 'Phone Number *', key: 'phone', type: 'tel', placeholder: '+880 1700 000000' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", color: '#374151', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '1.5px solid #E2E8F0', fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: 'none', background: '#FAFBFC' }}
                    onFocus={e => (e.target.style.borderColor = '#2563EB')}
                    onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", color: '#374151', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Preferred Destination</label>
                <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '1.5px solid #E2E8F0', fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: 'none', background: '#FAFBFC' }}>
                  <option value="">Select a country...</option>
                  {countries.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", color: '#374151', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Message</label>
                <textarea placeholder="Tell us about your education goals..." rows={4} value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '1.5px solid #E2E8F0', fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: 'none', resize: 'vertical', background: '#FAFBFC' }}
                  onFocus={e => (e.target.style.borderColor = '#2563EB')}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
              <button onClick={() => { if (form.name && form.phone) setSubmitted(true) }}
                style={{ width: '100%', padding: '16px', background: 'linear-gradient(90deg, #2563EB, #06B6D4)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 8px 30px rgba(37,99,235,0.35)', transition: 'opacity 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.92'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >Send Message →</button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

// --- FOOTER ---
function Footer() {
  return (
    <footer style={{ background: '#020617', padding: '60px 5vw 30px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 60, marginBottom: 50 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #2563EB, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display', Georgia, serif", color: '#fff', fontSize: 18 }}>T</div>
              <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: '#fff', fontSize: 18 }}>TNF <span style={{ color: '#06B6D4' }}>Global</span> Bangladesh</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>Your trusted partner for international education — guiding students from Bangladesh to global success.</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 20 }}>Services</h4>
            {['Study Abroad Consulting', 'University Admission', 'Visa Processing', 'Documentation'].map(s => (
              <p key={s} style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginBottom: 12 }}>{s}</p>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 20 }}>Contact</h4>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginBottom: 12 }}>📍 Dhaka, Bangladesh</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginBottom: 12 }}>📞 +880 1700-000000</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginBottom: 12 }}>✉️ info@tnfglobal.org</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>© 2025 TNF Global Bangladesh. All rights reserved.</p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>Your Pathway to Global Education 🌍</p>
        </div>
      </div>
    </footer>
  )
}

// --- WhatsApp Float ---
function WhatsAppFloat() {
  return (
    <a href="https://wa.me/8801700000000" target="_blank" rel="noreferrer"
      style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200, width: 58, height: 58, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(37,211,102,0.45)', transition: 'transform 0.3s, box-shadow 0.3s', textDecoration: 'none' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,211,102,0.6)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.45)' }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    </a>
  )
}

// --- MAIN ---
export default function HomePage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <WhyUs />
      <Destinations />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
