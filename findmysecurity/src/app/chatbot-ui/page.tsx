'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ChatMessage from '@/sections/components/chat-message'
import TypingIndicator from '@/sections/components/typing-indicator'

export default function ChatbotUI() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('http://34.239.116.186:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 md:px-6 py-6 border-b bg-white/90 backdrop-blur-md shadow-sm sticky top-15 z-10 transition-all duration-300 ease-in-out">
        <Link href="/" className="hover:opacity-75 transition-all duration-200 flex-shrink-0 hover:scale-105">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-cyan-200/50">
            <Image
              src="/pro-icons/FMS_logo_with_padding.png"
              alt="FindMySecurity Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-lg md:text-xl text-slate-800 truncate transition-all duration-200">FindMySecurity AI Assistant</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 space-y-6 scroll-smooth">
        <div className="max-w-3xl mx-auto w-full space-y-6 pt-24 pb-4">
          <ChatMessage
            role="bot"
            content="Hello! I'm your FindMySecurity AI assistant. How can I help you today?"
          />
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              isNew={index === messages.length - 1 && message.role === 'bot'}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t bg-white/90 backdrop-blur-md shadow-lg sticky bottom-0 z-10 transition-all duration-300 ease-in-out">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="Type your message..."
                className="w-full py-3 px-4 pr-12 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-blue-300"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}