import Link from 'next/link';

// Placeholder untuk ikon, Anda bisa menggunakan library ikon seperti Heroicons atau FontAwesome
const PlaceholderIcon = () => (
  <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export default function InvestmentCard({ id, title, description, riskLevel, minInvestment, potentialReturn, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        {icon || <PlaceholderIcon />}
        <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>{title}</h3>
        <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">{description}</p>
        <div className="mb-4">
          <p className="text-xs text-gray-500">Tingkat Risiko: <span className={`font-medium ${riskLevel === 'Rendah' ? 'text-green-500' : riskLevel === 'Sedang' ? 'text-yellow-500' : 'text-red-500'}`}>{riskLevel}</span></p>
          <p className="text-xs text-gray-500">Min. Investasi: <span className="font-medium text-gray-700">{minInvestment}</span></p>
          <p className="text-xs text-gray-500">Potensi Imbal Hasil: <span className="font-medium text-green-600">{potentialReturn}</span></p>
        </div>
        <Link href={`/investasi/${id || 'detail'}`} legacyBehavior>
          <a className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300">
            Lihat Detail
          </a>
        </Link>
      </div>
    </div>
  );
}