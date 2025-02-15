#!/usr/bin/env tsx
import { promises as fs } from 'fs';
import path from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NEWSLETTERS_DIR = path.join(__dirname, '../content/newsletters');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string) => new Promise<string>((resolve) => rl.question(query, resolve));

async function ensureDirectoryExists() {
  await fs.mkdir(NEWSLETTERS_DIR, { recursive: true });
}

async function main() {
  try {
    await ensureDirectoryExists();

    // Get newsletter details
    const subject = await question('Newsletter Subject: ');
    console.log('\nCompose your newsletter content (press Ctrl+D when done):');
    
    let content = '';
    for await (const line of rl) {
      content += line + '\n';
    }

    // Save as markdown file
    const date = new Date().toISOString().split('T')[0];
    const filename = `${date}-${subject.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    const filepath = path.join(NEWSLETTERS_DIR, filename);

    const markdown = `---
subject: ${subject}
date: ${date}
---

${content.trim()}
`;

    await fs.writeFile(filepath, markdown);
    console.log(`\nNewsletter saved to: ${filepath}`);

    // Ask if they want to test or send
    rl.input.resume();
    const testEmail = await question('\nEnter email for test send (or press Enter to send to all subscribers): ');
    
    // Prepare the API request
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://bertomill.com/api/newsletter/send'
      : 'http://localhost:3000/api/newsletter/send';

    const payload = {
      subject,
      content: content.trim(),
      ...(testEmail && { testEmail })
    };

    console.log('\nSending newsletter...');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('\n✅ Newsletter sent successfully!');
      if (testEmail) {
        console.log(`Test email sent to: ${testEmail}`);
      } else {
        console.log('Newsletter sent to all subscribers');
      }
    } else {
      console.error('\n❌ Error sending newsletter:', result.error);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
}

main();
