import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function AllPostsPage() {
  // Pobieramy wszystkie wpisy, żeby stworzyć jedną wielką kolekcję
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      category,
      readingTime,
      "distance": bikeDetails.distance
    }
  `)

  return (
    <div className="space-y-16 pb-20">
      
      {/* --- HERO: IDENTYCZNY STYL JAK W SEKCIJI ROWEROWEJ --- */}
      <header className="mx-3 relative h-[450px] rounded-[3rem] overflow-hidden bg-stone-900 shadow-2xl">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Zdjęcie w tle - droga, która symbolizuje i rower, i rozwój */}
        <div className=" absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="bg-sage-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Kolekcja wpisów
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
            Blog<span className="text-sage-400">Mamy</span>
          </h1>
          <p className="mt-6 max-w-2xl text-stone-200 text-lg md:text-xl font-medium leading-relaxed">
            Wszystkie moje historie o pasji do dwóch kółek i drodze do samej siebie 
            zebrane w jednym miejscu.
          </p>
        </div>
      </header>

      {/* --- SIATKA POSTÓW (GRID 3-KOLUMNOWY) --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post: any) => (
          <Link key={post._id} href={`/posts/${post.slug}`} className="group block">
            
            {/* KONTENER ZDJĘCIA (Relative zapobiega rozjechaniu się obrazka) */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-6 bg-stone-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
              {post.mainImage ? (
                <Image
                  src={urlForImage(post.mainImage).width(800).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300 font-bold uppercase text-[10px]">
                  Brak zdjęcia
                </div>
              )}
              
              {/* Badge Kategorii - kolorystyczne rozróżnienie */}
              <div className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest z-20 shadow-sm text-white ${
                post.category === 'cycling' ? 'bg-brand-cycling' : 'bg-sage-600'
              }`}>
                {post.category === 'cycling' ? '🚴 Rower' : '🧠 Rozwój'}
              </div>

              {/* Dodatkowe Info: Dystans lub Czas czytania */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-black text-stone-900 z-20">
                {post.category === 'cycling' 
                  ? `${post.distance || 0} km` 
                  : `${post.readingTime || 5} min`
                }
              </div>
            </div>

            {/* OPIS POSTA */}
            <div className="px-2">
              <div className="flex items-center gap-2 mb-2">
                <time className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                  {new Date(post.publishedAt).toLocaleDateString('pl-PL')}
                </time>
              </div>
              
              <h2 className="text-2xl font-black text-stone-900 leading-tight group-hover:text-sage-700 transition-colors">
                {post.title}
              </h2>
              
              <p className="mt-4 text-sm font-bold text-stone-400 group-hover:text-stone-900 flex items-center gap-2 transition-colors">
                Czytaj więcej <span className="transition-transform group-hover:translate-x-1">→</span>
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* FOOTER SEKCJI (Opcjonalnie) */}
      {posts.length > 0 && (
        <div className="pt-10 border-t border-stone-100 text-center">
          <p className="text-stone-400 text-sm italic">To wszystkie wpisy na ten moment. Zapraszam częściej!</p>
        </div>
      )}
    </div>
  )
}