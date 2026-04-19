import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts, getPopularPosts } from '../utils/api';
import { PostCard, PopularPostItem } from '../components/PostCard';
import NewsletterInline from '../components/NewsletterInline';

// Fallback data for demo
const DEMO_POSTS = [
  { id: 1, title: '7 Best AI Tools to Make Money Online in 2026', slug: '7-best-ai-tools-make-money-online-2026', excerpt: 'AI tools can help you earn $100–$500 per day. Discover the top beginner-friendly tools to start your income journey.', category_name: 'AI Tools', category_slug: 'ai-tools', category_color: '#f59e0b', is_featured: true, views: 4820, read_time: 8, published_at: new Date(Date.now() - 9 * 86400000) },
  { id: 2, title: 'How to Earn $500+ Per Day with AI Tools', slug: 'how-to-earn-500-per-day-ai-tools', excerpt: 'Learn the exact steps to earn from Pinterest using AI strategies that are working right now.', category_name: 'Make Money', category_slug: 'make-money', category_color: '#10b981', is_featured: false, views: 3120, read_time: 6, published_at: new Date(Date.now() - 7 * 86400000) },
  { id: 3, title: 'How to Create a Profitable AI-Powered Blog', slug: 'how-to-create-profitable-ai-powered-blog', excerpt: 'Discover the top AI tools to boost viral content and build a blog that earns passive income.', category_name: 'Blogging', category_slug: 'blogging', category_color: '#6366f1', is_featured: false, views: 2890, read_time: 7, published_at: new Date(Date.now() - 5 * 86400000) },
  { id: 4, title: 'Best AI Tools for YouTube & Video Creators', slug: 'best-ai-tools-youtube-video-creators', excerpt: 'Learn the exact steps to design viral content and grow your YouTube channel with AI tools.', category_name: 'AI Tools', category_slug: 'ai-tools', category_color: '#f59e0b', is_featured: false, views: 1560, read_time: 5, published_at: new Date(Date.now() - 3 * 86400000) },
  { id: 5, title: 'How to Make Money on Pinterest with AI', slug: 'how-to-make-money-pinterest-ai', excerpt: 'Pinterest is a goldmine for affiliate marketers. Here\'s how to leverage AI for maximum income.', category_name: 'Make Money', category_slug: 'make-money', category_color: '#10b981', is_featured: false, views: 2100, read_time: 6, published_at: new Date(Date.now() - 2 * 86400000) },
  { id: 6, title: 'AI-Driven Social Media Strategies for Income', slug: 'ai-driven-social-media-strategies-income', excerpt: 'Social media is one of the fastest ways to build an audience and generate income online with AI.', category_name: 'AI Tools', category_slug: 'ai-tools', category_color: '#f59e0b', is_featured: false, views: 980, read_time: 4, published_at: new Date(Date.now() - 86400000) },
];
const POPULAR = DEMO_POSTS.slice().sort((a, b) => b.views - a.views).slice(0, 4);

const TABS = ['All', 'AI Tools', 'Make Money', 'Blogging'];

export default function HomePage() {
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [popular, setPopular] = useState(POPULAR);
  const [tab, setTab] = useState('All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getPosts({ limit: 10 })
      .then(r => { if (r.data.posts?.length) setPosts(r.data.posts); })
      .catch(() => {});
    getPopularPosts()
      .then(r => { if (r.data?.length) setPopular(r.data); })
      .catch(() => {});
  }, []);

  const filtered = posts.filter(p => {
    const matchTab = tab === 'All' || p.category_name === tab;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">⚡ Learn. Apply. Earn. That's the AI way.</div>
              <h1 className="hero-title">
                Helping People in the USA<br />
                <span className="gold">Make Money Online</span><br />
                with AI Tools
              </h1>
              <p className="hero-sub">
                Learn how to earn <strong style={{color:'var(--gold)'}}>$500+ per day</strong> using Artificial Intelligence — Tips, tools, and guides to turbocharge your online income!
              </p>
              <ul className="hero-checks">
                <li>Latest AI Money Tips & Strategies</li>
                <li>Step-by-Step Tutorials for Beginners</li>
                <li>Best AI Tools Reviewed & Tested</li>
              </ul>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/blog" className="btn btn-gold">Get Started →</Link>
                <Link to="/resources" className="btn btn-outline">View Resources</Link>
              </div>
              <div className="hero-trust" style={{ marginTop: 20 }}>
                {['AdSense', 'Amazon', 'Clickbank', 'Jasper'].map(b => (
                  <span key={b} className="trust-badge">{b}</span>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-earnings-card">
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Potential Earnings</div>
                <div className="earnings-amount">+$500</div>
                <div className="earnings-label">Per Day</div>
                <div className="earnings-arrow">📈</div>
              </div>
              <div className="hero-mini-stats">
                <div className="mini-stat"><div className="mini-stat-value">25K+</div><div className="mini-stat-label">Readers</div></div>
                <div className="mini-stat"><div className="mini-stat-value">500+</div><div className="mini-stat-label">Guides</div></div>
                <div className="mini-stat"><div className="mini-stat-value">150+</div><div className="mini-stat-label">Countries</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST BLOG POSTS */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 className="section-title">Latest <span>Blog Posts</span></h2>
              <div className="section-divider" />
            </div>
            <div className="search-bar" style={{ marginBottom: 0 }}>
              <input
                type="search"
                placeholder="Search the blog..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="button">🔍</button>
            </div>
          </div>

          <div className="filter-tabs">
            {TABS.map(t => (
              <button key={t} className={`filter-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filtered.length === 0
                ? <p style={{ color: 'var(--text-muted)', padding: '32px 0' }}>No posts found.</p>
                : filtered.map((post, i) => (
                    <PostCard key={post.id} post={post} featured={i === 0 && tab === 'All' && !search} />
                  ))
              }
            </div>

            {/* SIDEBAR */}
            <aside>
              <div className="sidebar-widget" style={{ marginBottom: 20 }}>
                <div className="sidebar-widget-title">🔥 Popular Posts</div>
                {popular.map((p, i) => <PopularPostItem key={p.id} post={p} index={i} />)}
              </div>
              <div className="sidebar-widget">
                <div className="sidebar-widget-title">📩 Get Free AI Guide</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
                  Free step-by-step guide to earning $2,000+/month with AI.
                </p>
                <NewsletterInline compact />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="section-sm">
        <div className="container">
          <div className="newsletter-banner">
            <div className="newsletter-content">
              <div className="newsletter-title">Subscribe for <span>AI Money Tips!</span> 🚀</div>
              <div className="newsletter-sub">Join our community and get honest tips, strategies, and resources delivered to your inbox.</div>
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
