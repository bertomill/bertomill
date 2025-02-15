import * as React from 'react';

interface NewsletterEmailProps {
  title: string;
  content: string;
  date: string;
}

export const NewsletterEmail: React.FC<Readonly<NewsletterEmailProps>> = ({
  title,
  content,
  date,
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
      marginBottom: '8px',
      fontWeight: 'bold',
      lineHeight: '1.3',
    }}>
      {title}
    </h1>

    <p style={{
      color: '#666',
      fontSize: '14px',
      marginBottom: '24px',
    }}>
      {date}
    </p>
    
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
