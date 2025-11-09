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
    // 模擬 Notion 統計人數
    const mockNotionCounts = {
        "1": 5,
        "2": 10,
        "3": 3
    };

    // Cache 設定
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); 
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // 回傳符合前端邏輯的 Array 格式
    res.status(200).json(
        Object.entries(mockNotionCounts).map(([id, attendees]) => ({ id, attendees }))
    );
};
