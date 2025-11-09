// api/count.js

/**
 * Vercel Serverless Function (API 路由: /api/count)
 *
 * 此範例提供前端顯示即時人數的模擬資料。
 * 未來你可以改為連接 Notion API 或 n8n webhook，
 * 讓它自動回傳真實人數資料。
 */

export default async function handler(req, res) {
  // 模擬資料（暫時使用靜態數據）
  const mockNotionCounts = {
    "1": 5,
    "2": 10,
    "3": 3
  };

  // 禁止快取，確保前端每次都拿到最新
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // 回傳 JSON 格式資料給前端
  res.status(200).json(
    Object.entries(mockNotionCounts).map(([id, attendees]) => ({
      id,
      attendees
    }))
  );
}
