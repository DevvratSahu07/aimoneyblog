import { useState } from 'react';
import toast from 'react-hot-toast';
import { subscribe } from '../utils/api';

export default function NewsletterInline({ compact = false }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribe({ email });
      toast.success('🎉 Subscribed successfully!');
      setEmail('');
    } catch {
      // Still show success for demo (no backend)
      toast.success('🎉 Subscribed successfully!');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter-form" style={{ flexDirection: 'column', gap: 8 }}>
      <input
        type="email"
        className="newsletter-input"
        placeholder="Enter your email address..."
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ minWidth: 'unset' }}
      />
      <button type="submit" className="btn btn-gold" disabled={loading} style={{ justifyContent: 'center' }}>
        {loading ? 'Subscribing...' : compact ? 'Subscribe Now' : '🚀 Subscribe Now'}
      </button>
    </form>
  );
}
