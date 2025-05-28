// client-app/pages/api/data.js
import { Pool } from 'pg';

// Konfigurasi koneksi database dari environment variables
// Variabel ini akan di-pass melalui docker-compose.yml
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  // Tambahkan ssl jika database Anda di production memerlukannya
  // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      // Contoh query: mengambil waktu server database dan versi postgres
      const result = await client.query('SELECT NOW() as now, version() as version;');
      client.release();
      
      res.status(200).json({ 
        message: 'Koneksi Sukses dari Next.js API!', 
        timestamp: result.rows[0].now,
        db_version: result.rows[0].version 
      });

    } catch (err) {
      console.error('[Next.js API] Error koneksi ke database:', err.stack);
      res.status(500).json({ error: 'Gagal terkoneksi ke database dari Next.js API' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
