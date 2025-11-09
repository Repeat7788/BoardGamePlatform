// api/count.js
export default async function handler(req, res) {
  // 模擬資料（可改成從 Notion 抓資料）
  const mockNotionCounts = {
    "1": 5,
    "2": 10,
    "3": 1
  };

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.status(200).json(
    Object.entries(mockNotionCounts).map(([id, attendees]) => ({
      id,
      attendees
    }))
  );
}
