import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const connection = await mysql.createConnection({
      host: '163.53.195.14', // IP CloudRaya
      port: 3306,             // port MySQL
      user: 'chelsea',
      password: 'chelsea',
      database: 'dataanalis'
    });

    await connection.end();

    res.status(200).json({ ok: true, message: 'Koneksi MySQL berhasil dari Vercel!' });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Gagal koneksi MySQL dari Vercel: ' + err.message });
  }
}
