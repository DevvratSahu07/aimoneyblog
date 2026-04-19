import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDistanceToNow, format } from 'date-fns';
import { getPost } from '../utils/api';
import { PostCard } from '../components/PostCard';
import NewsletterInline from '../components/NewsletterInline';

const DEMO_POSTS = {
  '7-best-ai-tools-make-money-online-2026': {
    id: 1, title: '7 Best AI Tools to Make Money Online in 2026 (Beginner Guide)',
    slug: '7-best-ai-tools-make-money-online-2026',
    excerpt: 'If you want to earn money online but don\'t know where to start, AI tools can help.',
    content: `## Introduction\n\nIf you want to earn money online but don't know where to start, AI tools can help you. In today's world people are using AI tools to earn **$100–$500 per day**.\n\nIn this article, we will show you the best AI tools that can help you generate high income.\n\n## By the end of this article, you'll discover:\n\n- Top AI tools for beginners\n- How these tools can boost your online income to $100+ per day\n- Recommended tools you can start using today\n\n## 1. Jasper AI\n\nJasper AI is the #1 AI writing assistant for creating blogs, social posts, and so much more. You can earn **$500+/week** with content creation.\n\n**How to Make Money with Jasper AI:**\n\n- **Blog Writing** – Write blog posts quickly and easily, start your own niche blog, or offer blog writing services.\n- **Freelancing** – Offer content writing services on platforms like Upwork or Fiverr.\n- **Affiliate Marketing** – Create content for promoting affiliate products.\n\n## 2. Canva\n\nCanva lets you create stunning designs for Pinterest, Instagram, and more. Earn passive income by boosting viral pins and online graphics.\n\n**Income potential:** $50–$200/month\n\n## 3. Surfer SEO\n\nSurfer SEO helps you optimize content for Google and earn $100–$500/month through SEO optimization and AI writing tools.\n\n## 4. VidIQ\n\nVidIQ is the best tool for YouTube income. Boost more views and income with its tools and AI analysis.\n\n## 5. ManyChat\n\nManyChat is 100% FREE. Automate messages to increase your income through Instagram and Facebook.\n\n## Pro Tips for Starting Your AI Income Journey\n\n- **Start with one tool:** Focus on one AI tool at a time to master it.\n- **Be consistent:** Consistency is key to building online income.\n- **Track results:** Monitor your progress and adjust your strategies.\n- **Reinvest profits:** Use early earnings to invest in better tools.\n\n## Conclusion\n\nAI tools have made it easier than ever to earn money online. The key is to pick one method, master it, and then scale up. Start with Jasper AI or Canva today and see the results for yourself!`,
    category_name: 'AI Tools', category_slug: 'ai-tools', category_color: '#f59e0b',
    author_name: 'AI Money Blog Team', views: 4820, read_time: 8,
    published_at: new Date(Date.now() - 9 * 86400000)
  },
};

const DEMO_RELATED = [
  { id: 2, title: 'How to Earn $500+ Per Day with AI Tools', slug: 'how-to-earn-500-per-day-ai-tools', excerpt: 'Learn the exact steps to earn from Pinterest using AI.', category_name: 'Make Money', category_slug: 'make-money', category_color: '#10b981', views: 3120, read_time: 6, published_at: new Date(Date.now() - 7 * 86400000) },
  { id: 3, title: 'How to Create a Profitable AI-Powered Blog', slug: 'how-to-create-profitable-ai-powered-blog', excerpt: 'Discover the top AI tools to boost viral content.', category_name: 'Blogging', category_slug: 'blogging', category_color: '#6366f1', views: 2890, read_time: 7, published_at: new Date(Date.now() - 5 * 86400000) },
];

export default function PostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState(DEMO_RELATED);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    getPost(slug)
      .then(r => { setPost(r.data.post); setRelated(r.data.related || []); })
      .catch(() => {
        setPost(DEMO_POSTS[slug] || null);
        setRelated(DEMO_RELATED);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{ padding: '80px 0', textAlign: 'center' }}><div className="spinner" /></div>;
  if (!post) return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
      <h2 style={{ marginBottom: 12 }}>Post not found</h2>
      <Link to="/blog" className="btn btn-gold">← Back to Blog</Link>
    </div>
  );

  const dateStr = post.published_at ? format(new Date(post.published_at), 'MMMM d, yyyy') : 'Recently';

  return (
    <>
      <div className="post-hero">
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 20 }}>
            <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <span>›</span>
            <Link to="/blog" style={{ color: 'var(--text-muted)' }}>Blog</Link>
            <span>›</span>
            <span style={{ color: 'var(--gold)' }}>{post.category_name}</span>
          </div>
          <div style={{ maxWidth: 780 }}>
            <div className="post-card-category" style={{ color: post.category_color, marginBottom: 12 }}>
              {post.category_name}
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <span>✍️ {post.author_name || 'AI Money Blog Team'}</span>
              <span>📅 {dateStr}</span>
              <span>⏱ {post.read_time} min read</span>
              <span>👁 {(post.views || 0).toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 64 }}>
        <div className="post-layout">
          <main>
            {post.excerpt && (
              <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius)', padding: '16px 20px', marginBottom: 28, fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {post.excerpt}
              </div>
            )}
            <div className="post-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags / share */}
            <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['AI Tools', 'Make Money', 'Blogging'].map(tag => (
                  <span key={tag} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 100, padding: '3px 12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    #{tag.replace(' ', '')}
                  </span>
                ))}
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => { navigator.clipboard?.writeText(window.location.href); }}>
                🔗 Share
              </button>
            </div>
          </main>

          <aside className="post-sidebar">
            <div className="sidebar-widget">
              <div className="sidebar-widget-title">📩 Get Free AI Guide</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
                Step-by-step guide to earning $2,000+/month online. No spam, unsubscribe anytime.
              </p>
              <NewsletterInline compact />
            </div>

            <div className="sidebar-widget" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(10,17,40,0.9))', border: '1px solid var(--gold)' }}>
              <div className="sidebar-widget-title">🚀 Start AI Journey Today</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
                Try Jasper AI — The #1 tool for content creators.
              </p>
              <a href="https://jasper.ai" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                Try Jasper AI →
              </a>
            </div>

            <div className="sidebar-widget">
              <div className="sidebar-widget-title">📊 Comparison Table</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ color: 'var(--gold)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '6px 0', textAlign: 'left' }}>Tool</th>
                    <th style={{ padding: '6px 0', textAlign: 'left' }}>Use</th>
                    <th style={{ padding: '6px 0', textAlign: 'left' }}>Income</th>
                  </tr>
                </thead>
                <tbody>
                  {[['Jasper','Writing','$100–$300'],['Canva','Design','$50–$200'],['Pictory','Video','$100–$300']].map(([t,u,i]) => (
                    <tr key={t} style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                      <td style={{ padding: '6px 0', fontWeight: 600, color: 'var(--text-primary)' }}>{t}</td>
                      <td style={{ padding: '6px 0' }}>{u}</td>
                      <td style={{ padding: '6px 0', color: 'var(--gold)' }}>{i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h3 className="section-title" style={{ marginBottom: 8 }}>Related <span>Articles</span></h3>
            <div className="section-divider" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {related.map(p => <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
