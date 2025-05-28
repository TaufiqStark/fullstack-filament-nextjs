import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

export default function Layout({ children, title = 'Investasi Keren' }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Platform investasi terpercaya untuk masa depan finansial Anda." />
        <link rel="icon" href="/favicon.ico" /> {/* Ganti dengan ikon Anda */}
        
      </Head>

      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
