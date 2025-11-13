export default async function handler(req, res) {
  // 安全驗證：你自己設定的 secret
  const secret = process.env.REVALIDATE_SECRET;

  if (req.query.secret !== secret) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  try {
    // 重新驗證 /api/courses.json
    await res.revalidate('/api/courses.json');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ error: "Revalidate failed", details: err });
  }
}
