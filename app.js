/* ===== DATOS DE LOS ARTISTAS =====
   ytId: ID del video de YouTube (lo que va después de "v=" en la URL).
   Si queda vacío, se muestra un botón que busca la canción en YouTube. */
const ARTISTS = [
  {
    name: "Cuarteto de Nos",
    meta: "Montevideo, Uruguay · desde 1980",
    color: "#ffd23f",
    bio: [
      "El Cuarteto de Nos nació en Montevideo en 1980 y es una de las bandas más queridas del rock uruguayo. Su voz principal y compositor es Roberto Musso.",
      "Se hicieron conocidos por letras irónicas, humor negro y observaciones raras de la vida cotidiana. Con los años pasaron de ser una banda de culto en Uruguay a llenar estadios en toda Latinoamérica.",
      "Su disco más recordado es «Raro» (2006), el que los lanzó a un público masivo en la región."
    ],
    album: "Raro (2006)",
    song: "Yendo a la casa de Damián",
    ytId: ""
  },
  {
    name: "Indio Solari",
    meta: "Paraná, Argentina · nació en 1949",
    color: "#7bdff2",
    bio: [
      "Carlos Alberto «Indio» Solari nació en Paraná, Entre Ríos. Fue la voz y el letrista de Patricio Rey y sus Redonditos de Ricota, banda formada en La Plata en 1976 que se separó en 2001.",
      "Los Redondos construyeron una escena propia, lejos de los medios, con recitales multitudinarios y un público fiel. Después Solari siguió en solitario con los Fundamentalistas del Aire Acondicionado.",
      "Sus letras mezclan poesía callejera, imágenes surrealistas y crítica social, y marcaron a varias generaciones del rock argentino."
    ],
    album: "Un baión para el ojo idiota (1988)",
    song: "Ji ji ji",
    ytId: ""
  },
  {
    name: "Milo J",
    meta: "Buenos Aires, Argentina · nació en 2006",
    color: "#ff7a90",
    bio: [
      "Milo J (Milo Joaquín Lezcano) empezó a rimar siendo muy chico y se hizo conocido con videos de freestyle y trap en internet.",
      "Su estilo combina rap, trap, folklore y guitarras acústicas, con letras sobre su barrio, la familia y crecer rápido. En 2023 grabó una Music Session con Bizarrap que lo hizo conocido en todo el mundo hispanohablante.",
      "Es una de las voces más jóvenes y escuchadas de la nueva música argentina."
    ],
    album: "La vida era más corta (2023)",
    song: "M.A.I",
    ytId: ""
  },
  {
    name: "Callejeros",
    meta: "Buenos Aires, Argentina · desde 1995",
    color: "#b69cff",
    bio: [
      "Callejeros se formó en Buenos Aires en 1995 con una mezcla de rock barrial, reggae y ska. Su cantante es Patricio «Pato» Fontanet.",
      "A principios de los 2000 se volvieron una banda muy popular entre los jóvenes, con letras sobre la calle, la amistad y la vida en el barrio.",
      "El 30 de diciembre de 2004, durante un recital en República Cromañón, un incendio causó la muerte de 194 personas. Es una de las mayores tragedias de la historia argentina y su recuerdo sigue muy presente.",
      "«Rocanroles sin destino» (2004) es el disco por el que más se los recuerda."
    ],
    album: "Rocanroles sin destino (2004)",
    song: "Una nueva noche fatal",
    ytId: ""
  }
];

/* ===== NOTAS ===== */
const NOTES = [["Do","C"],["Re","D"],["Mi","E"],["Fa","F"],["Sol","G"],["La","A"],["Si","B"]];
document.getElementById("noteList").innerHTML =
  NOTES.map(([n, l]) => `<li><b>${n}</b><span>letra ${l}</span></li>`).join("");

/* ===== PIANO (Web Audio) ===== */
const KEYS = [
  { n: "Do",  midi: 60, k: "a" }, { n: "Do#", midi: 61, k: "w", black: 12.5 },
  { n: "Re",  midi: 62, k: "s" }, { n: "Re#", midi: 63, k: "e", black: 25 },
  { n: "Mi",  midi: 64, k: "d" },
  { n: "Fa",  midi: 65, k: "f" }, { n: "Fa#", midi: 66, k: "t", black: 50 },
  { n: "Sol", midi: 67, k: "g" }, { n: "Sol#",midi: 68, k: "y", black: 62.5 },
  { n: "La",  midi: 69, k: "h" }, { n: "La#", midi: 70, k: "u", black: 75 },
  { n: "Si",  midi: 71, k: "j" },
  { n: "Do",  midi: 72, k: "k" }
];

let ctx;
function play(midi) {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator(), gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = 440 * Math.pow(2, (midi - 69) / 12);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 1.3);
}

const pianoEl = document.getElementById("piano");
const playedEl = document.getElementById("played");
const history = [];
const keyEls = {};

KEYS.forEach(key => {
  const el = document.createElement("button");
  el.className = "key" + (key.black ? " black" : "");
  el.textContent = key.n;
  el.setAttribute("aria-label", key.n);
  if (key.black) el.style.left = key.black + "%";
  el.addEventListener("pointerdown", () => hit(key));
  pianoEl.appendChild(el);
  keyEls[key.k] = { el, key };
});

function hit(key) {
  play(key.midi);
  const el = keyEls[key.k].el;
  el.classList.add("on");
  setTimeout(() => el.classList.remove("on"), 180);
  history.push(key.n);
  if (history.length > 12) history.shift();
  playedEl.textContent = "Tocaste: " + history.join(" · ");
}

document.addEventListener("keydown", e => {
  if (e.repeat || e.ctrlKey || e.metaKey) return;
  const hitKey = keyEls[e.key.toLowerCase()];
  if (hitKey) hit(hitKey.key);
});

/* ===== ARTISTAS ===== */
const tabs = document.getElementById("tabs");
const bio = document.getElementById("bio");
const player = document.getElementById("player");
const vinyl = document.getElementById("vinyl");

ARTISTS.forEach((a, i) => {
  const b = document.createElement("button");
  b.textContent = a.name;
  b.setAttribute("role", "tab");
  b.setAttribute("aria-selected", "false");
  b.addEventListener("click", () => select(i));
  tabs.appendChild(b);
});

function select(i) {
  const a = ARTISTS[i];
  document.documentElement.style.setProperty("--accent", a.color);
  [...tabs.children].forEach((b, j) => b.setAttribute("aria-selected", j === i));
  bio.innerHTML = `<h3>${a.name}</h3><p class="meta">${a.meta}</p>` +
    a.bio.map(p => `<p>${p}</p>`).join("");
  vinyl.classList.add("spin");

  const q = encodeURIComponent(`${a.name} ${a.song}`);
  const media = a.ytId
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${a.ytId}?autoplay=1" title="${a.song}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    : `<a class="btn" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Escuchar en YouTube</a>`;
  player.innerHTML = `<p class="now">Sonando de «${a.album}»: <strong>${a.song}</strong></p>${media}`;
}
