// pages/api/navigators.js
export default async function handler(req, res) {
  try {
    const response = await fetch('https://repeat-taxi.app.n8n.cloud/webhook/navigators-json', {
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error('n8n webhook 錯誤或資料無法取得');
    }
    let data = await response.json();
    // 防呆處理：確保一定回傳陣列
    if (!Array.isArray(data)) {
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        data = [data];
      } else {
        data = [];
      }
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Navigators 錯誤:', error);
    return res.status(500).json({ error: String(error) });
  }
}
