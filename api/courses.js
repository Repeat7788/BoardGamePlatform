export default async function handler(req, res) {
  try {
    // 抓 n8n 的 JSON（無快取）
    const response = await fetch(
      'https://repeat-taxi.app.n8n.cloud/webhook/courses-json',
      { cache: "no-store" }
    );

    if (!response.ok) throw new Error("n8n 無法回應");

    const data = await response.json();

    // 設定 cache-control 讓 revalidate 生效
    res.setHeader("Cache-Control", "s-maxage=0, stale-while-revalidate=3600");

    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load data" });
  }
}
