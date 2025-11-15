export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const secret = process.env.X_TAXI_SECRET;
  if (!secret) {
    console.error("❌ Missing X_TAXI_SECRET environment variable");
    return res.status(500).json({ error: "Server config error" });
  }

  try {
    const r = await fetch("https://repeat-taxi.app.n8n.cloud/webhook/group-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-taxi-secret": secret
      },
      body: JSON.stringify(req.body)
    });

    if (!r.ok) {
      const text = await r.text();
      console.error("❌ n8n webhook error:", text);
      return res.status(502).json({ error: "Upstream service error" });
    }

    const data = await r.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("❌ API register error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
