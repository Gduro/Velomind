import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function CyclingPage() {
  // Pobieramy tylko posty z kategorii 'cycling'
  const posts = await client.fetch(`
    *[_type == "post" && category == "cycling"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      bikeDetails
    }
  `)

  return (
    <div className="space-y-16 pb-20">
      {/* --- CYCLING HERO --- */}
      <header className=" mx-3 relative h-[400px] rounded-[3rem] overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Zdjęcie w tle - możesz je potem zmienić na dynamiczne z Sanity */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=2074')] bg-cover bg-center" />
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <span className="bg-brand-cycling px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Moje Kilometry
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-4">Na dwóch kółkach</h1>
          <p className="max-w-xl text-stone-200 text-lg italic">
            "Rower to nie tylko środek transportu, to mój sposób na wolność i czystą głowę."
          </p>
        </div>
      </header>

      {/* --- LISTA POSTÓW ROWEROWYCH --- */}
      <section className="mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post: any) => (
          <Link key={post._id} href={`/posts/${post.slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-6 bg-stone-100 shadow-sm transition-shadow group-hover:shadow-xl">
              {post.mainImage ? (
                <Image
                  src={urlForImage(post.mainImage)?.width(800).url() || ''}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">Brak zdjęcia</div>
              )}
              
              {/* Badge z dystansem (jeśli istnieje) */}
              {post.bikeDetails?.distance && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-black text-stone-900 shadow-sm z-20">
                  🚴 {post.bikeDetails.distance} km
                </div>
              )}
            </div>

            <div className="px-2">
              <time className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                {new Date(post.publishedAt).toLocaleDateString('pl-PL')}
              </time>
              <h2 className="text-2xl font-black text-stone-900 mt-2 group-hover:text-brand-cycling transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="mt-3 text-stone-500 line-clamp-2 leading-relaxed">
                {/* Tutaj można dodać krótki opis, jeśli masz go w schemacie */}
                Odkryj szczegóły tej trasy i dowiedz się, co ciekawego wydarzyło się po drodze...
              </p>
              
              <div className="mt-4 flex items-center gap-2 text-brand-cycling font-bold text-sm">
                Czytaj dalej 
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* --- JEŚLI BRAK POSTÓW --- */}
      {posts.length === 0 && (
        <div className="text-center py-20 bg-stone-100 rounded-[3rem] border border-dashed border-stone-300">
          <p className="text-stone-500 font-medium">Pierwsze wyprawy już wkrótce! 🚴‍♀️</p>
        </div>
      )}
    </div>
  )
}