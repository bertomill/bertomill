-- First, let's verify your user account exists:
SELECT id,
    email,
    name,
    "isAdmin"
FROM "User"
WHERE email IS NOT NULL;
-- Then we'll make your account an admin:
-- UPDATE "User" SET "isAdmin" = true WHERE email = 'your-github-email@example.com'; 
-- Make Berto's account an admin
UPDATE "User"
SET "isAdmin" = true
WHERE email = 'bertmill19@gmail.com';
-- Verify the change
SELECT id,
    email,
    name,
    "isAdmin"
FROM "User"
WHERE email = 'bertmill19@gmail.com';