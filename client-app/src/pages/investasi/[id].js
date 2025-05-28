// client-app/pages/investasi/[id].js
import Layout from '../../components/Layout';

export default function InvestmentDetailPage({ investment, error }) {
  if (error) {
    return <Layout title="Error"><p className="text-center text-red-500">Error: {error}</p></Layout>;
  }

  return (
    <Layout title={investment.title}>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>{investment.title}</h1>
        <div className="flex items-center space-x-4 mb-6 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Min. Investasi: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(investment.min_investment)}</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Potensi Imbal Hasil: {investment.potential_return}</span>
          <span className={`px-3 py-1 rounded-full font-medium ${investment.risk_level === 'Rendah' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>Risiko: {investment.risk_level}</span>
        </div>
        <div 
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: investment.description }} // Hati-hati dengan XSS
        />
        <div className="mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full sm:w-auto">
                Investasi Sekarang
            </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/investments?id=${id}`);
    if (!res.ok) {
        if (res.status === 404) return { notFound: true };
        throw new Error('Gagal memuat detail investasi');
    }
    const investment = await res.json();
    return {
      props: { investment },
    };
  } catch (error) {
    console.error(`Error di getServerSideProps investasi detail [${id}]:`, error);
    return {
      props: { investment: null, error: error.message },
    };
  }
}