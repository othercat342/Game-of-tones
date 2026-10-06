/* ===== Menú hamburguesa + navegación por slots ===== */

const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
const scrim = document.getElementById("scrim");

const slots = [...document.querySelectorAll("section[data-slot]")];
const links = [...drawer.querySelectorAll("a")];

function toggleMenu(open) {
  drawer.classList.toggle("open", open);
  scrim.classList.toggle("open", open);

  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute(
    "aria-label",
    open ? "Cerrar menú" : "Abrir menú"
  );
}

/**
 * Muestra el slot solicitado.
 *
 * Ejemplo:
 * #inicio    -> sección id="inicio"
 * #notas     -> sección id="notas"
 * #piano     -> sección id="piano-slot"
 * #artistas  -> sección id="artistas"
 */
function showSlot(name) {
  // Si no se especifica ningún slot, mostramos inicio.
  if (!name) {
    name = "inicio";
  }

  // El slot "piano" utiliza el id "piano-slot".
  const targetId = name === "piano" ? "piano-slot" : name;

  // Comprobamos que la sección realmente exista.
  const target = document.getElementById(targetId);

  // Si el slot no existe, volvemos a inicio.
  if (!target || !target.matches("section[data-slot]")) {
    name = "inicio";
  }

  const finalTargetId = name === "piano" ? "piano-slot" : name;

  // Ocultamos todos los slots excepto el seleccionado.
  slots.forEach(slot => {
    slot.hidden = slot.id !== finalTargetId;
  });

  // Actualizamos el estado visual del menú.
  links.forEach(link => {
    const href = link.getAttribute("href");

    // Piano tiene una diferencia entre el href y el id de la sección.
    const linkSlot = href ? href.slice(1) : "";

    if (linkSlot === name) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Guardamos el slot actual en el body.
  document.body.dataset.slot = name;

  // Fuera de artistas eliminamos el color personalizado.
  if (name !== "artistas") {
    document.documentElement.style.removeProperty("--acce
```
