import { routeUpdate } from "../src/router/index.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(200).send("OK");
      return;
    }

    let update = req.body;
    if (typeof update === "string") update = JSON.parse(update);

    await routeUpdate(update, process.env);
    res.status(200).send("OK");
  } catch (e) {
    res.status(200).send("ERR: " + (e?.message || "unknown"));
  }
}
