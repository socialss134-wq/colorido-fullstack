import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'COLORIDO 2K26 — Where Talent Meets the Spotlight',
  description:
    'COLORIDO 2K26 — A vibrant college-level cultural and sports fest. Register for cultural events, sports tournaments, and more.',
  openGraph: {
    title: 'COLORIDO 2K26 — Where Talent Meets the Spotlight',
    description:
      'A vibrant college-level cultural and sports fest. Register now for cultural events and sports tournaments.',
    images: [{ url: '/og.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
