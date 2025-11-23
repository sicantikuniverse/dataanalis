import formidable from 'formidable';
import xlsx from 'xlsx';
import mysql from 'mysql2/promise';

export const config = {
  api: { bodyParser: false }
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
        await connection.execute(
          `INSERT INTO penjualan (
            tanggal,kd_outlet,nm_outlet,no_doc,kd_sales,namasales,kelompok,merkbrand,namabrg,kode_iemi,qty,harga,jumlah,hpp,RL,mdrsupport,bank,grandtot,byrcash,byrgesek,adminbank,cashback,pwp,mdrnominal,admbyrcust,tukartambah,totomzet,programcashback,programpwp,ketmdr,no_reffbank,namamarket,Cust,namacust,alamat,kota,no_telp,email,keterangan,hargasrp,potongan
          ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
          )`,
          [
            row.tanggal,row.kd_outlet,row.nm_outlet,row.no_doc,row.kd_sales,row.namasales,row.kelompok,row.merkbrand,row.namabrg,row.kode_iemi,row.qty,row.harga,row.jumlah,row.hpp,row.RL,row.mdrsupport,row.bank,row.grandtot,row.byrcash,row.byrgesek,row.adminbank,row.cashback,row.pwp,row.mdrnominal,row.admbyrcust,row.tukartambah,row.totomzet,row.programcashback,row.programpwp,row.ketmdr,row.no_reffbank,row.namamarket,row.Cust,row.namacust,row.alamat,row.kota,row.no_telp,row.email,row.keterangan,row.hargasrp,row.potongan
          ]
        );
      }

      await connection.end();
      res.status(200).json({ message: 'Import Excel ke tabel penjualan berhasil!' });
    } catch (error) {
      res.status(500).json({ message: 'Database error: ' + error.message });
    }
  });
}
