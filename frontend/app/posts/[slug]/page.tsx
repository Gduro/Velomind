import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/utils' 
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      // Sprawdzamy, czy builder w ogóle istnieje
      const imageUrl = urlForImage(value)?.width(1200).auto('format').url()
      
      if (!imageUrl) return null

      return (
        <div className="my-10 overflow-hidden rounded-2xl border bg-slate-50">
          <Image
            src={imageUrl}
            alt={value.alt || 'Zdjęcie w artykule'}
            width={1200}
            height={700}
            className="w-full object-cover"
          />
          {value.alt && (
            <p className="p-4 text-center text-sm text-slate-500 font-medium italic">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
  },
}

// Zmieniamy definicję typu params na Promise
export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 1. Czekamy na rozwiązanie obietnicy parametrów
  const { slug } = await params;

  // 2. Teraz slug jest zwykłym stringiem, który możemy bezpiecznie przekazać
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      category,
      publishedAt,
      mainImage,
      body,
      bikeDetails
    }`,
    { slug } // Przekazujemy wyciągnięty slug
  )

  if (!post) {
    notFound()
  }
  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-12 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
            post.category === 'cycling' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
          }`}>
            {post.category === 'cycling' ? '🚴 Rowery' : '🧠 Samorozwój'}
          </span>
          <time className="text-sm text-slate-400">
            {new Date(post.publishedAt || Date.now()).toLocaleDateString('pl-PL')}
          </time>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-900 mb-6">
          {post.title}
        </h1>
      </header>

      {/* ZDJĘCIE GŁÓWNE - używamy urlForImage z ?. i .url() */}
      {post.mainImage && (
        <div className="relative aspect-video w-full mb-12 overflow-hidden rounded-3xl shadow-xl">
          <Image
            src={urlForImage(post.mainImage)?.width(1200).url() || ''}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {post.category === 'cycling' && post.bikeDetails && (
        <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-wrap gap-8 justify-center">
          <div className="text-center">
            <p className="text-xs uppercase text-slate-400 font-bold mb-1">Dystans</p>
            <p className="text-2xl font-black text-slate-900">{post.bikeDetails.distance} <span className="text-sm font-normal">km</span></p>
          </div>
          <div className="text-center border-l border-slate-200 pl-8">
            <p className="text-xs uppercase text-slate-400 font-bold mb-1">Maszyna</p>
            <p className="text-2xl font-black text-slate-900">{post.bikeDetails.bikeModel}</p>
          </div>
        </div>
      )}

      <div className="prose prose-lg prose-slate max-w-none 
        prose-headings:font-black prose-headings:text-slate-900
        prose-p:leading-relaxed prose-p:text-slate-600
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-slate-900">
        {/* Przekazujemy body do PortableText */}
        <PortableText value={post.body} components={ptComponents} />
      </div>

      <div className="mt-20 pt-10 border-t border-slate-100 text-center">
        <a href="/" className="text-slate-900 font-bold hover:underline">
          ← Wróć do wszystkich wpisów
        </a>
      </div>
    </article>
  )
}