'use client'

import Image from 'next/image'

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden">
        <Image
          src="/pro-icons/FMS_logo_with_padding.png"
          alt="FindMySecurity Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <div className="bg-slate-200 px-4 py-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl relative shadow-md ml-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0" />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150" />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300" />
        </div>
        {/* Thought bubble tail */}
        <div className="absolute bottom-[6px] left-[-8px] border-t-8 border-r-8 border-transparent border-r-slate-200" />
      </div>
    </div>
  )
}