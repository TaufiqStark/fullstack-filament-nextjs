import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" legacyBehavior>
              <a className="text-2xl font-bold text-blue-600 hover:text-blue-700" style={{fontFamily: "'Poppins', sans-serif"}}>
                InvestKU
              </a>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" legacyBehavior><a className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Beranda</a></Link>
              <Link href="/investasi" legacyBehavior><a className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Investasi</a></Link>
              <Link href="/blog" legacyBehavior><a className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</a></Link>
              <Link href="/tentang" legacyBehavior><a className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tentang Kami</a></Link>
              {/* Tambahkan link Login/Register di sini nanti */}
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button - implement later if needed */}
            <button type="button" className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
