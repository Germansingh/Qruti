import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { DocumentProvider } from '@/lib/context/DocumentContext';

export const metadata: Metadata = {
  title: 'Legal Jargon - AI-Powered Legal Document Understanding',
  description:
    'Translate complex legal contracts, leases, and agreements into simple, plain English summaries, key clause breakdowns, risk alerts, and grounded AI Q&A.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
        <DocumentProvider>
          <DisclaimerBanner />
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </DocumentProvider>
      </body>
    </html>
  );
}
