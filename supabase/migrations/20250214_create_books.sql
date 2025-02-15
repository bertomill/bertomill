-- Create books table
create table if not exists public.books (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    author text not null,
    year_read integer not null,
    rating integer not null check (rating >= 1 and rating <= 5),
    review text,
    tags text[] default '{}',
    color text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS
alter table public.books enable row level security;

-- Admin can do everything
create policy "Admins can do everything on books"
on public.books
for all
to authenticated
using (auth.jwt() ->> 'email' = current_setting('app.admin_email', true))
with check (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Everyone can read books
create policy "Anyone can read books"
on public.books
for select
to public
using (true);

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for updated_at
create trigger handle_books_updated_at
  before update on public.books
  for each row
  execute procedure public.handle_updated_at();
