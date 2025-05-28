import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Plugin untuk Tailwind Typography (jika ingin styling konten HTML lebih baik)
// npm install -D @tailwindcss/typography
// lalu tambahkan require('@tailwindcss/typography') di plugins tailwind.config.js

export default function BlogPostPage({ post, error }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Layout><div className="text-center py-10">Memuat artikel...</div></Layout>;
  }

  if (error) {
    return <Layout title="Error"><div className="text-center py-10 text-red-500">Error: {error}</div></Layout>;
  }

  if (!post) {
     return <Layout title="Tidak Ditemukan"><div className="text-center py-10">Artikel tidak ditemukan.</div></Layout>;
  }

  return (
    <Layout title={`${post.title} - Blog InvestKU`}>
      <Head>
        {/* Tambahkan meta deskripsi dari konten post jika ada */}
        <meta name="description" content={post.content?.substring(0,160).replace(/<[^>]*>?/gm, '') + '...'} />
      </Head>
      <article className="max-w-3xl mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Dipublikasikan pada: {new Date(post.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        
        {/* Gunakan kelas 'prose' dari @tailwindcss/typography untuk styling konten HTML */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }} // Hati-hati dengan XSS jika konten tidak disanitasi dari editor
        />
      </article>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts?slug=${slug}`);
    if (!res.ok) {
      if (res.status === 404) {
        return { notFound: true }; // Menghasilkan halaman 404 jika post tidak ditemukan
      }
      const errorData = await res.json().catch(() => ({ message: `Gagal mengambil data: ${res.statusText}`}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    const post = await res.json();
    return {
      props: { post },
    };
  } catch (error) {
    console.error(`Error di getServerSideProps untuk slug ${slug}:`, error);
    // Anda bisa mengembalikan halaman error kustom atau properti error
    return { props: { post: null, error: error.message } };
  }
}