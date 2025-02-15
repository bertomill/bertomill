import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export default async function AdminButton() {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { session } } = await supabase.auth.getSession();
    const isAdmin = session?.user?.email === process.env.ALLOWED_EMAIL;

    if (!isAdmin) return null;

    return (
      <Link 
        href="/reading-list/admin"
        className="inline-block px-4 py-2 bg-[#2f2f2f] hover:bg-[#3f3f3f] text-sm font-mono text-[#e4e4e7] rounded-lg transition-colors"
      >
        + Add Book
      </Link>
    );
  } catch (error) {
    // Silently fail if Supabase is not configured
    console.error('Error in AdminButton:', error);
    return null;
  }
}
