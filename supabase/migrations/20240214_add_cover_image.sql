-- Add cover_image column to books table
ALTER TABLE books ADD COLUMN IF NOT EXISTS cover_image TEXT;
