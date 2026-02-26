import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Mamy | Rowery & Samorozwój",
  description: "Przestrzeń poświęcona pasji do dwóch kółek i ciągłemu doskonaleniu siebie.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sprawdzamy, czy tryb podglądu (Draft Mode) jest włączony
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="pl">
      {/* Zmieniamy bg-white na bg-stone-50, żeby pasowało do palety Zen */}
      <body className={`${inter.className} antialiased bg-stone-50 text-stone-900`}>
        {/* Visual Editing Toolbar - pojawi się tylko w trybie podglądu */}
        {isDraftMode && <VisualEditing />}

        <div className="flex flex-col min-h-screen">
          {/* --- NAVBAR --- */}
          <Navbar/>

          {/* --- MAIN CONTENT --- */}
          {/* Usunąłem bg-white stąd, żeby tło stone-50 z body prześwitywało wszędzie */}
          <main className="flex-grow">
            {children}
          </main>

          {/* --- FOOTER --- */}
          <footer className="border-t border-stone-200 py-12 bg-stone-100/50">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm font-bold text-stone-900">
                BLOG<span className="text-sage-700">MAMY</span>
              </p>
              <p className="text-xs text-stone-500 mt-2 italic">
                Z pasji do rowerów i rozwoju.
              </p>
              <p className="text-[10px] text-stone-400 mt-8 uppercase tracking-widest">
                © {new Date().getFullYear()} — Built with Next.js & Sanity
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}