import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/ui/LenisProvider';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
  metadataBase: new URL('https://ipolcompany.pro'),
  title: {
    default: 'IPOL Company — International Freight Forwarding Algeria',
    template: '%s | IPOL Company',
  },
  description:
    'International Power Logistics S.A.R.L — Expert freight forwarding by ocean, air and road. ' +
    'Customs clearance, warehousing and supply chain management since 2012. ' +
    'Offices in Algiers, Oran and Istanbul.',
  keywords: [
    'freight forwarding algeria',
    'logistique algerie',
    'customs clearance algeria',
    'ocean freight algeria',
    'air freight algeria',
    'IPOL',
    'international power logistics',
    'transitaire algerie',
    'dédouanement algérie',
    'transport international algerie',
  ],
  openGraph: {
    title: 'IPOL Company — Freight Forwarding Algeria',
    description: 'Your cargo, our mission. Reliable freight forwarding since 2012.',
    url: 'https://ipolcompany.pro',
    siteName: 'IPOL Company',
    locale: 'fr_DZ',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPOL Company — Freight Forwarding Algeria',
    description: 'Your cargo, our mission. Since 2012.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://ipolcompany.pro' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@600;700;800&family=Poppins:wght@300;400;500;600;700&family=Source+Serif+4:ital,opsz,wght@1,8..60,400;1,8..60,600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
