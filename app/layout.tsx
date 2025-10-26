import type { Metadata } from "next";
import { Noto_Serif_Bengali, Hind_Siliguri, Inter } from 'next/font/google';
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

const notoSerifBengali = Noto_Serif_Bengali({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-bengali-serif',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600'],
  subsets: ['bengali'],
  variable: '--font-bengali-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Agartala Darpan - Bengali Daily Newspaper | Agartala, West Tripura",
  description: "Read Agartala Darpan e-paper online. A Bengali daily newspaper from Kunjaban Colony, Agartala, West Tripura. Published from P.O-Abhoynagar, PIN-799005.",
  icons: {
    icon: '/logo.svg'
  },
  openGraph: {
    title: "Agartala Darpan - Bengali Daily Newspaper",
    description: "Read Agartala Darpan e-paper online. A Bengali daily newspaper from Agartala, West Tripura.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${notoSerifBengali.variable} ${hindSiliguri.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`antialiased bg-cream`}
      >
        <NextTopLoader showSpinner={false} height={6} color="#8B1538" />
        <Toaster richColors position="top-right" />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
