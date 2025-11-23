export default async function handler(req,res){
  try {
    const response = await fetch('http://163.53.195.14:80');
    res.status(200).json({ ok: true, status: response.status });
  } catch(e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
