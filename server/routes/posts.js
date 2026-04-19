const express = require('express');
const router = express.Router();
const { query, isDatabaseConnectionError } = require('../db');

// GET all published posts with pagination and filters
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, featured } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const params = [];
    let whereClause = "WHERE p.status = 'published'";

    if (category) {
      params.push(category);
      whereClause += ` AND c.slug = $${params.length}`;
    }
    if (featured === 'true') {
      whereClause += ` AND p.is_featured = true`;
    }
    if (search) {
      params.push(`%${search}%`);
      whereClause += ` AND (p.title ILIKE $${params.length} OR p.excerpt ILIKE $${params.length})`;
    }

    const countResult = await query(
      `SELECT COUNT(*) FROM posts p LEFT JOIN categories c ON p.category_id = c.id ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    params.push(parseInt(limit), offset);
    const result = await query(
      `SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image, p.views, p.read_time,
              p.is_featured, p.published_at, p.created_at,
              c.name as category_name, c.slug as category_slug, c.color as category_color,
              u.name as author_name
       FROM posts p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN users u ON p.author_id = u.id
       ${whereClause}
       ORDER BY p.published_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );

    res.json({
      posts: result.rows,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET popular posts
router.get('/popular', async (req, res) => {
  try {
    const result = await query(
      `SELECT p.id, p.title, p.slug, p.featured_image, p.views, p.published_at,
              c.name as category_name, c.slug as category_slug, c.color as category_color
       FROM posts p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.status = 'published'
       ORDER BY p.views DESC LIMIT 4`
    );
    res.json(result.rows);
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const result = await query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug, c.color as category_color,
              u.name as author_name, u.avatar_url as author_avatar
       FROM posts p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN users u ON p.author_id = u.id
       WHERE p.slug = $1 AND p.status = 'published'`,
      [req.params.slug]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });

    // Increment views
    await query('UPDATE posts SET views = views + 1 WHERE id = $1', [result.rows[0].id]);

    // Get related posts
    const related = await query(
      `SELECT p.id, p.title, p.slug, p.featured_image, p.published_at, p.read_time,
              c.name as category_name, c.slug as category_slug
       FROM posts p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.status = 'published' AND p.id != $1
         AND (p.category_id = $2)
       ORDER BY p.published_at DESC LIMIT 3`,
      [result.rows[0].id, result.rows[0].category_id]
    );

    res.json({ post: result.rows[0], related: related.rows });
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      return res.status(503).json({ error: 'Database unavailable. Please try again shortly.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
