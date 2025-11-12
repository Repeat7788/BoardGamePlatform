// pages/api/count.js  (Next.js or Vercel serverless)

export default async function handler(req, res) {
  try {
    // 從 n8n 的 webhook/courses-json 取得最新課程資料
    const response = await fetch('https://repeat-taxi.app.n8n.cloud/webhook/courses-json', { cache: "no-store" });
    if (!response.ok) {
      throw new Error('n8n webhook 錯誤或資料無法取得');
    }
    const data = await response.json();

    // 轉為前端需要的 id+attendees 結構
    const result = Array.isArray(data)
      ? data.map(item => ({
          id: item.id,
          attendees: item.currentAttendees ?? 0
        }))
      : [];

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.status(200).json(result);

  } catch (error) {
    console.error('API Count 錯誤:', error);
    res.status(500).json({ error: String(error) });
  }
}
