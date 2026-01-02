export async function routeUpdate(update, env) {
  // Şimdilik test: Telegram'dan gelen mesajı yakalayıp cevap verelim
  const message = update?.message;
  if (!message?.text) return;

  // sadece DM
  if (message.chat?.type !== "private") return;

  const chatId = message.chat.id;
  const text = String(message.text || "").trim();

  // Telegram'a cevap
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `✅ Bot çalışıyor\nGönderdiğin: ${text}`
    })
  });
}
