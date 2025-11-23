import mysql from 'mysql2/promise';

export default async function handler(req,res){
  try{
    const conn = await mysql.createConnection({
      host:'163.53.195.14',
      user:'chelsea',
      password:'chelsea',
      database:'dataanalis',
      port:3306
    });
    await conn.end();
    res.status(200).json({ok:true,message:'Koneksi MySQL berhasil dari Vercel'});
  }catch(e){
    res.status(500).json({ok:false,message:'Gagal koneksi MySQL: '+e.message});
  }
}
