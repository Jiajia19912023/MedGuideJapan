import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'MedGuide Japan',
  description: 'Free multilingual healthcare guide for foreigners in Japan',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-100">
        {children}
      </body>
      <GoogleAnalytics gaId="G-MTQRY0LD3N" />
    </html>
  );
}
