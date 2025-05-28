import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32 rounded-lg shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6" style={{fontFamily: "'Poppins', sans-serif"}}>
          Wujudkan Tujuan Finansial Anda
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Mulai berinvestasi dengan mudah, aman, dan menguntungkan bersama InvestKU. Pilihan terbaik untuk masa depan Anda.
        </p>
        <Link href="/investasi" legacyBehavior>
          <a className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            Mulai Investasi Sekarang
          </a>
        </Link>
      </div>
    </section>
  );
}
