/**
 * Vercel Serverless Function (API 路由: /api/count)
 *
 * 【重要提醒】
 * 這是為了讓前端「即時人數」功能能夠運作而建立的【模擬數據】。
 * 在真實部署中，您最終需要將此檔案替換為呼叫 Notion API 或 n8n 統計 Webhook 的實際程式碼。
 *
 * @param {import('@vercel/node').VercelRequest} req 
 * @param {import('@vercel/node').VercelResponse} res 
 */
module.exports = async (req, res) => {
    // 這裡的數字模擬了您的 Notion 資料庫中，每個 Course ID (1, 2, 3) 的報名人數
    const mockNotionCounts = {
        "1": 5, // 11/10 場次: 假設目前有 5 人報名
        "2": 10, // 11/12 場次: 假設目前有 10 人報名
        "3": 3   // 11/15 場次: 假設目前有 3 人報名
    };
    
    // 設定 Cache-Control 讓瀏覽器不要快取這個 API (強制每 10 秒去抓新數據)
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); 
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // 回傳 JSON 格式的統計資料
    res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        counts: mockNotionCounts
    });
};
