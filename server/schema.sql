-- AI Money Blog Database Schema
-- Run this file to initialize the database

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(20) DEFAULT 'reader' CHECK (role IN ('admin', 'author', 'reader')),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#f59e0b',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  read_time INTEGER DEFAULT 5,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS post_tags (
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE IF NOT EXISTS resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  logo_url TEXT,
  category VARCHAR(100),
  badge TEXT,
  earnings_claim VARCHAR(100),
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(is_featured);

-- Seed Data
INSERT INTO users (name, email, password_hash, role) VALUES
('AI Money Blog Team', 'admin@aimoneyblog.com', '$2b$10$placeholder', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO categories (name, slug, description, color) VALUES
('AI Tools', 'ai-tools', 'Best AI tools to make money online', '#f59e0b'),
('Make Money', 'make-money', 'Proven ways to earn money online', '#10b981'),
('Blogging', 'blogging', 'Start and grow a profitable blog', '#6366f1'),
('Courses', 'courses', 'Online courses and learning resources', '#ef4444')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (title, slug, excerpt, content, category_id, author_id, status, is_featured, views, read_time, published_at) VALUES
('7 Best AI Tools to Make Money Online in 2026 (Beginner Guide)',
 '7-best-ai-tools-make-money-online-2026',
 'If you want to earn money online but don''t know where to start, AI tools can help you. In today''s world, people are using AI tools to earn $100–$500 per day.',
 '## Introduction\n\nIf you want to earn money online but don''t know where to start, AI tools can help you. In today''s world people are using AI tools to earn $100–$500 per day.\n\nIn this article, we will show you the best AI tools that can help you generate high income by targeting the USA audience.\n\n## 1. Jasper AI\n\nJasper AI is the #1 AI writing assistant for creating blogs, social posts, and so much more. You can earn $500+/week with content creation.\n\n**How to Make Money with Jasper AI:**\n- **Blog Writing** – Write blog posts quickly and easily, start your own niche blog, or offer blog writing services.\n- **Freelancing** – Offer content writing services on platforms like Upwork or Fiverr using Jasper to get the job done faster.\n- **Affiliate Marketing** – Create content for promoting affiliate products.\n\n## 2. Canva\n\nCanva lets you create stunning designs for Pinterest, Instagram, and more. Earn passive income by boosting viral pins and online graphics.\n\n## 3. Surfer SEO\n\nSurfer SEO helps you optimize content for Google and earn $100–$500/month through SEO optimization and AI writing tools.\n\n## Pro Tips for Start Your AI Income Journey\n\n- **Start with one tool:** Focus on one AI tool at a time to master it.\n- **Be consistent:** Consistency is key to building online income.\n- **Track results:** Monitor your progress and adjust strategies.',
 1, 1, 'published', true, 4820, 8, NOW() - INTERVAL '9 days'),

('How to Earn $500+ Per Day with AI Tools',
 'how-to-earn-500-per-day-ai-tools',
 'Learn the exact steps to earn from Pinterest using AI in 2024. Discover the strategies that are working right now.',
 '## How to Earn $500+ Per Day with AI Tools\n\nEarning $500+ per day online is achievable when you combine the right AI tools with proven strategies. Here''s how to get started.\n\n## Step 1: Choose Your Income Method\n\nThere are several ways to earn with AI tools:\n- Affiliate marketing\n- Freelance writing\n- Digital products\n- YouTube content\n\n## Step 2: Pick Your Tools\n\nThe best tools for beginners:\n1. Jasper AI for content creation\n2. Canva for design\n3. VidIQ for YouTube growth\n\n## Step 3: Scale Your Income\n\nOnce you find what works, double down and scale up your efforts.',
 2, 1, 'published', false, 3120, 6, NOW() - INTERVAL '7 days'),

('How to Create a Profitable AI-Powered Blog',
 'how-to-create-profitable-ai-powered-blog',
 'Discover the top AI tools to boost viral content in Pinterest in 2024. A complete step-by-step guide.',
 '## How to Create a Profitable AI-Powered Blog\n\nStarting a blog with AI assistance has never been easier or more profitable. Here''s your complete guide.\n\n## Choose Your Niche\n\nPick a profitable niche:\n- Personal finance\n- Online income\n- AI and technology\n- Health and wellness\n\n## Set Up Your Blog\n\n1. Get hosting from a reliable provider\n2. Install WordPress\n3. Choose a fast theme\n4. Install essential plugins\n\n## Use AI to Create Content\n\nJasper AI can help you create high-quality blog posts in minutes.',
 3, 1, 'published', false, 2890, 7, NOW() - INTERVAL '5 days'),

('Best AI Tools for YouTube & Video Creators',
 'best-ai-tools-youtube-video-creators',
 'Learn the exact steps to design viral pins using Canva and grow your YouTube channel with AI.',
 '## Best AI Tools for YouTube & Video Creators\n\nYouTube is one of the best platforms to earn passive income. These AI tools will help you grow faster.\n\n## VidIQ\n\nVidIQ is the best tool for YouTube income. Boost more views and income with its tools and AI analysis.\n\n## Pictory AI\n\nTurn blog posts into videos automatically. Great for repurposing content.\n\n## Canva\n\nCreate stunning YouTube thumbnails that get more clicks.',
 1, 1, 'published', false, 1560, 5, NOW() - INTERVAL '3 days'),

('How to Make Money on Pinterest with AI',
 'how-to-make-money-pinterest-ai',
 'Learn the exact steps to earn from Pinterest using AI in 2024.',
 '## How to Make Money on Pinterest with AI\n\nPinterest is an often overlooked goldmine for affiliate marketers. Here''s how to leverage AI to maximize your Pinterest income.\n\n## Create Viral Pins\n\nUse Canva to create beautiful, click-worthy pins that drive traffic to your blog or affiliate offers.\n\n## Use AI for Keyword Research\n\nFind the keywords your audience is searching for on Pinterest.\n\n## Scale with Scheduling Tools\n\nUse Tailwind to schedule pins and maintain consistent posting.',
 2, 1, 'published', false, 2100, 6, NOW() - INTERVAL '2 days'),

('AI-Driven Social Media Strategies for Income',
 'ai-driven-social-media-strategies-income',
 'Learn strategies to use AI to create your brand presence with AI-driven social media.',
 '## AI-Driven Social Media Strategies for Income\n\nSocial media is one of the fastest ways to build an audience and generate income online.\n\n## ManyChat for Automation\n\nManyChat is 100% free and lets you automate your messages to increase your income through Instagram and Facebook.\n\n## Content Strategy with AI\n\nUse Jasper AI to create a month''s worth of social media content in just a few hours.',
 1, 1, 'published', false, 980, 4, NOW() - INTERVAL '1 day')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO resources (name, description, url, category, badge, earnings_claim, is_featured, sort_order) VALUES
('Jasper', 'The #1 AI writing assistant for creating blogs, social posts, and so much more!', 'https://jasper.ai', 'AI Tools', '$500+/Week', 'Earn $500+/Week With Content Creation', true, 1),
('Alitsan', 'Generate passive income with custom-built, AI-powered ecom/stores that generate $1,000+/week!', '#', 'Make Money', '$1,000/D+', 'Easy AI Stores That Generate $1,000/D+ Week', true, 2),
('Surfer', 'SEO optimization and AI writing tools.', 'https://surferseo.com', 'AI Tools', '$100–$500/Mo', 'Earn $100–$500/Mo', false, 3),
('Canva', 'Boost viral pins, online graphics and promotional tools.', 'https://canva.com', 'AI Tools', 'Passive Income', 'Earn Passive Income', false, 4),
('VidIQ', 'Boost more views and income with tools and AI analysis.', 'https://vidiq.com', 'AI Tools', 'YouTube Income', 'Best for YouTube Income', false, 5),
('ManyChat', 'Automate messages to increase your income through Instagram and Facebook.', 'https://manychat.com', 'Make Money', '100% FREE', 'Automate messages & increase income', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO faqs (question, answer, sort_order) VALUES
('How can AI Money Blog help me?', 'AI Money Blog provides honest reviews, practical guides, and the best resources to help you start, grow, and scale your online income using AI tools. Whether you''re a complete beginner or an experienced marketer, we have content for you.', 1),
('What type of content do you provide?', 'We provide step-by-step tutorials, tool reviews, income strategy guides, and resources focused on AI tools, blogging, affiliate marketing, and online income generation.', 2),
('Do you accept guest posts or sponsored content?', 'Yes! We accept quality guest posts and sponsored content related to AI, online income, and blogging. Please reach out through our contact form for more details.', 3),
('How long does it take to get a response?', 'We typically respond to all messages within 24–48 hours. For urgent matters, please email us directly at support@aimoneyblog.com.', 4);
