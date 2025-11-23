import formidable from 'formidable';
import xlsx from 'xlsx';
import mysql from 'mysql2/promise';

export const config = {
  api: {
    bodyParser: false, // wajib untuk upload file
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: 'Upload gagal' });

    const file = files.file;
    const workbook = xlsx.readFile(file.filepath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    try {
      const connection = await mysql.createConnection({
        host: '163.53.195.14',   // IP atau host database
  	user: 'chelsea',         // username database
 	password: 'chelsea',     // password database
 	database: 'dataanalis',        // nama database
      });

      for (const row of data) {
        // ganti nama kolom sesuai tabelmu
        await connection.execute(
          'INSERT INTO my_table (name, age, city) VALUES (?, ?, ?)',
          [row.name, row.age, row.city]
        );
      }

      await connection.end();
      res.status(200).json({ message: 'Import Excel berhasil!' });
    } catch (error) {
      res.status(500).json({ message: 'Database error: ' + error.message });
    }
  });
}
