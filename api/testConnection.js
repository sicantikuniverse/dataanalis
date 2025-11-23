import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const connection = await mysql.createConnection({
      host: '163.53.195.14',
      user: 'chelsea',
      password: 'chelsea',
      database: 'dataanalis',
      port: 3306
    });

    await connection.end();

    return res.status(200).json({ ok: true, message: 'Koneksi MySQL berhasil!' });

  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Koneksi gagal: ' + err.message });
  }
}
