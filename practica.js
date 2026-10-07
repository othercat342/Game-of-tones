/* ===== PRÁCTICA: acordes, metrónomo, afinador y progresiones ===== */
const $ = id => document.getElementById(id);
const NOTE_NAMES = ["Do","Do#","Re","Re#","Mi","Fa","Fa#","Sol","Sol#","La","La#","Si"];
const QUAL = {
  M:   { iv: [0, 4, 7],     label: "" },
  m:   { iv: [0, 3, 7],     label: " menor" },
  "7": { iv: [0, 4, 7, 10], label: " séptima" },
  dim: { iv: [0, 3, 6],     label: " disminuido" }
};

// Usa el mismo AudioContext (ctx) que piano.js
function audio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}
const chordName  = (r, q) => NOTE_NAMES[r % 12] + QUAL[q].label;
const chordNotes = (r, q) => QUAL[q].iv.map(s => NOTE_NAMES[(r + s) % 12]).join(" · ");
function playChord(r, q) {
  QUAL[q].iv.forEach((s, i) => setTimeout(() => play(60 + r + s, 0.22), i * 45));
}

/* ---------- ACORDES ---------- */
let chordType = "M";
[["M","Mayor"],["m","Menor"],["7","Séptima"]].forEach(([q, label]) => {
  const b = document.createElement("button");
  b.textContent = label;
  b.setAttribute("aria-pressed", q === chordType);
  b.addEventListener("click", () => {
    chordType = q;
    [...$("chordTypes").children].forEach(x => x.setAttribute("aria-pressed", x === b));
  });
  $("chordTypes").appendChild(b);
});
NOTE_NAMES.forEach((n, i) => {
  const b = document.createElement("button");
  b.textContent = n;
  b.addEventListener("click", () => {
    playChord(i, chordType);
    $("chordInfo").textContent = `${chordName(i, chordType)} → ${chordNotes(i, chordType)}`;
  });
  $("chordRoots").appendChild(b);
});

/* ---------- METRÓNOMO ---------- */
let bpm = 100, beats = 4, running = false, nextTime = 0, beatIdx = 0, metroTimer = null;

function buildDots() {
  $("beatDots").innerHTML = Array.from({ length: beats }, () => "<i></i>").join("");
}
function flash(b) {
  [...$("beatDots").children].forEach((d, i) => d.classList.toggle("on", i === b));
}
function click(time, accent) {
  const c = audio(), o = c.createOscillator(), g = c.createGain();
  o.frequency.value = accent ? 1500 : 1000;
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(0.5, time + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
  o.connect(g).connect(c.destination);
  o.start(time);
  o.stop(time + 0.06);
}
function scheduler() {
  const c = audio();
  while (nextTime < c.currentTime + 0.1) {
    const b = beatIdx % beats, t = nextTime;
    click(t, b === 0);
    setTimeout(() => running && flash(b), Math.max(0, (t - c.currentTime) * 1000));
    nextTime += 60 / bpm;
    beatIdx++;
  }
}
function startMetro() {
  running = true; beatIdx = 0;
  nextTime = audio().currentTime + 0.05;
  metroTimer = setInterval(scheduler, 25);
  $("metroBtn").textContent = "Detener";
}
function stopMetro() {
  running = false;
  clearInterval(metroTimer);
  flash(-1);
  $("metroBtn").textContent = "Iniciar";
}
function setBpm(v) {
  bpm = Math.max(30, Math.min(240, Math.round(v)));
  $("bpm").value = bpm;
  $("bpmOut").textContent = bpm;
}
$("bpm").addEventListener("input", e => setBpm(+e.target.value));
$("beatsSel").addEventListener("change", e => { beats = +e.target.value; beatIdx = 0; buildDots(); });
$("metroBtn").addEventListener("click", () => (running ? stopMetro() : startMetro()));

let taps = [];
$("tapBtn").addEventListener("click", () => {
  const now = performance.now();
  if (taps.length && now - taps[taps.length - 1] > 2000) taps = [];
  taps.push(now);
  taps = taps.slice(-6);
  if (taps.length >= 2) {
    const gaps = taps.slice(1).map((t, i) => t - taps[i]);
    setBpm(60000 / (gaps.reduce((a, b) => a + b, 0) / gaps.length));
  }
});
buildDots();

/* ---------- AFINADOR ---------- */
// Autocorrelación: devuelve la frecuencia en Hz o -1 si no hay sonido claro
function detectPitch(buf, sr) {
  let rms = 0;
  for (const v of buf) rms += v * v;
  if (Math.sqrt(rms / buf.length) < 0.01) return -1;
  let r1 = 0, r2 = buf.length - 1;
  for (let i = 0; i < buf.length / 2; i++) if (Math.abs(buf[i]) < 0.2) { r1 = i; break; }
  for (let i = 1; i < buf.length / 2; i++) if (Math.abs(buf[buf.length - i]) < 0.2) { r2 = buf.length - i; break; }
  const b = buf.slice(r1, r2), n = b.length, c = new Array(n).fill(0);
  for (let i = 0; i < n; i++) for (let j = 0; j < n - i; j++) c[i] += b[j] * b[j + i];
  let d = 0;
  while (d < n - 1 && c[d] > c[d + 1]) d++;
  let maxv = -1, maxp = -1;
  for (let i = d; i < n; i++) if (c[i] > maxv) { maxv = c[i]; maxp = i; }
  if (maxp <= 0 || maxp >= n - 1) return -1;
  const a = (c[maxp - 1] + c[maxp + 1] - 2 * c[maxp]) / 2, s = (c[maxp + 1] - c[maxp - 1]) / 2;
  return sr / (a ? maxp - s / (2 * a) : maxp);
}

let tStream = null, tRaf = 0, tAnalyser, tBuf;
function tunerLoop() {
  tAnalyser.getFloatTimeDomainData(tBuf);
  const f = detectPitch(tBuf, ctx.sampleRate);
  if (f > 60 && f < 1500) {
    const m = 69 + 12 * Math.log2(f / 440), r = Math.round(m), cents = (m - r) * 100;
    $("tNote").textContent = NOTE_NAMES[((r % 12) + 12) % 12] + (Math.floor(r / 12) - 1);
    $("tNeedle").style.left = 50 + Math.max(-50, Math.min(50, cents)) + "%";
    const ok = Math.abs(cents) < 6;
    $("tStatus").textContent = ok ? "¡Afinado!" : (cents > 0 ? "Un poco alta: aflojá" : "Un poco baja: ajustá más");
    $("tNote").classList.toggle("ok", ok);
  }
  tRaf = requestAnimationFrame(tunerLoop);
}
async function startTuner() {
  try {
    const c = audio();
    tStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
    });
    tAnalyser = c.createAnalyser();
    tAnalyser.fftSize = 2048;
    c.createMediaStreamSource(tStream).connect(tAnalyser); // sin salida: no hay eco
    tBuf = new Float32Array(tAnalyser.fftSize);
    $("tStatus").textContent = "Escuchando…";
    $("tunerBtn").textContent = "Apagar";
    tunerLoop();
  } catch (e) {
    $("tStatus").textContent = "No pude usar el micrófono. Revisá el permiso del navegador (hace falta HTTPS).";
  }
}
function stopTuner() {
  cancelAnimationFrame(tRaf);
  if (tStream) tStream.getTracks().forEach(t => t.stop());
  tStream = null;
  $("tNote").textContent = "—";
  $("tNote").classList.remove("ok");
  $("tNeedle").style.left = "50%";
  $("tStatus").textContent = "Apagado";
  $("tunerBtn").textContent = "Activar micrófono";
}
$("tunerBtn").addEventListener("click", () => (tStream ? stopTuner() : startTuner()));
$("tNeedle").style.left = "50%";

/* ---------- PROGRESIONES ---------- */
const SCALE = { M: [0, 2, 4, 5, 7, 9, 11], m: [0, 2, 3, 5, 7, 8, 10] };
const DEG_Q = { M: ["M","m","m","M","M","m","dim"], m: ["m","dim","M","m","m","M","M"] };
const PRESETS = [
  { name: "Pop (I–V–vi–IV)",        mode: "M", deg: [1, 5, 6, 4] },
  { name: "Clásica (I–IV–V–I)",     mode: "M", deg: [1, 4, 5, 1] },
  { name: "Años 50 (I–vi–IV–V)",    mode: "M", deg: [1, 6, 4, 5] },
  { name: "Jazz (ii–V–I)",          mode: "M", deg: [2, 5, 1] },
  { name: "Menor (i–VI–III–VII)",   mode: "m", deg: [1, 6, 3, 7] },
  { name: "Rock menor (i–VII–VI–VII)", mode: "m", deg: [1, 7, 6, 7] }
];
NOTE_NAMES.forEach((n, i) => $("progKey").add(new Option(n, i)));
PRESETS.forEach((p, i) => $("progPreset").add(new Option(p.name, i)));

let progChords = [], progTimer = null, progPos = 0;
function buildProg() {
  const p = PRESETS[+$("progPreset").value], key = +$("progKey").value;
  progChords = p.deg.map(d => ({ root: (key + SCALE[p.mode][d - 1]) % 12, q: DEG_Q[p.mode][d - 1] }));
  $("progChords").innerHTML = "";
  progChords.forEach((c, i) => {
    const b = document.createElement("button");
    b.innerHTML = `<strong>${chordName(c.root, c.q)}</strong><small>${chordNotes(c.root, c.q)}</small>`;
    b.addEventListener("click", () => playChord(c.root, c.q));
    $("progChords").appendChild(b);
  });
}
function lightProg(i) {
  [...$("progChords").children].forEach((b, j) => b.classList.toggle("on", j === i));
}
function stopProg() {
  clearTimeout(progTimer);
  lightProg(-1);
  $("progPlay").textContent = "Escuchar";
}
function playProg() {
  stopProg();
  progPos = 0;
  $("progPlay").textContent = "Detener";
  const step = (60000 / bpm) * 2;
  const tick = () => {
    const c = progChords[progPos];
    lightProg(progPos);
    playChord(c.root, c.q);
    progPos++;
    if (progPos >= progChords.length) {
      if ($("progLoop").checked) progPos = 0;
      else { progTimer = setTimeout(stopProg, step); return; }
    }
    progTimer = setTimeout(tick, step);
  };
  tick();
}
$("progKey").addEventListener("change", () => { stopProg(); buildProg(); });
$("progPreset").addEventListener("change", () => { stopProg(); buildProg(); });
$("progPlay").addEventListener("click", () => ($("progPlay").textContent === "Detener" ? stopProg() : playProg()));
$("progRandom").addEventListener("click", () => {
  stopProg();
  $("progKey").value = Math.floor(Math.random() * 12);
  $("progPreset").value = Math.floor(Math.random() * PRESETS.length);
  buildProg();
  playProg();
});
buildProg();

/* Al salir de Práctica se apaga todo (micrófono incluido) */
document.addEventListener("slotchange", e => {
  if (e.detail !== "practica") { stopMetro(); stopTuner(); stopProg(); }
});
