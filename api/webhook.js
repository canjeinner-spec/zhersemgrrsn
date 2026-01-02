export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(200).send("OK");
      return;
    }

    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString("utf8");
    const update = raw ? JSON.parse(raw) : {};

    const chatId = update?.message?.chat?.id;
    const text = update?.message?.text;

    if (!chatId || !text) {
      res.status(200).send("OK");
      return;
    }

    // sadece DM
    if (update.message.chat.type !== "private") {
      res.status(200).send("OK");
      return;
    }

    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: `✅ Çalıştı: ${text}` })
    });

    res.status(200).send("OK");
  } catch (e) {
    res.status(200).send("OK");
  }
}
