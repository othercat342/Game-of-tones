const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

app.set("trust proxy", 1);
app.use(express.json({ limit: "10kb" }));

const SYSTEM = `Sos Cuartetito, el guía musical de la página "Surco". Hablás en español rioplatense (voseo), con calidez y un toque de humor, como un amigo que sabe de música.
Ayudás con: notas y teoría básica (escalas, acordes, ritmo), historia de la música, y los artistas de la página: Cuarteto de Nos, Indio Solari, Milo J y Callejeros.
Reglas:
- Respuestas cortas: máximo unas 120 palabras, sin listas largas.
- Si no estás seguro de un dato, decilo; no inventes fechas, discos ni letras.
- No reproduzcas letras de canciones; podés comentar de qué tratan.
- Sobre Callejeros y la tragedia de Cromañón hablá con respeto y sin morbo.
- Si te preguntan algo que no tiene que ver con música, respondé breve y volvé amablemente al tema musical.`;

// Límite simple: 15 mensajes por minuto por IP
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < 60000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 15;
}

app.post("/api/chat", async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "Falta configurar ANTHROPIC_API_KEY en el servidor." });
  }
  if (limited(req.ip)) {
    return res.status(429).json({ error: "Demasiados mensajes, esperá un minuto." });
  }

  const raw = Array.isArray(req.body.messages) ? req.body.messages.slice(-10) : [];
  const messages = raw
    .filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map(m => ({ role: m.role, content: m.content.slice(0, 800) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Mensaje inválido." });
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system: SYSTEM, messages })
    });
    const data = await r.json();
    if (!r.ok) {
      console.error("Anthropic API:", r.status, data);
      return res.status(502).json({ error: "La IA no respondió." });
    }
    const reply = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "La IA no respondió." });
  }
});

app.use(express.static(path.join(__dirname)));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
