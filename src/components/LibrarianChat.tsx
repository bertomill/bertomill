'use client';

import { useState, useRef, useEffect } from 'react';
import { Book } from '@/lib/books';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LibrarianChatProps {
  books: Book[];
  onBookSelect?: (book: Book) => void;
}

const QUICK_OPTIONS = [
  { label: "What should I read?", query: "what should I read?" },
  { label: "Best tech books", query: "what are your best technology or programming books?" },
  { label: "Recent favorites", query: "what are your most recently read favorite books?" },
  { label: "Highest rated", query: "what are your highest rated books?" },
];

const INITIAL_MESSAGE = "Welcome to Berto's Library! 📚 I'm your AI librarian, and I'm here to help you discover your next favorite book. What kind of book are you in the mood for?";

export default function LibrarianChat({ books, onBookSelect }: LibrarianChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickOptions, setShowQuickOptions] = useState(true);
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([]);
  const [highlightedBookId, setHighlightedBookId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: INITIAL_MESSAGE,
    }]);
  }, []);

  useEffect(() => {
    if (onBookSelect && highlightedBookId) {
      const book = books.find(b => b.id === highlightedBookId);
      if (book) {
        onBookSelect(book);
      }
    }
  }, [highlightedBookId, books, onBookSelect]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinkingSteps]);

  const handleQuickOption = async (query: string) => {
    setShowQuickOptions(false);
    await handleSubmit(undefined, query);
  };

  const handleSubmit = async (e?: React.FormEvent, quickQuery?: string) => {
    e?.preventDefault();
    const query = quickQuery || input;
    if (!query.trim()) return;

    const userMessage = { role: 'user' as const, content: query };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setThinkingSteps([]);
    setHighlightedBookId(undefined);

    try {
      const response = await fetch('/api/library-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let responseText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        try {
          const data = JSON.parse(chunk);
          if (data.thinking) {
            setThinkingSteps(data.thinking);
          }
          if (data.highlightBookId) {
            setHighlightedBookId(data.highlightBookId);
          }
          if (data.content) {
            responseText = data.content;
          }
        } catch (e) {
          console.error('Error parsing chunk:', e);
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
      setThinkingSteps([]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1f1f1f] rounded-lg border border-[#2f2f2f]">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-teal-900/20 to-yellow-900/20 rounded-lg" />
        <div className="relative h-full flex flex-col p-4 md:p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-purple-400 flex items-center justify-center">
              <span className="text-lg">📚</span>
            </div>
            <h3 className="font-mono text-lg tracking-tight">PAIGE THE LIBRARIAN</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] rounded-lg p-2.5 md:p-3 text-sm md:text-base ${
                      message.role === 'user'
                        ? 'bg-[#3b82f6] text-white'
                        : 'bg-[#27272a] text-[#e4e4e7]'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-2"
              >
                {thinkingSteps.length > 0 ? (
                  thinkingSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-[#a1a1aa] text-xs md:text-sm font-mono"
                    >
                      🤔 {step}...
                    </motion.div>
                  ))
                ) : (
                  <motion.span className="text-[#a1a1aa] text-sm">
                    Thinking...
                  </motion.span>
                )}
              </motion.div>
            )}
            {showQuickOptions && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2 flex-wrap mt-4"
              >
                {QUICK_OPTIONS.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleQuickOption(option.query)}
                    className="bg-[#27272a] text-[#a1a1aa] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm hover:bg-[#3f3f46] hover:text-white transition-colors font-mono"
                  >
                    {option.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form 
            onSubmit={handleSubmit} 
            className="border-t border-[#2f2f2f] p-4 md:p-6"
          >
            <div className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about books..."
                className="flex-1 bg-[#27272a] text-white placeholder-[#71717a] rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
