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
    const { slug, limit } = req.query;

    try {
      const client = await pool.connect();
      let result;

      if (slug) {
        // Ambil satu post berdasarkan slug
        result = await client.query(
          'SELECT id, title, slug, content, is_published, created_at, updated_at FROM posts WHERE slug = $1 AND is_published = TRUE LIMIT 1',
          [slug]
        );
        client.release();
        if (result.rows.length > 0) {
          res.status(200).json(result.rows[0]);
        } else {
          res.status(404).json({ error: 'Post tidak ditemukan atau belum dipublikasikan' });
        }
      } else {
        // Ambil semua post yang sudah dipublikasikan, dengan opsi limit
        let queryText = 'SELECT id, title, slug, content, is_published, created_at, updated_at FROM posts WHERE is_published = TRUE ORDER BY created_at DESC';
        const queryParams = [];
        if (limit && parseInt(limit) > 0) {
          queryText += ` LIMIT $1`;
          queryParams.push(parseInt(limit));
        }
        result = await client.query(queryText, queryParams);
        client.release();
        res.status(200).json({ posts: result.rows });
      }
    } catch (err) {
      console.error('[API Posts] Error koneksi atau query database:', err.stack);
      if (client) client.release(); // Pastikan client dilepas jika sudah terhubung
      res.status(500).json({ error: 'Gagal mengambil data post dari database' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}