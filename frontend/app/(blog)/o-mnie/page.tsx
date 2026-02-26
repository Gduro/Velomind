import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/utils'
import { PortableText } from '@portabletext/react'

export default async function AboutPage() {
  // 1. Pobieramy dane z Sanity (nasz singleton o konkretnym ID)
  const data = await client.fetch(`
    *[_type == "aboutMe" && _id == "aboutMe"][0]{
      title,
      profileImage,
      bio,
      funFacts
    }
  `)

  // Jeśli mama jeszcze nic nie wpisała, wyświetlamy info (zabezpieczenie)
  if (!data) {
    return <div className="py-20 text-center">Uzupełnij dane w panelu Sanity!</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEWA KOLUMNA: ZDJĘCIE Z SANITY */}
        <div className="relative">
          <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-layer z-20">
            {data.profileImage && (
              <Image 
                src={urlForImage(data.profileImage).width(800).url()} 
                alt={data.profileImage.alt || "Portret autorki"}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-sage-100 rounded-full -z-10" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-stone-100 rounded-full -z-10 border border-stone-200" />
        </div>

        {/* PRAWA KOLUMNA: TEKST Z SANITY */}
        <div className="space-y-8">
          <section>
            <span className="text-sage-600 font-bold uppercase tracking-[0.3em] text-xs">Poznajmy się</span>
            <h1 className="text-5xl md:text-7xl font-black text-stone-900 mt-4 leading-tight">
              {data.title}
            </h1>
          </section>

          {/* Używamy PortableText zamiast sztywnych <p> */}
          <div className="prose prose-lg prose-slate text-stone-600 leading-relaxed">
            <PortableText value={data.bio} />
          </div>

          {/* DYNAMICZNE CIEKAWOSTKI (funFacts) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            {data.funFacts?.map((fact: any, index: number) => (
              <div 
                key={index} 
                className={`p-6 rounded-3xl border bg-sage-50 border-stone-400'
                }`}
              >
                <span className="text-2xl mb-2 block">{fact.icon}</span>
                <h4 className="font-black text-stone-900">{fact.label}</h4>
                <p className="text-sm text-stone-500">{fact.value}</p>
              </div>
            ))}
          </div>

          {/* <div className="pt-8">
            <Link 
              href="#newsletter" 
              className="inline-block bg-sage-700 text-white px-10 py-4 rounded-full font-bold hover:bg-sage-800 transition-all shadow-lg hover:shadow-xl"
            >
              Napisz do mnie
            </Link>
          </div> */}
        </div>
      </div>

      {/* DOLNA SEKCJA: WARTOŚCI (Możesz też je przenieść do Sanity, jeśli chcesz!) */}
      <section className="mt-32 py-20 border-y border-stone-400 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="space-y-4">
          <h3 className="text-xl font-black text-stone-900 uppercase tracking-tighter">Autentyczność</h3>
          <p className="text-stone-500 text-sm">Nie koloryzuję. Piszę o trudnych podjazdach i dniach, kiedy nie chce się wstać.</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-black text-stone-900 uppercase tracking-tighter">Ruch</h3>
          <p className="text-stone-500 text-sm">Ciało i umysł to jedność. Ruch to najprostsza droga do spokoju.</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-black text-stone-900 uppercase tracking-tighter">Wspólnota</h3>
          <p className="text-stone-500 text-sm">Miejsce dla kobiet szukających własnej ścieżki.</p>
        </div>
      </section>
    </div>
  )
}