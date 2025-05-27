'use client'

import { cn } from '@/utils/path'
import { User } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react';

interface ChatMessageProps {
  role: 'user' | 'bot'
  content: string
  isNew?: boolean
}

export default function ChatMessage({ role, content, isNew }: ChatMessageProps) {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    if (role === 'bot') {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedContent((prev) => prev + content.charAt(index));
        index++;
        if (index >= content.length) clearInterval(interval);
      }, 25);
      return () => clearInterval(interval);
    } else {
      setDisplayedContent(content);
    }
  }, [content, role]);

  return (
    <div className={cn('flex items-end gap-2 transition-all duration-300', role === 'user' ? 'justify-end' : 'justify-start')}>
      {/* Bot avatar - only show for bot messages */}
      {role === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-md transition-transform duration-200 hover:scale-105">
          <Image
            src="/pro-icons/FMS_logo_with_padding.png"
            alt="FindMySecurity Logo"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      )}

      <div
        className={cn(
          'max-w-[80%] px-4 py-3 transition-all duration-300 relative shadow-lg hover:shadow-xl whitespace-pre-wrap break-words transform-gpu',
          role === 'user'
            ? 'bg-slate-800 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl mr-3 hover:-translate-x-0.5'
            : 'bg-white text-slate-800 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl ml-3 hover:translate-x-0.5',
          role === 'bot' && isNew && 'animate-fade-in',
        )}
      >
        {displayedContent}
        {/* Thought bubble tail */}
        <div
          className={cn(
            'absolute bottom-[6px] w-0 h-0 transition-transform duration-200',
            role === 'user'
              ? 'right-[-8px] border-t-8 border-l-8 border-transparent border-l-slate-800'
              : 'left-[-8px] border-t-8 border-r-8 border-transparent border-r-white',
          )}
        />
      </div>

      {/* User avatar - only show for user messages */}
      {role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-105">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}