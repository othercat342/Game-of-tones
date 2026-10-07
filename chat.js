/* ===== CUARTETITO: chat con IA (usa /api/chat del servidor) ===== */
const msgsEl = document.getElementById("msgs");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const convo = [];

function addMsg(text, who) {
  const d = document.createElement("div");
  d.className = "msg " + who;
  d.textContent = text;
  msgsEl.appendChild(d);
  msgsEl.scrollTop = msgsEl.scrollHeight;
  return d;
}

async function ask(text) {
  addMsg(text, "me");
  convo.push({ role: "user", content: text });
  const wait = addMsg("Cuartetito está pensando…", "bot");
  sendBtn.disabled = true;
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: convo.slice(-10) })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error");
    wait.textContent = data.reply;
    convo.push({ role: "assistant", content: data.reply });
  } catch (err) {
    wait.textContent = "Uy, me quedé sin voz un momento. Probá de nuevo en unos segundos.";
    convo.pop();
  } finally {
    sendBtn.disabled = false;
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }
}

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text || sendBtn.disabled) return;
  chatInput.value = "";
  ask(text);
});

document.querySelectorAll("[data-ask]").forEach(b =>
  b.addEventListener("click", () => ask(b.dataset.ask)));

addMsg("¡Hola! Soy Cuartetito. Preguntame sobre notas, acordes, historia de la música o los artistas de esta página.", "bot");
