export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const r = await fetch("https://repeat-taxi.app.n8n.cloud/webhook/wish-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    if (!r.ok) {
      return res.status(502).json({ error: "Upstream service error" });
    }
    const data = await r.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API wish-submit error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
