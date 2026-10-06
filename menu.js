/* ===== Menú hamburguesa + navegación por slots ===== */
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
const scrim = document.getElementById("scrim");
const slots = [...document.querySelectorAll("section[data-slot]")];
const links = [...drawer.querySelectorAll("a")];

function toggleMenu(open) {
  drawer.classList.toggle("open", open);
  scrim.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

function showSlot(name) {
  // "piano" apunta a la sección con id "piano-slot"
  const id = name === "piano" ? "piano-slot" : name;
  const target = document.getElementById(id) ? id : "inicio";
  const key = target === "piano-slot" ? "piano" : target;
  slots.forEach(s => (s.hidden = s.id !== target));
  links.forEach(a => {
    if (a.getAttribute("href") === "#" + key) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.body.dataset.slot = key;
  // fuera de Artistas siempre vuelve el color de bienvenida
  if (key !== "artistas") document.documentElement.style.removeProperty("--accent");
  window.scrollTo({ top: 0 });
  document.dispatchEvent(new CustomEvent("slotchange", { detail: key }));
}

burger.addEventListener("click", () => toggleMenu(!drawer.classList.contains("open")));
scrim.addEventListener("click", () => toggleMenu(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") toggleMenu(false); });

// Cualquier enlace interno (menú, logo o botones) cambia de slot
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  const name = a.getAttribute("href").slice(1);
  history.replaceState(null, "", "#" + name);
  showSlot(name);
  toggleMenu(false);
});

showSlot(location.hash.slice(1) || "inicio");
