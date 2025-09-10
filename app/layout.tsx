import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/theme-provider';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://d7leos.org'),
  title: {
    default: 'Leo District 306 D7',
    template: '%s · Leo District 306 D7'
  },
  description: 'Official website for Leo District 306 D7 — service, leadership, and growth.',
  alternates: {
    canonical: 'https://d7leos.org'
  },
  openGraph: {
    title: 'Leo District 306 D7',
    description: 'Service, leadership, and growth.',
    url: 'https://d7leos.org',
    siteName: 'Leo District 306 D7',
    type: 'website',
    locale: 'en_US',
    images: [
      { url: '/logos/dp.png', width: 512, height: 512, alt: 'Leo District 306 D7' }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leo District 306 D7',
    description: 'Service, leadership, and growth.',
    images: ['/logos/dp.png']
  },
  icons: {
    icon: [
      { url: '/logos/dp.png' }
    ],
    apple: [
      { url: '/logos/dp.png' }
    ]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logos/dp.png" />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      <Script id="theme-init" strategy="beforeInteractive">
        {`
          try {
            var t = localStorage.getItem('theme');
            if (!t || t === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch (e) {}
        `}
      </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}