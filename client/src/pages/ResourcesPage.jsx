import { useState, useEffect } from 'react';
import { getResources } from '../utils/api';
import NewsletterInline from '../components/NewsletterInline';

const DEMO_RESOURCES = [
  { id: 1, name: 'Jasper', description: 'The #1 AI writing assistant for creating blogs, social posts, and so much more!', url: 'https://jasper.ai', category: 'AI Tools', badge: '$500+/Week', earnings_claim: 'Earn $500+/Week With Content Creation', is_featured: true },
  { id: 2, name: 'Alitsan', description: 'Generate passive income with custom-built, AI-powered ecom/stores that generate $1,000+/week!', url: '#', category: 'Make Money', badge: '$1,000/D+', earnings_claim: 'Easy AI Stores That Generate $1,000/D+ Week', is_featured: true },
  { id: 3, name: 'Surfer', description: 'SEO optimization and AI writing tools to rank higher and earn more.', url: 'https://surferseo.com', category: 'AI Tools', badge: '$100–$500/Mo', earnings_claim: 'Earn $100–$500/Mo', is_featured: false },
  { id: 4, name: 'Canva', description: 'Boost viral pins, online graphics and promotional tools to earn passive income.', url: 'https://canva.com', category: 'AI Tools', badge: 'Passive Income', earnings_claim: 'Earn Passive Income', is_featured: false },
  { id: 5, name: 'VidIQ', description: 'Boost more views and income with YouTube tools and AI analysis.', url: 'https://vidiq.com', category: 'AI Tools', badge: 'YouTube Income', earnings_claim: 'Best for YouTube Income', is_featured: false },
  { id: 6, name: 'ManyChat', description: 'Automate your messages and increase income through Instagram and Facebook.', url: 'https://manychat.com', category: 'Make Money', badge: '100% FREE', earnings_claim: 'Automate messages & increase income', is_featured: false },
];

const RESOURCE_ICONS = { Jasper: '✍️', Alitsan: '🏪', Surfer: '🌊', Canva: '🎨', VidIQ: '📹', ManyChat: '💬' };

const TABS = ['All', 'AI Tools', 'Make Money', 'Blogging', 'Courses'];

export default function ResourcesPage() {
  const [resources, setResources] = useState(DEMO_RESOURCES);
  const [tab, setTab] = useState('All');

  useEffect(() => {
    getResources().then(r => { if (r.data?.length) setResources(r.data); }).catch(() => {});
  }, []);

  const filtered = tab === 'All' ? resources : resources.filter(r => r.category === tab);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-eyebrow">RESOURCES</div>
          <h1 className="page-hero-title">Best Resources to <span>Make Money Online</span></h1>
          <p className="page-hero-sub">Top tools, services, and software to earn $500–$1,000+/day working online! These are the best resources we personally use and trust for maximizing profits online.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Top Resources to <span>Make Money Online</span></h2>
          <div className="section-divider" />

          <div className="filter-tabs" style={{ marginBottom: 32 }}>
            {TABS.map(t => (
              <button key={t} className={`filter-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>

          <div className="resource-grid">
            {filtered.map(res => (
              <div key={res.id} className="resource-card">
                <div className="resource-card-head">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 20 }}>{RESOURCE_ICONS[res.name] || '🔧'}</span>
                      <span className="resource-name">{res.name}</span>
                    </div>
                  </div>
                  <span className="resource-badge">{res.badge}</span>
                </div>
                <div className="resource-title">{res.earnings_claim}</div>
                <div className="resource-desc">{res.description}</div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-btn"
                >
                  {res.url === '#' ? 'Start a Store →' : `Try ${res.name} →`}
                </a>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
              No resources in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="newsletter-banner">
            <div className="newsletter-content">
              <div className="newsletter-title">Get Free <span>AI Money Guide!</span></div>
              <div className="newsletter-sub">Step-by-step guide to earning $2,000+/month online.</div>
            </div>
            <div style={{ flexShrink: 0, minWidth: 280 }}>
              <NewsletterInline />
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="container" style={{ paddingBottom: 48 }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.7 }}>
          Tools we personally use to earn money online. Tested, trusted, and verified to deliver results for beginners & pros.<br />
          Some links are affiliate links. We may earn a commission at no extra cost to you.
        </p>
      </div>
    </>
  );
}
