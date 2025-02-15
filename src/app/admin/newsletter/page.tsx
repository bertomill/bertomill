import { Metadata } from 'next';
import NewsletterForm from './NewsletterForm';

export const metadata: Metadata = {
  title: 'Newsletter Admin | Berto Mill',
  description: 'Newsletter management interface',
};

export default function NewsletterAdmin() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Newsletter Management</h1>
      <NewsletterForm />
    </div>
  );
}
