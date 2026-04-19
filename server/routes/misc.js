const express = require('express');
const router = express.Router();
const { query, isDatabaseConnectionError } = require('../db');

// GET all categories
router.get('/categories', async (req, res) => {
  try {
    const result = await query(
      `SELECT c.*, COUNT(p.id)::int as post_count
       FROM categories c
       LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published'
       GROUP BY c.id ORDER BY c.name`
    );
    res.json(result.rows);
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all resources
router.get('/resources', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM resources';
    const params = [];
    if (category && category !== 'all') {
      params.push(category);
      sql += ` WHERE LOWER(category) = LOWER($1)`;
    }
    sql += ' ORDER BY sort_order ASC';
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// POST subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    await query(
      `INSERT INTO subscribers (email, name) VALUES ($1, $2)
       ON CONFLICT (email) DO UPDATE SET is_active = true`,
      [email.toLowerCase(), name || null]
    );
    res.json({ success: true, message: 'Successfully subscribed!' });
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// POST contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    await query(
      'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject || '', message]
    );
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET FAQs
router.get('/faqs', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM faqs WHERE is_active = true ORDER BY sort_order ASC'
    );
    res.json(result.rows);
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET stats for about page
router.get('/stats', async (req, res) => {
  try {
    const posts = await query("SELECT COUNT(*) FROM posts WHERE status='published'");
    const subscribers = await query("SELECT COUNT(*) FROM subscribers WHERE is_active=true");
    res.json({
      monthly_readers: '25,000+',
      countries_reached: '150+',
      guides_resources: posts.rows[0].count + '+ Articles',
      commitment: '100%'
    });
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
