import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function MindsetPage() {
    // Pobieramy posty z kategorii 'mindset'
    const posts = await client.fetch(`
  *[_type == "post" && category == "mindset"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    readingTime // <-- Dodajemy to pole
  }
`)
    return (
        <div className="space-y-16 pb-20">
            {/* --- MINDSET HERO --- */}
            <header className="mx-3 relative h-[350px] rounded-[3rem] overflow-hidden bg-sage-50 border border-sage-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <span className="text-sage-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">
                        Wewnętrzny spokój
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black text-stone-900 mb-6">
                        Samorozwój i <span className="italic text-sage-700">Mindset</span>
                    </h1>
                    <div className="w-16 h-px bg-sage-300 mx-auto mb-6" />
                    <p className="max-w-xl text-stone-600 text-lg leading-relaxed">
                        Przestrzeń na zatrzymanie się, lekturę wartościowych treści i budowanie lepszej relacji z samym sobą.
                    </p>
                </div>
            </header>

            {/* --- LISTA WPISÓW --- */}
            <section className="max-w-5xl mx-3 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {posts.map((post: any) => (
                        <Link key={post._id} href={`/posts/${post.slug}`} className="group space-y-6">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-stone-100 transition-all duration-500 group-hover:rounded-[1.5rem] shadow-sm group-hover:shadow-xl">
                                {post.mainImage ? (
                                    <Image
                                        src={urlForImage(post.mainImage)?.width(1000).url() || ''}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                                        Brak zdjęcia
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-sage-300" />
                                    <time className="text-xs font-bold text-sage-600 uppercase tracking-widest">
                                        {new Date(post.publishedAt).toLocaleDateString('pl-PL')}
                                    </time>
                                </div>

                                <h2 className="text-3xl font-black text-stone-900 leading-tight group-hover:text-sage-700 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-stone-500 leading-relaxed line-clamp-2">
                                    Zatrzymaj się na chwilę i zgłęb temat, który pomoże Ci spojrzeć na codzienność z zupełnie nowej perspektywy...
                                </p>

                                <div className="pt-2 text-sm font-bold text-stone-900 group-hover:pl-2 transition-all flex items-center gap-2">
                                    Zgłęb temat <span className="text-sage-500">→</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <time className="text-xs font-bold text-sage-600 uppercase tracking-widest">
                                    {new Date(post.publishedAt).toLocaleDateString('pl-PL')}
                                </time>

                                {/* DODAJEMY CZAS CZYTANIA */}
                                {post.readingTime && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-sage-300" />
                                        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                                            {post.readingTime} min czytania
                                        </span>
                                    </>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* --- JEŚLI PUSTO --- */}
            {posts.length === 0 && (
                <div className="text-center py-24 bg-stone-50 rounded-[3rem] border border-dashed border-stone-200">
                    <p className="text-stone-400 font-medium italic">Pierwsze refleksje pojawią się już niebawem... 🧠</p>
                </div>
            )}
        </div>
    )
}