import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { AppProviders } from '@/app/providers';
import { site } from '@/content/site';
import './globals.css';

const introRust = localFont({
  src: '../../public/fonts/IntroRust-Line.otf',
  variable: '--font-intro-rust',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.canonical,
  sameAs: ['https://github.com/Mmach1ne', 'https://www.linkedin.com/in/ray-xue-uw'],
};

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL(site.canonical),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Ray Xue – Full-Stack Developer',
    description: 'Check out my projects built with React, Node.js, and Python.',
    url: site.canonical,
    type: 'website',
    images: [{ url: '/rocket.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ray Xue – Full-Stack Developer',
    description: 'Check out my projects built with React, Node.js, and Python.',
    images: ['/rocket.png'],
  },
  icons: {
    icon: '/rocket.png',
    apple: '/rocket.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${introRust.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from site config
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message" />
        </form>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
