import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* IKONA / GRAFIKA */}
      <div className="mb-8 relative">
        <span className="text-8xl md:text-[12rem] font-black text-stone-100 absolute inset-0 -z-10 flex items-center justify-center">
          404
        </span>
        <span className="text-6xl md:text-8xl block animate-bounce">
          🚴‍♀️
        </span>
      </div>

      {/* TREŚĆ */}
      <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 tracking-tighter">
        Ups! Zjechałaś z trasy.
      </h1>
      <p className="text-stone-500 max-w-md text-lg leading-relaxed mb-10">
        Wygląda na to, że ten szlak prowadzi donikąd. Czasem warto zawrócić, żeby odnaleźć właściwą ścieżkę.
      </p>

      {/* PRZYCISKI */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-sage-700 transition-all shadow-lg"
        >
          Wróć na start
        </Link>
        <Link 
          href="/rower" 
          className="bg-white border border-stone-200 text-stone-600 px-8 py-4 rounded-full font-bold hover:bg-stone-50 transition-all"
        >
          Sprawdź inne trasy
        </Link>
      </div>
    </div>
  )
}