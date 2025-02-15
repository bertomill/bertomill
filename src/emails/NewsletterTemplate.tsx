import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
} from '@react-email/components';
import * as React from 'react';

interface NewsletterTemplateProps {
  content: string;
  previewText?: string;
  title?: string;
}

export const NewsletterTemplate = ({
  content,
  previewText = "New content from Berto's blog",
  title = "Newsletter",
}: NewsletterTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={{ 
        backgroundColor: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <Container style={{ 
          margin: '0 auto',
          padding: '20px 0 48px',
          width: '580px',
        }}>
          <Heading style={{
            color: '#333',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px',
          }}>
            {title}
          </Heading>
          
          <Section style={{ marginBottom: '32px' }}>
            <Text style={{
              color: '#555',
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '24px',
              whiteSpace: 'pre-line',
            }}>
              {content.trim()}
            </Text>
          </Section>

          <Section style={{
            borderTop: '1px solid #ddd',
            paddingTop: '16px',
          }}>
            <Text style={{
              color: '#777',
              fontSize: '14px',
            }}>
              You&apos;re receiving this email because you subscribed to updates.
              You can{' '}
              <Link
                href="{{unsubscribe_url}}"
                style={{
                  color: '#2563eb',
                  textDecoration: 'underline',
                }}
              >
                unsubscribe
              </Link>{' '}
              at any time.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterTemplate;
