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

/* Al salir de la sección Artistas se corta la música */
document.addEventListener("slotchange", e => {
  if (e.detail !== "artistas") {
    player.innerHTML = "";
    vinyl.classList.remove("spin");
  }
});
