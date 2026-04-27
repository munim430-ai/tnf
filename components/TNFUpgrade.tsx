export default function TNFUpgrade() {
  const phone = '+8801632796650'
  const whatsapp = 'https://wa.me/8801632796650'

  const destinations = [
    { country: 'USA', flag: '🇺🇸', badge: 'IELTS Must / Strongly Required', note: 'English proficiency is usually required depending on university and program.' },
    { country: 'Australia', flag: '🇦🇺', badge: 'IELTS Must / Strongly Required', note: 'IELTS is usually required for admission and visa processing.' },
    { country: 'UK', flag: '🇬🇧', badge: 'IELTS Must / Strongly Required', note: 'IELTS or an approved English test is commonly required.' },
    { country: 'Canada', flag: '🇨🇦', badge: 'IELTS Must / Strongly Required', note: 'IELTS is usually required for admission and visa profile strength.' },
    { country: 'Malaysia', flag: '🇲🇾', badge: 'EMGS Fee Non-Refundable', note: 'IELTS may not always be mandatory, depending on university and program.' },
  ]

  return (
    <>
      <section id="ielts-guidance" style={{ position: 'relative', overflow: 'hidden', padding: '110px 5vw', background: 'linear-gradient(135deg, #eef7ff 0%, #ffffff 45%, #ecfeff 100%)' }}>
        <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', right: '8%', top: 70, background: 'radial-gradient(circle at 35% 30%, #ffffff, #06B6D4 28%, #2563EB 62%, #0B1F3A)', boxShadow: '0 34px 90px rgba(37,99,235,0.28)', animation: 'floatTnfUpgrade 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', right: '4%', top: 28, border: '1px solid rgba(37,99,235,0.18)', transform: 'rotateX(70deg) rotateZ(20deg)' }} />

        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 720, marginBottom: 42 }}>
            <p style={{ color: '#2563EB', fontWeight: 700, letterSpacing: 1.5, fontSize: 13, textTransform: 'uppercase', marginBottom: 12 }}>IELTS & Destination Clarity</p>
            <h2 style={{ color: '#0B1F3A', fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(32px, 4.8vw, 58px)', lineHeight: 1.06, marginBottom: 18 }}>Study Abroad with Clear IELTS & Visa Guidance</h2>
            <p style={{ color: '#475569', fontSize: 18, lineHeight: 1.75 }}>Get professional support for USA, Australia, UK, Canada, and Malaysia. We guide you on admission, IELTS planning, visa documentation, and country-specific requirements before you spend money.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20 }}>
            {destinations.map((item) => (
              <div key={item.country} style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(16px)', border: '1px solid rgba(37,99,235,0.13)', borderRadius: 24, padding: 24, boxShadow: '0 22px 60px rgba(15,23,42,0.08)', transition: 'transform .25s ease, box-shadow .25s ease' }}>
                <div style={{ fontSize: 42, marginBottom: 14 }}>{item.flag}</div>
                <h3 style={{ color: '#0B1F3A', fontSize: 22, fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 10 }}>{item.country}</h3>
                <div style={{ display: 'inline-block', padding: '7px 10px', borderRadius: 999, background: item.country === 'Malaysia' ? 'rgba(245,158,11,0.12)' : 'rgba(37,99,235,0.1)', color: item.country === 'Malaysia' ? '#92400E' : '#1D4ED8', fontSize: 12, fontWeight: 800, marginBottom: 14 }}>{item.badge}</div>
                <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.65 }}>{item.note}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div style={{ borderRadius: 24, padding: 28, background: '#0B1F3A', color: '#fff', boxShadow: '0 24px 70px rgba(11,31,58,0.24)' }}>
              <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, marginBottom: 10 }}>IELTS Must for Major Destinations</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>For USA, Australia, UK, and Canada, students should prepare for IELTS before starting the process.</p>
            </div>
            <div style={{ borderRadius: 24, padding: 28, background: '#FFF7ED', border: '1px solid rgba(245,158,11,0.24)', boxShadow: '0 24px 70px rgba(146,64,14,0.09)' }}>
              <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, color: '#7C2D12', marginBottom: 10 }}>Important Malaysia Notice</h3>
              <p style={{ color: '#9A3412', lineHeight: 1.7, fontWeight: 600 }}>Malaysia EMGS fee is non-refundable. Students must confirm their decision, documents, and eligibility before payment.</p>
            </div>
          </div>

          <div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#contact" style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)', color: '#fff', textDecoration: 'none', padding: '15px 26px', borderRadius: 12, fontWeight: 800, boxShadow: '0 14px 35px rgba(37,99,235,0.3)' }}>Talk to a Consultant Before You Apply</a>
            <a href={whatsapp} target="_blank" rel="noreferrer" style={{ background: '#0B1F3A', color: '#fff', textDecoration: 'none', padding: '15px 26px', borderRadius: 12, fontWeight: 800 }}>WhatsApp: {phone}</a>
          </div>
        </div>
      </section>

      <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 999 }}>
        <a href={whatsapp} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#16A34A', color: '#fff', textDecoration: 'none', padding: '13px 18px', borderRadius: 999, fontWeight: 800, boxShadow: '0 18px 45px rgba(22,163,74,0.35)' }}>WhatsApp {phone}</a>
      </div>

      <style>{`@keyframes floatTnfUpgrade { 0%, 100% { transform: translateY(0) rotateY(-12deg); } 50% { transform: translateY(-18px) rotateY(16deg); } }`}</style>
    </>
  )
}
