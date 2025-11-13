// pages/api/count.js

export default async function handler(req, res) {
  try {
    // 從 n8n 取得完整課程 JSON
    const response = await fetch('https://repeat-taxi.app.n8n.cloud/webhook/courses-json', {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error('n8n webhook 錯誤或資料無法取得');
    }

    const data = await response.json();

    // ⭐★ 直接回傳完整資料（不要改格式！）
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    return res.status(200).json(data);

  } catch (error) {
    console.error('API Count 錯誤:', error);
    return res.status(500).json({ error: String(error) });
  }
}
