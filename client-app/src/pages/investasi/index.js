// client-app/pages/investasi.js
import Layout from '../../components/Layout';
import InvestmentCard from '../../components/InvestmentCard';

export default function InvestasiPage({ investments, error }) {
  return (
    <Layout title="Pilihan Investasi - InvestKU">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>Temukan Peluang Investasi Terbaik</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Pilih dari beragam produk investasi yang telah kami kurasi untuk membantu Anda mencapai tujuan finansial.</p>
      </div>

      {error && <p className="text-center text-red-500">Gagal memuat data: {error}</p>}

      {!error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {investments.map((invest) => (
            <InvestmentCard 
              key={invest.id}
              id={invest.id}
              title={invest.title}
              description={invest.description}
              riskLevel={invest.risk_level}
              minInvestment={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(invest.min_investment)}
              potentialReturn={invest.potential_return}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/investments`);
    if (!res.ok) throw new Error('Gagal mengambil data dari server');
    const data = await res.json();
    return {
      props: { investments: data.investments || [] },
    };
  } catch (error) {
    console.error("Error di getServerSideProps investasi:", error);
    return {
      props: { investments: [], error: error.message },
    };
  }
}