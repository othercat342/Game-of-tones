let currentArtist = null; // lo lee chat.js para darle contexto a Cuartetito

/* Acepta el ID solo o una URL completa de YouTube */
function ytId(v) {
  const m = String(v || "").match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : String(v || "").trim();
}

/* ===== ARTISTAS ===== */
const tabs = document.getElementById("tabs");
const genresEl = document.getElementById("genres");
const bio = document.getElementById("bio");
const player = document.getElementById("player");
const vinyl = document.getElementById("vinyl");

let selected = -1;
let genreFilter = "Todos";

/* ---------- Filtro por género ---------- */
const GENRES = ["Todos", ...new Set(ARTISTS.map(a => a.genre))];

GENRES.forEach(g => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = g;
  b.setAttribute("aria-pressed", g === genreFilter);
  b.addEventListener("click", () => {
    genreFilter = g;
    [...genresEl.children].forEach(x => x.setAttribute("aria-pressed", x === b));
    renderTabs();
  });
  genresEl.appendChild(b);
});

/* ---------- Pestañas ---------- */
function renderTabs() {
  tabs.innerHTML = "";
  ARTISTS.forEach((a, i) => {
    if (genreFilter !== "Todos" && a.genre !== genreFilter) return;
    const b = document.createElement("button");
    b.textContent = a.name;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", i === selected);
    b.addEventListener("click", () => select(i));
    tabs.appendChild(b);
  });
}
renderTabs();

/* ---------- Reproductor y selector de canciones ---------- */
function playSong(a, j, autoplay) {
  const s = a.songs[j];
  const q = encodeURIComponent(`${a.name} ${s.title}`);
  const media = s.ytId
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${ytId(s.ytId)}${autoplay ? "?autoplay=1" : ""}" title="${s.title}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    : `<a class="btn" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Escuchar en YouTube</a>`;
  const from = s.album ? ` de «${s.album}»` : "";
  const picker = a.songs.length > 1
    ? `<div class="songs" role="group" aria-label="Canciones de ${a.name}">` +
      a.songs.map((x, k) =>
        `<button type="button" data-song="${k}" aria-pressed="${k === j}">${x.title}</button>`
      ).join("") + `</div>`
    : "";
  player.innerHTML = `<p class="now">Sonando${from}: <strong>${s.title}</strong></p>${picker}${media}`;
  player.querySelectorAll("[data-song]").forEach(btn =>
    btn.addEventListener("click", () => playSong(a, +btn.dataset.song, true))
  );
  vinyl.classList.add("spin");
}

/* ---------- Biografía + línea de tiempo ---------- */
function select(i) {
  const a = ARTISTS[i];
  selected = i;
  currentArtist = a.name;
  document.documentElement.style.setProperty("--accent", a.color);
  [...tabs.children].forEach(b => b.setAttribute("aria-selected", b.textContent === a.name));

  const line = a.line && a.line.length
    ? `<h4 class="line-title">Línea de tiempo</h4><ol class="artline">` +
      a.line.map(e => `<li><span class="y">${e.y}</span> ${e.t}</li>`).join("") + `</ol>`
    : "";

  bio.innerHTML = `<h3>${a.name}</h3><p class="meta">${a.meta}</p>` +
    a.bio.map(p => `<p>${p}</p>`).join("") + line;

  playSong(a, 0, true);
}

/* Al salir de la sección Artistas se corta la música */
document.addEventListener("slotchange", e => {
  if (e.detail !== "artistas") {
    player.innerHTML = "";
    vinyl.classList.remove("spin");
  }
});
