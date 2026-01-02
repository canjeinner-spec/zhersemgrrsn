module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(200).send("OK");
      return;
    }

    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const update = body ? JSON.parse(body) : {};

      if (update.message && update.message.chat) {
        const chatId = update.message.chat.id;
        const text = update.message.text || "";

        await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: `🟢 Geldi: ${text}`
            })
          }
        );
      }

      res.status(200).send("OK");
    });
  } catch (e) {
    res.status(200).send("OK");
  }
};
