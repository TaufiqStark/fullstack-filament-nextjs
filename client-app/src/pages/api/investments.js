// client-app/pages/api/investments.js
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { featured, id } = req.query;
    const client = await pool.connect();
    try {
      let result;
      if (id) {
        // Ambil satu investasi berdasarkan ID
        result = await client.query('SELECT * FROM investments WHERE is_active = TRUE AND id = $1 LIMIT 1', [id]);
        if (result.rows.length > 0) {
          res.status(200).json(result.rows[0]);
        } else {
          res.status(404).json({ error: 'Produk investasi tidak ditemukan' });
        }
      } else {
        // Ambil semua atau yang featured
        let queryText = 'SELECT * FROM investments WHERE is_active = TRUE';
        const queryParams = [];
        if (featured) {
          queryText += ' AND is_featured = TRUE';
        }
        queryText += ' ORDER BY created_at DESC';
        result = await client.query(queryText, queryParams);
        res.status(200).json({ investments: result.rows });
      }
    } catch (err) {
      console.error('[API Investments] Error:', err.stack);
      res.status(500).json({ error: 'Gagal mengambil data investasi' });
    } finally {
      client.release();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}