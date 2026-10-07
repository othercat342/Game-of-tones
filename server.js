const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
// "gemini-flash-latest" es un alias de Google que apunta al Flash más nuevo.
// Si querés fijar uno, definí GEMINI_MODEL en Railway (ej: gemini-3.7-flash).
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const ARTISTS_OK = [
  "Cuarteto de Nos", "Indio Solari", "Milo J", "Callejeros", "Soda Stereo",
  "Luis Alberto Spinetta", "Mercedes Sosa", "Astor Piazzolla", "Rubén Rada",
  "Jorge Drexler", "Los Palmeras"
];

app.set("trust proxy", 1);
app.use(express.json({ limit: "10kb" }));

const SYSTEM = `Sos Cuartetito, el guía musical de la página "Surco". Hablás en español rioplatense (voseo), con calidez y un toque de humor, como un amigo que sabe de música.
Ayudás con: notas y teoría básica (escalas, acordes, ritmo), historia de la música, y los artistas de la página: Cuarteto de Nos, Indio Solari, Milo J, Callejeros, Soda Stereo, Luis Alberto Spinetta, Mercedes Sosa, Astor Piazzolla, Rubén Rada, Jorge Drexler y Los Palmeras. También de géneros como tango, folklore, candombe, murga y cumbia.
Reglas:
- Respuestas cortas: máximo unas 120 palabras, sin listas largas.
- Si no estás seguro de un dato, decilo; no inventes fechas, discos ni letras.
- No reproduzcas letras de canciones; podés comentar de qué tratan.
- Sobre Callejeros y la tragedia de Cromañón hablá con respeto y sin morbo.
- Rubén Rada, Mercedes Sosa, Luis Alberto Spinetta, Astor Piazzolla y Gustavo Cerati fallecieron: hablá de ellos en pasado.
- Si te preguntan algo que no tiene que ver con música, respondé breve y volvé amablemente al tema musical.`;

const PROFE = `
MODO PROFE ACTIVADO: ahora sos un profe de música paciente. Cuando te pidan ejercicios o una rutina:
- Armá ejercicios concretos y cortos: qué tocar (acordes con nombres como Do, Sol, La menor), a cuántos BPM, cuánto tiempo y cómo saber si salió bien.
- Pensalos para las herramientas de la página: el Piano, y en Práctica los acordes, el metrónomo, el afinador y las progresiones.
- Si no sabés el nivel de la persona, asumí principiante y ofrecé subir la dificultad al final.
- Podés usar una lista numerada corta (hasta unos 180 palabras en total).
- Si el ejercicio se inspira en un artista, usá su estilo o su tempo general, pero NO afirmes cuáles son los acordes reales de sus canciones; aclará que es orientativo.`;

function buildSystem(artist, mode) {
  let s = SYSTEM;
  if (artist) {
    s += `\nContexto: la persona estuvo leyendo la biografía de "${artist}" en la sección Artistas. Si pregunta algo ambiguo ("este artista", "su disco", "contame más"), asumí que habla de ${artist}. No lo menciones si no viene al caso.`;
  }
  if (mode === "profe") s += PROFE;
  return s;
}

// Límite simple: 15 mensajes por minuto por IP
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < 60000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 15;
}

// Lee el stream (SSE) del proveedor y reenvía solo el texto al navegador.
// "extract" saca el texto de cada evento según el proveedor (Gemini o Claude).
async function streamText(apiRes, res, extract) {
  const reader = apiRes.body.getReader();
  res.on("close", () => reader.cancel().catch(() => {}));
  const dec = new TextDecoder();
  let buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop();
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const json = line.slice(5).trim();
      if (!json) continue;
      try {
        const ev = JSON.parse(json);
        if (ev.error || ev.type === "error") console.error("Stream error:", ev);
        const t = extract(ev);
        if (t) res.write(t);
      } catch (_) { /* línea incompleta o ajena: se ignora */ }
    }
  }
}

const extractGemini = ev => {
  const parts = (ev.candidates && ev.candidates[0] && ev.candidates[0].content && ev.candidates[0].content.parts) || [];
  return parts.filter(p => p.text && !p.thought).map(p => p.text).join("");
};
const extractClaude = ev =>
  ev.type === "content_block_delta" && ev.delta && ev.delta.type === "text_delta" ? ev.delta.text : "";

app.post("/api/chat", async (req, res) => {
  const useGemini = !!process.env.GEMINI_API_KEY;
  if (!useGemini && !process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "Falta configurar GEMINI_API_KEY (o ANTHROPIC_API_KEY) en el servidor." });
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

  // El contexto solo se acepta si es uno de los artistas conocidos
  const artist = ARTISTS_OK.includes(req.body.artist) ? req.body.artist : null;
  const mode = req.body.mode === "profe" ? "profe" : "charla";

  try {
    const system = buildSystem(artist, mode);
    let r, extract;
    if (useGemini) {
      r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse`,
        {
          method: "POST",
          headers: { "content-type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: system }] },
            contents: messages.map(m => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }]
            })),
            // margen amplio: en modelos con "razonamiento" parte de los tokens se usa pensando
            generationConfig: { maxOutputTokens: mode === "profe" ? 2000 : 1200 }
          })
        }
      );
      extract = extractGemini;
    } else {
      r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: ANTHROPIC_MODEL,
          max_tokens: mode === "profe" ? 700 : 400,
          system,
          messages,
          stream: true
        })
      });
      extract = extractClaude;
    }
    if (!r.ok) {
      console.error("Error de la API:", r.status, await r.text());
      return res.status(502).json({ error: "La IA no respondió." });
    }
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no"
    });
    await streamText(r, res, extract);
    res.end();
  } catch (err) {
    console.error(err);
    if (res.headersSent) res.end();
    else res.status(502).json({ error: "La IA no respondió." });
  }
});

app.use(express.static(path.join(__dirname)));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
