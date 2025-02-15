-- Clear existing data
TRUNCATE TABLE books;

-- Seed books
INSERT INTO books (title, author, year_read, rating, review, tags, color, created_at, updated_at)
VALUES
  (
    'The Pragmatic Programmer',
    'David Thomas, Andrew Hunt',
    2024,
    5,
    'A classic that has aged remarkably well. The principles about DRY, orthogonality, and tracer bullets are timeless.',
    ARRAY['programming', 'software engineering', 'career'],
    'bg-[#2a4858]',
    NOW(),
    NOW()
  ),
  (
    'Designing Data-Intensive Applications',
    'Martin Kleppmann',
    2023,
    5,
    'Deep dive into distributed systems. Changed how I think about data consistency and system architecture.',
    ARRAY['distributed systems', 'databases', 'architecture'],
    'bg-[#8b4513]',
    NOW(),
    NOW()
  ),
  (
    'Project Hail Mary',
    'Andy Weir',
    2023,
    4,
    'Fascinating hard sci-fi with a great balance of scientific detail and engaging storytelling.',
    ARRAY['science fiction', 'space', 'physics'],
    'bg-[#556b2f]',
    NOW(),
    NOW()
  ),
  (
    'The Manager''s Path',
    'Camille Fournier',
    2023,
    5,
    'Excellent roadmap for engineering leadership, from tech lead to CTO.',
    ARRAY['leadership', 'career', 'management'],
    'bg-[#800020]',
    NOW(),
    NOW()
  ),
  (
    'Building a Second Brain',
    'Tiago Forte',
    2024,
    4,
    'Practical system for organizing digital information and turning it into creative output.',
    ARRAY['productivity', 'knowledge management', 'creativity'],
    'bg-[#4a4a4a]',
    NOW(),
    NOW()
  );
