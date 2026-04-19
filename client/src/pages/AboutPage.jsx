import { Link } from 'react-router-dom';
import NewsletterInline from '../components/NewsletterInline';

const VALUES = [
  { icon: '🛡️', name: 'Honest Reviews', desc: 'We only recommend tools and services we trust and would use ourselves.' },
  { icon: '🎓', name: 'Simple Guides', desc: 'We make complex topics easy to understand with step-by-step tutorials.' },
  { icon: '🚀', name: 'Real Results', desc: 'Our strategies are focused on practical outcomes that create real income.' },
  { icon: '❤️', name: 'Your Success', desc: 'Your goals are our priority. We\'re here to support you every step of the way.' },
];

const STATS = [
  { value: '25,000+', label: 'Monthly Readers', icon: '👥' },
  { value: '150+', label: 'Countries Reached', icon: '🌍' },
  { value: '500+', label: 'Guides & Resources', icon: '📋' },
  { value: '100%', label: 'Commitment to Your Success', icon: '❤️' },
];

const TRUST_POINTS = [
  '100% Focused on AI, Blogging & Online Income',
  'Actionable Content for Beginners & Pros',
  'Regularly Updated with Latest Tools & Strategies',
  'Built for People in the USA — By Real Online Entrepreneurs',
  'Trusted by Thousands of Readers Worldwide',
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero" style={{ paddingBottom: 72 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="page-hero-eyebrow">ABOUT</div>
              <h1 className="page-hero-title">
                Helping People in the USA<br />
                <span>Make Money Online with AI</span>
              </h1>
              <p className="page-hero-sub">
                At AI Money Blog, we believe everyone deserves access to smart tools, real strategies, and step-by-step guidance to build freedom and create a better life — online.
              </p>
              <p style={{ fontStyle: 'italic', color: 'var(--gold)', marginTop: 16, fontSize: '1rem' }}>
                Learn. Apply. Earn. That's the AI way.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 24px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--gold)', fontSize: '1rem', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>
                  Real Tools
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 4, letterSpacing: 0.5 }}>Real Strategies</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--gold)', fontSize: '1.1rem', letterSpacing: 1, textTransform: 'uppercase' }}>Real Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* Mission & Story */}
          <div className="about-grid" style={{ marginBottom: 48 }}>
            <div className="mission-card">
              <div className="mission-card-head">
                <span className="mission-card-icon">🎯</span>
                <span className="mission-card-title">Our <span>Mission</span></span>
              </div>
              <p>
                Our mission is simple — to help people in the USA make money online using the power of Artificial Intelligence. We provide honest reviews, practical guides, and the best resources to help you start, grow, and scale your online income with confidence.
              </p>
              <Link to="/blog" className="btn btn-gold btn-sm">Let's Get You Started →</Link>
            </div>

            <div className="mission-card">
              <div className="mission-card-head">
                <span className="mission-card-icon">📖</span>
                <span className="mission-card-title">Our <span>Story</span></span>
              </div>
              <p>
                AI Money Blog was created with a vision to make online income simple, accessible, and achievable for everyone. We started this journey to share what actually works — from AI tools to blogging strategies — and help thousands of people build a location-independent life they love.
              </p>
              <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '0.9rem' }}>— Let's build your future, together.</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar" style={{ marginBottom: 64 }}>
            {STATS.map(s => (
              <div key={s.label} className="stat-item">
                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div>
                <div className="stat-item-value">{s.value}</div>
                <div className="stat-item-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 className="section-title">Our <span>Values</span></h2>
            <div className="section-divider" style={{ margin: '8px auto 32px' }} />
          </div>
          <div className="values-grid" style={{ marginBottom: 64 }}>
            {VALUES.map(v => (
              <div key={v.name} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <div className="value-name">{v.name}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>

          {/* Why Trust */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', marginBottom: 64 }}>
            <div>
              <h2 className="section-title">Why Trust <span>AI Money Blog?</span></h2>
              <div className="section-divider" />
              <ul className="trust-list">
                {TRUST_POINTS.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: 16 }}>🌐</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', marginBottom: 4 }}>Big Goals</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--gold)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>Smarter Together</div>
            </div>
          </div>

          {/* CTA */}
          <div className="newsletter-banner">
            <div className="newsletter-content">
              <div className="newsletter-title">Ready to Start Your <span>AI Money Journey?</span></div>
              <div className="newsletter-sub">Join our community and get honest tips, strategies, and resources delivered to your inbox.</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>🔒 No spam. Unsubscribe anytime.</p>
            </div>
            <div style={{ flexShrink: 0, minWidth: 280 }}>
              <NewsletterInline />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
