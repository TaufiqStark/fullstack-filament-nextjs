import Layout from '../components/Layout';
import Hero from '../components/Hero';
import InvestmentCard from '../components/InvestmentCard';
import Link from 'next/link';

// Data dummy untuk investasi
const featuredInvestments = [
  { id: 'saham-unggulan', title: 'Saham Unggulan', description: 'Investasi pada saham perusahaan-perusahaan blue-chip dengan fundamental kuat.', riskLevel: 'Sedang', minInvestment: 'Rp 1.000.000', potentialReturn: '10-15% p.a.' },
  { id: 'reksadana-pendapatan', title: 'Reksadana Pendapatan Tetap', description: 'Pilihan stabil dengan fokus pada obligasi korporasi dan pemerintah.', riskLevel: 'Rendah', minInvestment: 'Rp 100.000', potentialReturn: '6-8% p.a.' },
  { id: 'properti-digital', title: 'Properti Digital (Crowdfunding)', description: 'Miliki bagian dari properti komersial secara digital dan dapatkan passive income.', riskLevel: 'Sedang', minInvestment: 'Rp 5.000.000', potentialReturn: '8-12% p.a.' },
];

// Data dummy untuk blog (nantinya akan diambil dari API)
const latestPosts = [
    { slug: 'strategi-investasi-pemula', title: '5 Strategi Investasi Jitu untuk Pemula di Tahun Ini', excerpt: 'Memulai investasi bisa jadi menakutkan, tapi dengan strategi yang tepat...' },
    { slug: 'memahami-risiko-investasi', title: 'Pentingnya Memahami Profil Risiko Sebelum Berinvestasi', excerpt: 'Setiap investasi memiliki risiko. Kenali profil risiko Anda agar...' },
];

export default function HomePage({ postsFromDB }) { // postsFromDB akan diisi dari getServerSideProps
  return (
    <Layout title="InvestKU - Platform Investasi Anda">
      <Hero />

      {/* Mengapa InvestKU Section */}
      <section className="py-16 bg-white rounded-lg shadow-lg my-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{fontFamily: "'Poppins', sans-serif"}}>Mengapa Memilih InvestKU?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              {/* Ganti dengan ikon yang sesuai */}
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aman & Terpercaya</h3>
              <p className="text-gray-600 text-sm">Platform kami diawasi dan menggunakan teknologi enkripsi terkini.</p>
            </div>
            <div className="p-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Pilihan Beragam</h3>
              <p className="text-gray-600 text-sm">Berbagai produk investasi sesuai profil risiko dan tujuan Anda.</p>
            </div>
            <div className="p-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 01-.8-1.6L7.75 8l-2.55-3.4A1 1 0 013 4V3a3 3 0 013-3z" clipRule="evenodd"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Mudah Digunakan</h3>
              <p className="text-gray-600 text-sm">Antarmuka intuitif, mulai investasi dalam hitungan menit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investasi Unggulan Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{fontFamily: "'Poppins', sans-serif"}}>Pilihan Investasi Unggulan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredInvestments.map((invest) => (
              <InvestmentCard key={invest.id} {...invest} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/investasi" legacyBehavior>
              <a className="text-blue-600 hover:text-blue-700 font-semibold">
                Lihat Semua Pilihan Investasi &rarr;
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Terbaru Section */}
      <section className="py-16 bg-gray-100 rounded-lg shadow-inner my-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{fontFamily: "'Poppins', sans-serif"}}>Wawasan Terbaru dari Blog Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(postsFromDB && postsFromDB.length > 0 ? postsFromDB : latestPosts).slice(0, 2).map((post) => ( // Tampilkan dari DB jika ada, jika tidak fallback ke dummy
              <div key={post.slug} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt || post.content?.substring(0, 100) + '...'}</p>
                <Link href={`/blog/${post.slug}`} legacyBehavior>
                  <a className="text-blue-500 hover:text-blue-600 font-medium">Baca Selengkapnya &rarr;</a>
                </Link>
              </div>
            ))}
          </div>
          {postsFromDB && postsFromDB.length === 0 && (
             <p className="text-center text-gray-600 mt-8">Belum ada artikel terbaru.</p>
          )}
          <div className="text-center mt-12">
            <Link href="/blog" legacyBehavior>
              <a className="text-blue-600 hover:text-blue-700 font-semibold">
                Kunjungi Blog Kami &rarr;
              </a>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}

// Ambil data post dari API untuk ditampilkan di homepage
export async function getServerSideProps() {
  try {
    // Pastikan URL ini sesuai dengan bagaimana Anda menjalankan aplikasi Next.js di Docker
    // Jika client-app dan API-nya ada di service yang sama (seperti sekarang), localhost:3000 adalah port internal Next.js
    // Jika API ada di service lain, gunakan nama service Docker, misal: http://admin-app-php/api/posts
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts?limit=2`); // Ambil 2 post terbaru
    if (!res.ok) {
      console.error("Gagal fetch posts untuk homepage:", res.status, await res.text());
      return { props: { postsFromDB: [] } }; // Kembalikan array kosong jika gagal
    }
    const postsFromDB = await res.json();
    return {
      props: { postsFromDB: postsFromDB.posts || [] }, // Pastikan mengambil array 'posts' jika API mengembalikannya dalam objek
    };
  } catch (error) {
    console.error("Error di getServerSideProps homepage:", error);
    return { props: { postsFromDB: [] } }; // Kembalikan array kosong jika error
  }
}