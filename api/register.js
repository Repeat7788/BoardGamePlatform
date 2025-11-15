export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const secret = process.env.X_TAXI_SECRET;

    const r = await fetch("https://repeat-taxi.app.n8n.cloud/webhook/group-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-taxi-secret": secret
      },
      body: JSON.stringify(req.body)
    });

    const data = await r.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("❌ API register error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
