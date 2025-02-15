import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { Book } from './books';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const librarySystemPrompt = `You are a knowledgeable and enthusiastic AI librarian assistant named Paige. You help users discover books from the library's collection.

Current Library Collection:
{books}

Follow these guidelines:
1. Be friendly and use emojis occasionally to convey enthusiasm
2. When recommending books, use specific details from the collection
3. If asked about books not in the collection, acknowledge that and suggest similar ones that are available
4. Keep responses concise but informative
5. Use book details like ratings, authors, and tags to make informed recommendations
6. ALWAYS explain your thought process with [THINKING:step] tags while processing
7. When recommending a specific book, ALWAYS highlight it with [HIGHLIGHT:book_id]

Example response with thinking and highlighting:
[THINKING:Analyzing user's interest in programming]
[THINKING:Finding highly-rated technical books]
[THINKING:Identified perfect match based on rating and reviews]
I think you'd love "The Pragmatic Programmer"! [HIGHLIGHT:book_id_here] It's a fantastic guide to software craftsmanship that's rated 5/5 in our collection. Would you like to know more about it?`;

export interface AIResponse {
  content: string;
  highlightBookId?: string;
  thinking?: string[];
}

export async function getAIResponse(userInput: string, books: Book[]): Promise<AIResponse> {
  try {
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.7,
      maxTokens: 300,
    });

    const promptTemplate = PromptTemplate.fromTemplate(
      `{system_prompt}\n\nUser: {user_input}\nAssistant:`
    );

    const chain = RunnableSequence.from([
      promptTemplate,
      model,
      new StringOutputParser(),
    ]);

    const formattedBooks = books.map(book => `
Title: ${book.title}
Author: ${book.author}
Rating: ${book.rating}/5
Tags: ${book.tags.join(', ')}
ID: ${book.id}
${book.review ? `Review: ${book.review}` : ''}
`).join('\n---\n');

    const response = await chain.invoke({
      system_prompt: librarySystemPrompt.replace('{books}', formattedBooks),
      user_input: userInput,
    });

    // Extract thinking steps
    const thinkingSteps = Array.from(response.matchAll(/\[THINKING:([^\]]+)\]/g))
      .map(match => match[1]);

    // Extract book highlight if present
    const highlightMatch = response.match(/\[HIGHLIGHT:([^\]]+)\]/);
    const content = response.replace(/\[THINKING:[^\]]+\]/g, '')
                          .replace(/\[HIGHLIGHT:[^\]]+\]/g, '')
                          .trim();

    return {
      content,
      highlightBookId: highlightMatch ? highlightMatch[1] : undefined,
      thinking: thinkingSteps
    };
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw error;
  }
}
