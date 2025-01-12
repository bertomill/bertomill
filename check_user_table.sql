-- Check User table structure
SELECT column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
    AND table_name = 'User'
ORDER BY ordinal_position;
-- If isAdmin doesn't exist, here's how to add it:
-- ALTER TABLE "User" ADD COLUMN "isAdmin" BOOLEAN NOT NULL DEFAULT false;
-- And here's how to make yourself an admin (after you sign in):
-- UPDATE "User" SET "isAdmin" = true WHERE email = 'your-github-email@example.com';