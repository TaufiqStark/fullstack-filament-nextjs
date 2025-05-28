import Layout from '../../components/Layout';
import Link from 'next/link';

export default function BlogIndexPage({ posts, error }) {
  return (
    <Layout title="Blog Investasi - Wawasan Terbaru dari InvestKU">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>Blog InvestKU</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Dapatkan wawasan, tips, dan berita terbaru seputar dunia investasi untuk membantu perjalanan finansial Anda.</p>
      </div>

      {error && <p className="text-red-500 text-center">Gagal memuat artikel: {error}</p>}

      {!error && posts && posts.length === 0 && (
        <p className="text-center text-gray-600">Belum ada artikel yang dipublikasikan.</p>
      )}

      {!error && posts && posts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Anda bisa menambahkan gambar thumbnail di sini jika ada */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`} legacyBehavior><a>{post.title}</a></Link>
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Dipublikasikan pada: {new Date(post.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div 
                  className="text-gray-600 text-sm mb-4 h-24 overflow-hidden leading-relaxed prose prose-sm max-w-none" 
                  dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 200) + '...' }} // Hati-hati dengan XSS jika konten tidak disanitasi
                />
                <Link href={`/blog/${post.slug}`} legacyBehavior>
                  <a className="text-blue-500 hover:text-blue-700 font-medium">Baca Selengkapnya &rarr;</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts`);
    if (!res.ok) {
      const errorData = await res.json().catch((e) => ({ message: `Gagal mengambil data: ${res.statusText} ${e.message}` }));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return {
      props: { posts: data.posts || [] }, // API kita mengembalikan { posts: [...] }
    };
  } catch (error) {
    console.error("Error di getServerSideProps blog index:", error);
    return {
      props: { posts: [], error: error.message },
    };
  }
}
