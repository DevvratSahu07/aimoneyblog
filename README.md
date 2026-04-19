# 🤖 AI Money Blog — PERN Stack

A full-stack blogging website built with **PostgreSQL, Express, React, Node.js** — styled with a dark space/galaxy theme and gold accents, matching the design screenshots.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, React Markdown |
| Backend | Node.js, Express 4 |
| Database | PostgreSQL |
| Styling | Pure CSS (custom, no UI framework) |
| Auth | JWT (bcryptjs) |
| Performance | compression, helmet, rate-limiting, lazy loading |

---

## 📁 Project Structure

```
ai-money-blog/
├── server/                  # Express API
│   ├── routes/
│   │   ├── posts.js         # Blog post CRUD routes
│   │   └── misc.js          # Categories, resources, subscribe, contact, FAQs
│   ├── db.js                # PostgreSQL pool connection
│   ├── index.js             # Express app entry point
│   ├── schema.sql           # Database schema + seed data
│   └── .env.example
│
└── client/                  # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── PostCard.jsx
    │   │   ├── FAQAccordion.jsx
    │   │   └── NewsletterInline.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx      # Hero, blog feed, popular sidebar
    │   │   ├── BlogPage.jsx      # Blog listing with filters + search
    │   │   ├── PostPage.jsx      # Single post with markdown rendering
    │   │   ├── ResourcesPage.jsx # Tool resource cards
    │   │   ├── AboutPage.jsx     # Mission, story, values, stats
    │   │   └── ContactPage.jsx   # Contact form + FAQ accordion
    │   ├── utils/api.js          # Axios API calls
    │   ├── App.jsx               # Router + layout
    │   ├── index.js
    │   └── index.css             # Global CSS with design system
    └── public/index.html
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### 1. Clone & Install

```bash
git clone <your-repo>
cd ai-money-blog
npm run install-all
```

### 2. Set Up Database

```bash
# Create PostgreSQL database
createdb ai_money_blog

# Run schema (creates tables + seeds demo data)
psql -d ai_money_blog -f server/schema.sql
```

### 3. Configure Environment

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/ai_money_blog
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Run Development

```bash
# Run both frontend + backend concurrently
npm run dev

# Or separately:
npm run start:server   # API on http://localhost:5000
npm run start:client   # React on http://localhost:3000
```

---

## 🗄️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get paginated posts (supports `?page`, `?limit`, `?category`, `?search`, `?featured`) |
| GET | `/api/posts/popular` | Get top 4 most-viewed posts |
| GET | `/api/posts/:slug` | Get single post + related posts |
| GET | `/api/categories` | Get all categories with post counts |
| GET | `/api/resources` | Get all resources (supports `?category`) |
| GET | `/api/faqs` | Get all FAQs |
| GET | `/api/stats` | Get site stats |
| POST | `/api/subscribe` | Subscribe to newsletter `{ email, name? }` |
| POST | `/api/contact` | Send contact message `{ name, email, subject, message }` |

---

## 🎨 Design System

All colors and spacing defined as CSS variables in `client/src/index.css`:

```css
--bg-deep: #02040e       /* Deep space background */
--gold: #f59e0b          /* Primary accent */
--gold-bright: #fbbf24
--cyan: #38bdf8          /* Secondary accent */
--font-display: 'Rajdhani'
--font-body: 'Exo 2'
--font-mono: 'Space Mono'
```

---

## 📱 Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, blog feed, popular sidebar, newsletter |
| `/blog` | Blog listing — Category filters, search, pagination |
| `/blog/:slug` | Post — Markdown content, sidebar, related posts |
| `/resources` | Resources — Tool cards with affiliate links |
| `/about` | About — Mission, story, values, trust signals |
| `/contact` | Contact — Form, FAQ accordion |

---

## 🔧 Performance Optimizations

- **Code splitting** — React lazy/Suspense for all pages
- **PostgreSQL indexes** — On slug, status, category, published_at
- **Rate limiting** — 100 req/15min globally, 5/hour for forms
- **HTTP compression** — gzip via `compression` middleware
- **Helmet** — Security headers
- **Connection pooling** — pg Pool with max 20 connections
- **Demo fallback data** — Works fully without a database connected

---

## 🏗️ Production Deployment

```bash
# Build React frontend
npm run build

# Serve with Express (add static serving to server/index.js)
NODE_ENV=production npm run start:server
```

For production, set `DATABASE_URL` to your hosted PostgreSQL (e.g. Supabase, Neon, Railway) and deploy to Render, Railway, or any Node host.

---

## 📝 License

MIT — Free to use and modify.
