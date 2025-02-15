import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  content?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  content = `This is a test email to verify that our newsletter system is working correctly.
Here's what you can expect from future newsletters:

✨ Updates about new blog posts
💡 Interesting tech insights
🚀 Project announcements
📚 And much more!

Thanks for subscribing to the newsletter.`
}) => (
  <div style={{
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '32px',
    maxWidth: '580px',
    margin: '0 auto',
    borderRadius: '8px',
  }}>
    <h1 style={{ 
      color: '#333', 
      fontSize: '24px', 
      marginBottom: '24px',
      fontWeight: 'bold',
      lineHeight: '1.3',
    }}>
      Welcome to Berto's Newsletter! 👋
    </h1>
    
    <div style={{ 
      color: '#555', 
      fontSize: '16px',
      lineHeight: '1.6',
      whiteSpace: 'pre-line',
      marginBottom: '32px',
      padding: '0 8px',
    }}>
      {content}
    </div>

    <hr style={{ 
      border: 'none', 
      borderTop: '1px solid #eee',
      margin: '32px 0',
    }} />

    <p style={{ 
      color: '#777', 
      fontSize: '14px',
      lineHeight: '1.5',
      textAlign: 'center',
    }}>
      You're receiving this email because you subscribed to updates from Berto's blog.
      {' '}
      <a 
        href="{{unsubscribe_url}}" 
        style={{
          color: '#2563eb',
          textDecoration: 'none',
          borderBottom: '1px solid #2563eb',
          paddingBottom: '1px',
        }}
      >
        Unsubscribe
      </a>
      {' '}
      at any time.
    </p>
  </div>
);
