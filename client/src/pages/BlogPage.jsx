import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPosts, getPopularPosts, getCategories } from '../utils/api';
import { PostCard, PopularPostItem } from '../components/PostCard';
import NewsletterInline from '../components/NewsletterInline';

const DEMO_POSTS = [
  { id: 1, title: '7 Best AI Tools to Make Money Online in 2026', slug: '7-best-ai-tools-make-money-online-2026', excerpt: 'AI tools can help you earn $100–$500 per day. Discover the top beginner-friendly tools.', category_name: 'AI Tools', category_slug: 'ai-tools', category_color: '#f59e0b', is_featured: true, views: 4820, read_time: 8, published_at: new Date(Date.now() - 9 * 86400000) },
  { id: 2, title: 'How to Earn $500+ Per Day with AI Tools', slug: 'how-to-earn-500-per-day-ai-tools', excerpt: 'Learn the exact steps to earn from Pinterest using AI strategies that are working right now.', category_name: 'Make Money', category_slug: 'make-money', category_color: '#10b981', is_featured: false, views: 3120, read_time: 6, published_at: new Date(Date.now() - 7 * 86400000) },
  { id: 3, title: 'How to Create a Profitable AI-Powered Blog', slug: 'how-to-create-profitable-ai-powered-blog', excerpt: 'Discover the top AI tools to boost viral content and build a profitable blog.', category_name: 'Blogging', category_slug: 'blogging', category_color: '#6366f1', is_featured: false, views: 2890, read_time: 7, published_at: new Date(Date.now() - 5 * 86400000) },
  { id: 4, title: 'Best AI Tools for YouTube & Video Creators', slug: 'best-ai-tools-youtube-video-creators', excerpt: 'Grow your YouTube channel with AI and earn passive income from video content.', category_name: 'AI Tools', category_slug: 'ai-tools', category_color: '#f59e0b', is_featured: false, views: 1560, read_time: 5, published_at: new Date(Date.now() - 3 * 86400000) },
  { id: 5, title: 'How to Make Money on Pinterest with AI', slug: 'how-to-make-money-pinterest-ai', excerpt: 'Pinterest is a goldmine for affiliate marketers. Leverage AI for maximum income.', category_name: 'Make Money', category_slug: 'make-money', category_color: '#10b981', is_featured: false, views: 2100, read_time: 6, published_at: new Date(Date.now() - 2 * 86400000) },
  { id: 6, title: 'AI-Driven Social Media Strategies for Income', slug: 'ai-driven-social-media-strategies-income', excerpt: 'Social media is one of the fastest ways to build an audience and generate income.', category_name: 'AI Tools', category_slug: 'ai-tools', category_color: '#f59e0b', is_featured: false, views: 980, read_time: 4, published_at: new Date(Date.now() - 86400000) },
];

const DEMO_CATS = [
  { id: 1, name: 'AI Tools', slug: 'ai-tools', color: '#f59e0b', post_count: 3 },
  { id: 2, name: 'Make Money', slug: 'make-money', color: '#10b981', post_count: 2 },
  { id: 3, name: 'Blogging', slug: 'blogging', color: '#6366f1', post_count: 1 },
  { id: 4, name: 'Courses', slug: 'courses', color: '#ef4444', post_count: 0 },
];

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [popular, setPopular] = useState(DEMO_POSTS.slice().sort((a,b)=>b.views-a.views).slice(0,4));
  const [categories, setCategories] = useState(DEMO_CATS);
  const [search, setSearch] = useState('');
  const activeCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    getCategories().then(r => setCategories(r.data)).catch(() => {});
    getPopularPosts().then(r => { if (r.data?.length) setPopular(r.data); }).catch(() => {});
  }, []);

  useEffect(() => {
    getPosts({ category: activeCategory !== 'all' ? activeCategory : undefined, search: search || undefined })
      .then(r => { if (r.data.posts?.length) setPosts(r.data.posts); })
      .catch(() => {
        const filtered = DEMO_POSTS.filter(p => {
          const catMatch = activeCategory === 'all' || p.category_slug === activeCategory;
          const searchMatch = !search || p.title.toLowerCase().includes(search.toLowerCase());
          return catMatch && searchMatch;
        });
        setPosts(filtered);
      });
  }, [activeCategory, search]);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-eyebrow">AI MONEY BLOG</div>
          <h1 className="page-hero-title"><span>Best Resources</span> to Make Money Online</h1>
          <p className="page-hero-sub">Recommended AI tools, software, and strategies to maximize your online income.</p>
          <div className="search-bar" style={{ marginTop: 20, maxWidth: 480 }}>
            <input
              type="search"
              placeholder="Search the blog..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="button">🔍</button>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 32, alignItems: 'start' }}>
            <div>
              <div className="filter-tabs">
                <button className={`filter-tab${activeCategory === 'all' ? ' active' : ''}`} onClick={() => setSearchParams({})}>
                  All
                </button>
                {categories.map(c => (
                  <button
                    key={c.slug}
                    className={`filter-tab${activeCategory === c.slug ? ' active' : ''}`}
                    onClick={() => setSearchParams({ category: c.slug })}
                  >
                    {c.name}
                    {c.post_count > 0 && <span style={{ opacity: 0.6, marginLeft: 4, fontSize: '0.75rem' }}>({c.post_count})</span>}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {posts.length === 0
                  ? <div style={{ padding: '40px 0', color: 'var(--text-muted)', textAlign: 'center' }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                      <p>No posts found. Try a different search or category.</p>
                    </div>
                  : posts.map(p => <PostCard key={p.id} post={p} />)
                }
              </div>
            </div>

            <aside>
              <div className="sidebar-widget" style={{ marginBottom: 20 }}>
                <div className="sidebar-widget-title">🔥 Popular Posts</div>
                {popular.map((p, i) => <PopularPostItem key={p.id} post={p} index={i} />)}
              </div>

              <div className="sidebar-widget" style={{ marginBottom: 20 }}>
                <div className="sidebar-widget-title">📂 Categories</div>
                {categories.map(c => (
                  <button
                    key={c.slug}
                    onClick={() => setSearchParams(c.slug === activeCategory ? {} : { category: c.slug })}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      width: '100%', padding: '8px 0', background: 'none', border: 'none',
                      borderBottom: '1px solid var(--border)',
                      color: activeCategory === c.slug ? c.color : 'var(--text-secondary)',
                      fontSize: '0.88rem', cursor: 'pointer', transition: 'color 0.2s',
                    }}
                  >
                    <span>{c.name}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{c.post_count}</span>
                  </button>
                ))}
              </div>

              <div className="sidebar-widget" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(10,17,40,0.8))', border: '1px solid var(--gold)' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  📩 Get Free AI Guide
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
                  Step-by-step guide to earning $2,000+/month online.
                </p>
                <NewsletterInline compact />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
