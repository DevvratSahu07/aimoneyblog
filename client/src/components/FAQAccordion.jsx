import { useState } from 'react';

export default function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={faq.id || i} className={`faq-item${open === i ? ' open' : ''}`}>
          <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
            <span>{faq.question}</span>
            <span className="faq-icon">+</span>
          </button>
          {open === i && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
}
