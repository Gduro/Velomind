import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      boxShadow: {
        // Zmiękczamy cień, aby pasował do naturalnego motywu
        layer: '0 20px 50px -12px rgba(15, 23, 42, 0.1)', 
      },
      colors: {
        // Tło i tekst (Zen & Nature palette)
        black: '#1c1d1a', // Bardzo ciemna zieleń/grafit zamiast czystej czerni
        white: '#fff',
        
        // SAGE (Szałwia) - Twój nowy główny kolor akcentowy
        sage: {
          50: '#f4f7f4',
          100: '#e7ede7',
          200: '#d0ddd0',
          300: '#adbfaa',
          400: '#869e83',
          500: '#667c64',
          600: '#50634e',
          700: '#415040', // Główny kolor dla "Rozwoju"
          800: '#364135',
          900: '#2d362c',
          950: '#181d18',
        },

        // STONE (Beż/Kamień) - Idealne na tło strony
        stone: {
          50: '#fafaf9', // To będzie Twój główny kolor tła (bg-stone-50)
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524', // Kolor dla głównego tekstu
          900: '#1c1917',
          950: '#0c0a09',
        },

        // ACCENT (Ziemista Pomarańcza) - Dla rowerów i ważnych akcji
        brand: {
          cycling: '#c2410c', // Ciepła terakota/pomarańcz
          mindset: '#415040', // Szałwiowa zieleń
        }
      },
      fontFamily: {
        // Zachowujemy Twoje ustawienia fontów
        sans: ['var(--font-inter)'],
        mono: ['var(--font-ibm-plex-mono)'],
      },
      // Dostosowanie Prose (Typography) do nowych kolorów
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.stone.800'),
            a: {
              color: theme('colors.sage.700'),
              '&:hover': {
                color: theme('colors.sage.600'),
              },
            },
            h1: { color: theme('colors.stone.900') },
            h2: { color: theme('colors.stone.900') },
            strong: { color: theme('colors.stone.900') },
          },
        },
      }),
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config