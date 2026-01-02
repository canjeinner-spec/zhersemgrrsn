import { routeUpdate } from "../src/router/index.js";

async function tgSend(env, chatId, text) {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
  return r.json();
}

export default async function handler(req, res) {
  try {
    // ✅ GET test: tarayıcıdan açınca ADMIN'e mesaj atsın
    if (req.method === "GET") {
      const adminId = envOr(req)?.ADMIN_ID || process.env.ADMIN_ID;
      const env = process.env;

      const out = await tgSend(env, adminId, "✅ Vercel env + Telegram token çalışıyor (GET test).");
      res.status(200).json({ ok: true, sent: out });
      return;
    }

    if (req.method !== "POST") {
      res.status(200).send("OK");
      return;
    }

    // ✅ POST body'yi sağlam oku (Vercel'de en garantisi)
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString("utf8");
    const update = raw ? JSON.parse(raw) : {};

    await routeUpdate(update, process.env);

    res.status(200).send("OK");
  } catch (e) {
    // Telegram tekrar denemesin diye 200
    res.status(200).send("OK");
  }
}

function envOr(req) {
  // boş, sadece kalsın
  return null;
}
