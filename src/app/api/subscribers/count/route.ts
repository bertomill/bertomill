import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    if (error) {
      console.error('Error fetching subscriber count:', error);
      // Return 0 instead of error for missing table
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error('Error in subscriber count:', error);
    return NextResponse.json({ count: 0 });
  }
}
