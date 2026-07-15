// app/layout.tsx

import type {Metadata} from 'next';
import { Inter, Anton, Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { brand } from '@/lib/data/brand';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,

  openGraph: {
    title: brand.seo.title,
    description: brand.seo.description,
    url: brand.url,
    siteName: brand.name, 
    images: [
      {
        url: brand.seo.ogImage, 
        width: 1200,
        height: 630,
        alt: `${brand.name} preview image`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  icons: {
    icon: brand.seo.favicon,
    apple: brand.seo.appleIcon,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-[#0E0E0E] text-white antialiased selection:bg-[#C6FF00] selection:text-black">
        <CartProvider>
          <NavBar />
          <CartDrawer />
          {/* THE FIX: Centralized responsive padding */}
          <main className="flex flex-col min-h-screen pt-[96px] md:pt-[100px] pb-[88px] md:pb-0">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}