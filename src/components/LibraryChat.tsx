'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  action?: 'thinking' | 'searching' | 'recommending';
}

export default function LibraryChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to Berto's Library! 📚 I'm your AI librarian, and I'm here to help you discover your next favorite book. What kind of book are you in the mood for?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Add thinking message
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: '🤔 Let me search through the shelves...', action: 'thinking' }
    ]);

    try {
      const response = await fetch('/api/library-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, messages: messages }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      // Remove thinking message and add AI response
      setMessages(prev => [
        ...prev.filter(msg => msg.action !== 'thinking'),
        { role: 'assistant', content: data.message }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev.filter(msg => msg.action !== 'thinking'),
        { role: 'assistant', content: 'Sorry, I had trouble searching the library. Could you try asking again?' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-3xl mx-auto bg-[#1f1f1f] rounded-lg border border-[#2f2f2f] overflow-hidden">
      {/* Library Scene Header */}
      <div className="p-4 bg-[#2f2f2f] border-b border-[#3f3f3f] flex items-center space-x-2">
        <BookOpen className="w-5 h-5 text-[#a1a1aa]" />
        <h2 className="text-lg font-medium text-[#e4e4e7]">AI Library Assistant</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#2f2f2f] text-[#e4e4e7]'
              }`}
            >
              {message.action === 'thinking' ? (
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>{message.content}</span>
                </div>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#2f2f2f] bg-[#1f1f1f]">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about books you might enjoy..."
            className="flex-1 bg-[#2f2f2f] text-[#e4e4e7] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
