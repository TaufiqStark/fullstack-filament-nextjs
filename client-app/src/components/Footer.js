export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} InvestKU. Semua Hak Dilindungi.</p>
        <p className="text-sm text-gray-400 mt-1">Platform Investasi Terpercaya Anda</p>
      </div>
    </footer>
  );
}
