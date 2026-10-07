/* ===== CUARTETITO: chat con IA (streaming, contexto y modo profe) ===== */
const msgsEl = document.getElementById("msgs");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const chipsEl = document.getElementById("chips");
const ctxPill = document.getElementById("ctxPill");
const profeBtn = document.getElementById("profeBtn");
const profeHint = document.getElementById("profeHint");
const convo = [];
let profe = false;

const openArtist = () => (typeof currentArtist !== "undefined" ? currentArtist : null);

function addMsg(text, cls) {
  const d = document.createElement("div");
  d.className = "msg " + cls;
  d.textContent = text;
  msgsEl.appendChild(d);
  msgsEl.scrollTop = msgsEl.scrollHeight;
  return d;
}

function refreshUI() {
  const a = openArtist();
  ctxPill.hidden = !a;
  ctxPill.textContent = a ? "Viendo: " + a : "";
  profeHint.hidden = !profe;
  const list = profe
    ? ["Armame 3 acordes para tocar hoy", "Una rutina de 10 minutos", "Un ejercicio para entrenar el oído"]
    : ["¿Cómo armo un acorde mayor?", "¿Cómo nació el rock argentino?", "Recomendame algo parecido al Cuarteto de Nos"];
  if (a) list.unshift(profe ? `Un ejercicio inspirado en ${a}` : `Contame más sobre ${a}`);
  chipsEl.innerHTML = "";
  list.slice(0, 4).forEach(t => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = t;
    b.addEventListener("click", () => ask(t));
    chipsEl.appendChild(b);
  });
}

async function ask(text) {
  if (sendBtn.disabled) return;
  addMsg(text, "me");
  convo.push({ role: "user", content: text });
  const bot = addMsg("", "bot typing");
  sendBtn.disabled = true;
  msgsEl.setAttribute("aria-busy", "true");
  let full = "";
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: convo.slice(-10),
        artist: openArtist(),
        mode: profe ? "profe" : "charla"
      })
    });
    if (!res.ok) {
      let msg = "";
      try { msg = (await res.json()).error; } catch (_) {}
      const e = new Error(msg); e.server = !!msg; throw e;
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      full += dec.decode(value, { stream: true });
      bot.textContent = full;
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }
    if (!full.trim()) throw new Error("vacío");
    convo.push({ role: "assistant", content: full });
  } catch (err) {
    if (full.trim()) {
      convo.push({ role: "assistant", content: full }); // se cortó a mitad: guardamos lo que llegó
    } else {
      bot.textContent = err.server ? err.message : "Uy, me quedé sin voz un momento. Probá de nuevo en unos segundos.";
      convo.pop();
    }
  } finally {
    bot.classList.remove("typing");
    sendBtn.disabled = false;
    msgsEl.removeAttribute("aria-busy");
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }
}

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = "";
  ask(text);
});

profeBtn.addEventListener("click", () => {
  profe = !profe;
  profeBtn.setAttribute("aria-pressed", profe);
  addMsg(profe
    ? "Modo profe activado. Pedime ejercicios y te los armo con las herramientas de Práctica. Contame tu nivel si querés que los ajuste."
    : "Volvimos al modo charla.", "bot");
  refreshUI();
});

// Al volver al chat se actualiza el artista que estabas viendo
document.addEventListener("slotchange", e => { if (e.detail === "cuartetito") refreshUI(); });

addMsg("¡Hola! Soy Cuartetito. Preguntame sobre notas, acordes, historia de la música o los artistas de esta página.", "bot");
refreshUI();
