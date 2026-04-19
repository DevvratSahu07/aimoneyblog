import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const CATEGORY_EMOJIS = {
  'ai-tools': '🤖',
  'make-money': '💰',
  'blogging': '✍️',
  'courses': '🎓',
};

export function PostCard({ post, featured = false }) {
  const navigate = useNavigate();
  const emoji = CATEGORY_EMOJIS[post.category_slug] || '📝';
  const date = post.published_at
    ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true })
    : 'Recently';

  return (
    <article
      className={`card post-card${featured ? ' featured-post' : ''}`}
      onClick={() => navigate(`/blog/${post.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/blog/${post.slug}`)}
    >
      <div className="post-card-image">{emoji}</div>
      <div className="post-card-body">
        {post.is_featured && <span className="featured-tag">Featured</span>}
        {post.category_name && (
          <div className="post-card-category" style={{ color: post.category_color || 'var(--gold)' }}>
            {post.category_name}
          </div>
        )}
        <h3 className="post-card-title">{post.title}</h3>
        {post.excerpt && <p className="post-card-excerpt">{post.excerpt.substring(0, 120)}...</p>}
        <div className="post-card-meta">
          <span>📅 {date}</span>
          <span>⏱ {post.read_time || 5} min read</span>
          <span>👁 {(post.views || 0).toLocaleString()} views</span>
        </div>
        <button className="btn btn-gold btn-sm" style={{ marginTop: 12, width: 'fit-content' }}>
          Read More →
        </button>
      </div>
    </article>
  );
}

export function PopularPostItem({ post, index }) {
  const navigate = useNavigate();
  const date = post.published_at
    ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true })
    : '';
  return (
    <div className="popular-item" onClick={() => navigate(`/blog/${post.slug}`)} role="button" tabIndex={0}>
      <span className="popular-num">{index + 1}</span>
      <div>
        <div className="popular-title">{post.title}</div>
        <div className="popular-meta">{post.category_name} · {date}</div>
      </div>
    </div>
  );
}
