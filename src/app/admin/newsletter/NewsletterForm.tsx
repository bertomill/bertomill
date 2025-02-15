'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsletterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [testMode, setTestMode] = useState(true);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    testEmail: '',
  });

  useEffect(() => {
    // Fetch subscriber count
    fetch('/api/subscribers/count')
      .then(res => res.json())
      .then(data => setSubscriberCount(data.count))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        subject: formData.subject,
        content: formData.content,
        ...(testMode && { testEmail: formData.testEmail }),
      };

      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send newsletter');
      }

      const result = await response.json();
      
      alert(testMode 
        ? `Test email sent to ${formData.testEmail}!` 
        : `Newsletter sent to ${subscriberCount} subscriber${subscriberCount === 1 ? '' : 's'}!`
      );
      
      if (!testMode) {
        setFormData({ subject: '', content: '', testEmail: '' });
      }
    } catch (error) {
      alert('Error sending newsletter: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#a1a1aa] mb-1">
          Subject Line
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-[#1f1f1f] border border-[#2f2f2f] rounded-md text-[#e4e4e7] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter newsletter subject..."
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-[#a1a1aa] mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-[#1f1f1f] border border-[#2f2f2f] rounded-md text-[#e4e4e7] focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
          placeholder="Write your newsletter content here..."
          required
        />
        <p className="mt-1 text-sm text-[#71717a]">
          Supports Markdown formatting. Use line breaks for paragraphs.
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="testMode"
          checked={testMode}
          onChange={(e) => setTestMode(e.target.checked)}
          className="h-4 w-4 rounded border-[#2f2f2f] bg-[#1f1f1f] text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="testMode" className="text-sm font-medium text-[#a1a1aa]">
          Test Mode
        </label>
      </div>

      {testMode ? (
        <div>
          <label htmlFor="testEmail" className="block text-sm font-medium text-[#a1a1aa] mb-1">
            Test Email Address
          </label>
          <input
            type="email"
            id="testEmail"
            value={formData.testEmail}
            onChange={(e) => setFormData({ ...formData, testEmail: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#1f1f1f] border border-[#2f2f2f] rounded-md text-[#e4e4e7] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter test email address..."
            required
          />
        </div>
      ) : (
        subscriberCount !== null && (
          <div className="text-sm text-[#a1a1aa]">
            This newsletter will be sent to {subscriberCount} active subscriber{subscriberCount === 1 ? '' : 's'}.
          </div>
        )
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading 
            ? 'Sending...' 
            : testMode 
              ? 'Send Test Email' 
              : `Send to ${subscriberCount || 0} Subscriber${subscriberCount === 1 ? '' : 's'}`
          }
        </button>
      </div>
    </form>
  );
}
