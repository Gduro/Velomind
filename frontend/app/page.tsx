import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/utils' // Importujemy narzędzie do zdjęć
export default async function LandingPage() {
  // Pobieramy tylko 3 najnowsze posty na dół strony
  const latestPosts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      mainImage
    }
  `)
  return (
    <div className="space-y-24 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center text-center pt-10 px-4">
        <span className="text-sage-600 font-bold tracking-widest uppercase text-sm mb-4">
          Witaj w moim świecie
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-stone-900 leading-tight max-w-4xl">
          Równowaga między <span className="text-sage-700">ruchem</span> a <span className="text-brand-cycling">myślą</span>.
        </h1>
        <p className="mt-6 text-lg text-stone-600 max-w-2xl leading-relaxed">
          Nazywam się [Imię Mamy] i dzielę się tutaj moją drogą przez kilometry na rowerze
          oraz kroki w stronę lepszego rozumienia siebie.
        </p>
      </section>

      {/* --- THE THREE PATHS (KATEGORIE) --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* KARTA: ROWER */}
        <Link href="/posts?category=cycling" className="group relative h-[500px] overflow-hidden rounded-3xl bg-stone-200">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
          <div className="absolute bottom-10 left-10 z-20 text-white">
            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Pasja</span>
            <h2 className="text-4xl font-black mt-2">Na dwóch kółkach</h2>
            <p className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Zobacz wpisy rowerowe →</p>
          </div>
          {/* Tu wstaw zdjęcie mamy na rowerze w Sanity i pobierz je, teraz placeholder */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
        </Link>

        {/* KARTA: ROZWÓJ */}
        <Link href="/posts?category=mindset" className="group relative h-[500px] overflow-hidden rounded-3xl bg-sage-100">
          <div className="absolute inset-0 bg-sage-900/10 group-hover:bg-sage-900/30 transition-colors z-10" />
          <div className="absolute bottom-10 left-10 z-20 text-sage-950">
            <span className="text-sm font-bold uppercase tracking-widest opacity-60">Wnętrze</span>
            <h2 className="text-4xl font-black mt-2">Samorozwój</h2>
            <p className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Zatrzymaj się na chwilę →</p>
          </div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1458014854819-1a40aa70211c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
        </Link>

        {/* KARTA: O MNIE */}
        <Link href="/o-mnie" className="group relative h-[500px] overflow-hidden rounded-3xl bg-stone-100 border border-stone-200">
          <div className="flex flex-col h-full items-center justify-center p-12 text-center group-hover:bg-stone-200 transition-colors">
            <div className="w-32 h-32 rounded-full bg-sage-200 mb-6 overflow-hidden border-4 border-white shadow-xl">
              {/* Portret Mamy */}
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center  transition-transform duration-700 group-hover:scale-110" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-sage-700">Poznajmy się</span>
            <h2 className="text-3xl font-black mt-2 text-stone-900">O mnie</h2>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Dlaczego piszę i co sprawia, że rano chce mi się wsiąść na rower.
            </p>
          </div>
        </Link>
      </section>

      {/* --- LATEST POSTS SNIPPET --- */}
      <section className="px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-3xl font-black text-stone-900">Ostatnio na blogu</h3>
            <p className="text-stone-500">Najświeższe myśli i relacje</p>
          </div>
          <Link href="/posty" className="text-sage-700 font-bold hover:underline">Zobacz wszystkie →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post: any) => (
            /* 2. DODANY LINK: Teraz cała karta jest klikalna */
            <Link
              key={post._id}
              href={`/posts/${post.slug}`}
              className="group block"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-4 relative bg-stone-200">
                {/* 3. DODANE ZDJĘCIE: Używamy next/image i urlForImage */}
                {post.mainImage ? (
                  <Image
                    src={urlForImage(post.mainImage).width(600).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  // Placeholder jeśli nie ma zdjęcia
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    Brak zdjęcia
                  </div>
                )}
              </div>
              <h4 className="text-xl font-bold group-hover:text-sage-700 transition-colors leading-tight">
                {post.title}
              </h4>
              <p className="mt-2 text-sm text-stone-500 font-medium" >Czytaj więcej →</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}