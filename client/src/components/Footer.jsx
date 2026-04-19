import { Link } from 'react-router-dom';
import NewsletterInline from './NewsletterInline';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Guides', to: '/blog?category=blogging' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const CATEGORIES = [
  { label: 'AI Tools', to: '/blog?category=ai-tools' },
  { label: 'Make Money', to: '/blog?category=make-money' },
  { label: 'Blogging', to: '/blog?category=blogging' },
  { label: 'Courses', to: '/blog?category=courses' },
];

const SOCIAL = [
  { icon: 'f', label: 'Facebook', href: '#' },
  { icon: '𝕏', label: 'Twitter', href: '#' },
  { icon: '◉', label: 'Instagram', href: '#' },
  { icon: '▶', label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">AI <span>MONEY BLOG</span></div>
            <p className="footer-tagline">
              Helping people in the USA make money online with AI.<br />
              Learn. Apply. Earn. That's the AI way.
            </p>
            <div className="footer-social">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} className="social-link" aria-label={s.label} rel="noopener noreferrer" target="_blank">{s.icon}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              {QUICK_LINKS.map(l => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Categories</div>
            <ul className="footer-links">
              {CATEGORIES.map(c => (
                <li key={c.to}><Link to={c.to}>{c.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Get Free AI Guide</div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.5 }}>
              Step-by-step guide to earning $2,000+/month online.
            </p>
            <NewsletterInline compact />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 AI Money Blog – All Rights Reserved.</span>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#disclaimer">Disclaimer</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
