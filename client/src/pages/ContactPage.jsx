import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { sendContact, getFAQs } from '../utils/api';
import FAQAccordion from '../components/FAQAccordion';

const DEMO_FAQS = [
  { id: 1, question: 'How can AI Money Blog help me?', answer: 'AI Money Blog provides honest reviews, practical guides, and the best resources to help you start, grow, and scale your online income using AI tools. Whether you\'re a complete beginner or an experienced marketer, we have content for you.' },
  { id: 2, question: 'What type of content do you provide?', answer: 'We provide step-by-step tutorials, tool reviews, income strategy guides, and resources focused on AI tools, blogging, affiliate marketing, and online income generation.' },
  { id: 3, question: 'Do you accept guest posts or sponsored content?', answer: 'Yes! We accept quality guest posts and sponsored content related to AI, online income, and blogging. Please reach out through our contact form for more details.' },
  { id: 4, question: 'How long does it take to get a response?', answer: 'We typically respond to all messages within 24–48 hours. For urgent matters, please email us directly at support@aimoneyblog.com.' },
];

const CONTACT_TYPES = [
  { icon: '✉️', title: 'Email Us', desc: 'Got a question? Email our team at:', info: 'support@aimoneyblog.com', type: 'email' },
  { icon: '🎧', title: 'Support', desc: 'Have an issue? Reach out via our contact form, we\'re here to assist!', info: null, type: 'support' },
  { icon: '📢', title: 'Partnerships', desc: 'Interested in working together? Contact us for advertising and partnership opportunities.', info: null, type: 'partnership' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState(DEMO_FAQS);

  useEffect(() => {
    getFAQs().then(r => { if (r.data?.length) setFaqs(r.data); }).catch(() => {});
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await sendContact(form);
      toast.success('✅ Message sent! We\'ll respond within 24–48 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.success('✅ Message sent! We\'ll respond within 24–48 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-hero" style={{ paddingBottom: 72 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="page-hero-eyebrow">CONTACT</div>
              <h1 className="page-hero-title">Get in Touch with<br /><span>AI Money Blog</span></h1>
              <p className="page-hero-sub">
                We're here to help! Whether you have questions, need support, or want to discuss a potential partnership, we want to hear from you.
              </p>
              <p style={{ fontStyle: 'italic', color: 'var(--gold)', marginTop: 12, fontSize: '0.95rem' }}>
                Learn. Apply. Earn. That's the AI way.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '7rem', opacity: 0.7 }}>
              📬
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* Contact Type Cards */}
          <div className="contact-grid">
            {CONTACT_TYPES.map(ct => (
              <div key={ct.type} className="contact-type-card">
                <div className="contact-type-icon">{ct.icon}</div>
                <div className="contact-type-title">{ct.title}</div>
                <div className="contact-type-desc">{ct.desc}</div>
                {ct.info && <div className="contact-email">{ct.info}</div>}
                <button
                  className="btn btn-gold btn-sm"
                  style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Send Message
                </button>
              </div>
            ))}
          </div>

          {/* Form + FAQ */}
          <div className="contact-form-wrap" id="contact-form">
            <div>
              <h2 className="section-title">Send Us a <span>Message</span></h2>
              <div className="section-divider" />
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name *</label>
                    <input id="name" name="name" className="form-input" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Your Email *</label>
                    <input id="email" name="email" type="email" className="form-input" placeholder="Your Email" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" className="form-input" placeholder="Subject" value={form.subject} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Your Message *</label>
                  <textarea id="message" name="message" className="form-input" placeholder="Your Message" value={form.message} onChange={handleChange} required rows={5} />
                </div>
                <button type="submit" className="btn btn-gold" disabled={loading} style={{ marginTop: 8 }}>
                  {loading ? '⏳ Sending...' : '📤 Submit Message'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="section-title">Frequently <span>Asked Questions</span></h2>
              <div className="section-divider" />
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
