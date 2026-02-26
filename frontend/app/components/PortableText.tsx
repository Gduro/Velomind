import { PortableText, type PortableTextComponents } from 'next-sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'

const components: PortableTextComponents = {
  marks: {
    // Zamiast ResolvedLink używamy zwykłego Linku z Next.js
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          target={target} 
          className="text-sage-700 underline hover:text-stone-900 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    // Zamiast SanityImage używamy urlForImage i standardowego Image
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <div className="relative aspect-video my-10 overflow-hidden rounded-[2rem] bg-stone-100 shadow-lg">
          <Image
            src={urlForImage(value).width(1200).url()}
            alt={value.alt || 'Zdjęcie we wpisie'}
            fill
            className="object-cover"
          />
        </div>
      )
    },
  },
  block: {
    // Stylizujemy nagłówki wewnątrz tekstu
    h2: ({ children }) => <h2 className="text-3xl font-black text-stone-900 mt-12 mb-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-black text-stone-900 mt-8 mb-4">{children}</h3>,
    normal: ({ children }) => <p className="mb-6 leading-relaxed text-stone-600">{children}</p>,
  },
}

export default function CustomPortableText({ value }: { value: any }) {
  return (
    <div className="prose prose-lg prose-slate max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}