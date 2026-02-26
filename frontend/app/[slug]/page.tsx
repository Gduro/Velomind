import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'

// Zauważ, że typ params musi być obietnicą (Promise)
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. ROZPAKOWUJEMY PARAMS (To naprawia błąd)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 2. WYKONUJEMY ZAPYTANIE (Teraz $slug będzie poprawnie przekazany)
  const page = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]`, 
    { slug } // Przekazujemy wartość do parametru $slug
  )

  // Jeśli nie ma takiej strony, rzucamy 404
  if (!page) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-black text-stone-900 mb-8">{page.title}</h1>
      {/* Tutaj renderowałbyś treść strony */}
      <div className="prose prose-lg">
         {/* Jeśli masz pole body: <PortableText value={page.body} /> */}
      </div>
    </div>
  )
}