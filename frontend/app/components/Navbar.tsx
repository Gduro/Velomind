'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 bg-sage-700 rounded-full flex items-center justify-center text-white font-black transition-transform group-hover:rotate-12">
            M
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-stone-900">
              BLOG<span className="text-sage-700">MAMY</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
              Ruch & Spokój
            </span>
          </div>
        </Link>

        {/* LINKI - DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-bold text-stone-500 hover:text-sage-700 transition-colors">Start</Link>
          <div className="w-px h-4 bg-stone-200" />
          <Link href="/rower" className="flex items-center gap-2 text-sm font-bold text-stone-900 hover:text-brand-cycling transition-colors">
            <span>🚴</span> Rower
          </Link>
          <div className="w-px h-4 bg-stone-200" />
          <Link href="/rozwoj" className="flex items-center gap-2 text-sm font-bold text-stone-900 hover:text-sage-700 transition-colors">
            <span>🧠</span> Rozwój
          </Link>
          <div className="w-px h-4 bg-stone-200" />
          <Link href="/o-mnie" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">O mnie</Link>
        </div>

        {/* PRZYCISK BURGERA (Interaktywny) */}
        <button 
          className="md:hidden p-2 text-stone-900" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* MENU MOBILNE (Overlay) */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-stone-100 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 z-40">
          <div className="flex flex-col p-6 gap-6">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-bold text-stone-900">Start</Link>
            <Link href="/rower" onClick={() => setIsOpen(false)} className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>🚴</span> Rower
            </Link>
            <Link href="/rozwoj" onClick={() => setIsOpen(false)} className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>🧠</span> Rozwój
            </Link>
            <Link href="/o-mnie" onClick={() => setIsOpen(false)} className="text-lg font-bold text-stone-900">O mnie</Link>
            <Link 
              href="#newsletter" 
              onClick={() => setIsOpen(false)}
              className="bg-stone-900 text-white text-center py-4 rounded-2xl font-bold"
            >
              Zostańmy w kontakcie
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}