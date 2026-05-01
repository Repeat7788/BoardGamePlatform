export default async function handler(req, res) {
  try {
    const response = await fetch('https://repeat-taxi.app.n8n.cloud/webhook/wishes-json', {
      cache: "no-store"
    });
    if (!response.ok) throw new Error('n8n webhook 錯誤');
    let data = await response.json();
    if (!Array.isArray(data)) {
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        data = [data];
      } else {
        data = [];
      }
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Wishes 錯誤:', error);
    return res.status(200).json([]);
  }
}
