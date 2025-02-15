#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupAdmin() {
  // Get admin email and password from command line arguments
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Usage: ./scripts/setup-admin.ts <email> <password>');
    process.exit(1);
  }

  try {
    // Create the admin user
    const { data: user, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Auto-confirm the email
    });

    if (createError) {
      throw createError;
    }

    console.log('✅ Admin user created successfully');

    // Set up RLS policies for the admin
    const { error: policyError } = await supabase.rpc('setup_admin_policies', {
      admin_email: email
    });

    if (policyError) {
      throw policyError;
    }

    console.log('✅ Admin policies set up successfully');
    
    // Update ALLOWED_EMAIL in .env.local
    const envPath = path.resolve(__dirname, '../.env.local');
    const envContent = await import('fs').then(fs => fs.readFileSync(envPath, 'utf8'));
    
    const updatedContent = envContent.includes('ALLOWED_EMAIL=')
      ? envContent.replace(/ALLOWED_EMAIL=.*/, `ALLOWED_EMAIL=${email}`)
      : `${envContent}\nALLOWED_EMAIL=${email}`;
    
    await import('fs').then(fs => fs.writeFileSync(envPath, updatedContent));
    
    console.log('✅ Environment variables updated');
    console.log('\n🎉 Admin setup complete! You can now log in at /login');

  } catch (error) {
    console.error('❌ Error setting up admin:', error.message);
    process.exit(1);
  }
}

setupAdmin();
