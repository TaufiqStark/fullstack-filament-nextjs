import Layout from '../components/Layout';
import InvestmentCard from '../components/InvestmentCard';

// Data dummy untuk daftar investasi
const allInvestments = [
  { id: 'saham-unggulan', title: 'Saham Unggulan', description: 'Investasi pada saham perusahaan-perusahaan blue-chip dengan fundamental kuat dan potensi pertumbuhan jangka panjang.', riskLevel: 'Sedang', minInvestment: 'Rp 1.000.000', potentialReturn: '10-15% p.a.' },
  { id: 'reksadana-pendapatan', title: 'Reksadana Pendapatan Tetap', description: 'Pilihan stabil dengan fokus pada obligasi korporasi dan pemerintah, cocok untuk investor konservatif.', riskLevel: 'Rendah', minInvestment: 'Rp 100.000', potentialReturn: '6-8% p.a.' },
  { id: 'properti-digital', title: 'Properti Digital (Crowdfunding)', description: 'Miliki bagian dari properti komersial secara digital dan dapatkan passive income dari sewa dan apresiasi nilai.', riskLevel: 'Sedang', minInvestment: 'Rp 5.000.000', potentialReturn: '8-12% p.a.' },
  { id: 'p2p-lending-produktif', title: 'P2P Lending Produktif', description: 'Danai UMKM potensial dan dapatkan imbal hasil menarik. Risiko terukur dengan diversifikasi.', riskLevel: 'Tinggi', minInvestment: 'Rp 500.000', potentialReturn: '12-18% p.a.' },
  { id: 'emas-digital', title: 'Emas Digital', description: 'Investasi emas secara mudah dan aman tanpa perlu menyimpan fisik. Likuiditas tinggi.', riskLevel: 'Rendah', minInvestment: 'Rp 10.000', potentialReturn: 'Fluktuatif (Harga Emas)' },
  { id: 'obligasi-ritel', title: 'Obligasi Ritel Negara', description: 'Surat utang negara yang aman dan dijamin pemerintah, cocok untuk diversifikasi portofolio.', riskLevel: 'Rendah', minInvestment: 'Rp 1.000.000', potentialReturn: '5-7% p.a.' },
];

export default function InvestasiPage() {
  return (
    <Layout title="Pilihan Investasi - InvestKU">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>Temukan Peluang Investasi Terbaik</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Pilih dari beragam produk investasi yang telah kami kurasi untuk membantu Anda mencapai tujuan finansial.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allInvestments.map((invest) => (
          <InvestmentCard key={invest.id} {...invest} />
        ))}
      </div>
    </Layout>
  );
}