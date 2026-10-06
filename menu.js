
/* ===== Menú hamburguesa + navegación por slots ===== */

const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
const scrim = document.getElementById("scrim");

const slots = [...document.querySelectorAll("section[data-slot]")];
const links = [...drawer.querySelectorAll("a[data-vista]")];


/* =========================================================
   ABRIR / CERRAR MENÚ
   ========================================================= */

function toggleMenu(open) {
  drawer.classList.toggle("open", open);
  scrim.classList.toggle("open", open);

  burger.setAttribute("aria-expanded", String(open));

  burger.setAttribute(
    "aria-label",
    open ? "Cerrar menú" : "Abrir menú"
  );
}


/* =========================================================
   MOSTRAR SLOT
   ========================================================= */

function showSlot(name) {

  // Si no hay nombre, mostramos inicio
  if (!name) {
    name = "inicio";
  }

  /*
   * El enlace es #piano,
   * pero la sección real se llama #piano-slot.
   */
  const targetId =
    name === "piano"
      ? "piano-slot"
      : name;


  // Buscamos la sección
  let target = document.getElementById(targetId);


  /*
   * Si el slot no existe,
   * volvemos automáticamente a inicio.
   */
  if (!target || !target.matches("section[data-slot]")) {
    name = "inicio";
    target = document.getElementById("inicio");
  }


  const finalTargetId =
    name === "piano"
      ? "piano-slot"
      : name;


  /* =======================================================
     OCULTAR TODOS LOS SLOTS
     ======================================================= */

  slots.forEach(slot => {
    slot.hidden = slot.id !== finalTargetId;
  });


  /* =======================================================
     MARCAR EN EL MENÚ EL SLOT ACTIVO
     ======================================================= */

  links.forEach(link => {

    const vista = link.dataset.vista;

    if (vista === name) {

      link.setAttribute(
        "aria-current",
        "page"
      );

    } else {

      link.removeAttribute(
        "aria-current"
      );

    }

  });


  /* =======================================================
     GUARDAR SLOT ACTUAL
     ======================================================= */

  document.body.dataset.slot = name;


  /* =======================================================
     RESTAURAR COLOR FUERA DE ARTISTAS
     ======================================================= */

  if (name !== "artistas") {
    document.documentElement.style.removeProperty(
      "--accent"
    );
  }


  /* =======================================================
     VOLVER ARRIBA
     ======================================================= */

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });


  /* =======================================================
     AVISAR A LOS DEMÁS SCRIPTS
     ======================================================= */

  document.dispatchEvent(
    new CustomEvent(
      "slotchange",
      {
        detail: name
      }
    )
  );
}


/* =========================================================
   CLIC EN LOS ENLACES DEL MENÚ
   ========================================================= */

links.forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    const name = link.dataset.vista;

    if (!name) {
      return;
    }


    /*
     * pushState guarda cada navegación
     * en el historial del navegador.
     */
    history.pushState(
      {
        slot: name
      },
      "",
      "#" + name
    );


    // Mostrar el slot seleccionado
    showSlot(name);


    // Cerrar menú
    toggleMenu(false);

  });

});


/* =========================================================
   CUALQUIER ENLACE INTERNO
   =========================================================

   Esto permite que también funcionen:

   <a href="#notas">
   <a href="#piano">
   <a href="#artistas">

   Por ejemplo, el botón "Empezar por las notas".
   ========================================================= */

document.addEventListener("click", event => {

  const link = event.target.closest(
    'a[href^="#"]'
  );


  if (!link) {
    return;
  }


  /*
   * Si el enlace pertenece al menú,
   * ya lo maneja el código anterior.
   */
  if (
    link.closest("#drawer") &&
    link.hasAttribute("data-vista")
  ) {
    return;
  }


  const href = link.getAttribute("href");


  if (!href || href === "#") {
    return;
  }


  const name = href.substring(1);


  /*
   * Comprobamos que realmente sea un slot.
   */
  const targetId =
    name === "piano"
      ? "piano-slot"
      : name;


  const target =
    document.getElementById(targetId);


  if (
    !target ||
    !target.matches("section[data-slot]")
  ) {
    return;
  }


  event.preventDefault();


  history.pushState(
    {
      slot: name
    },
    "",
    "#" + name
  );


  showSlot(name);

  toggleMenu(false);

});


/* =========================================================
   BOTÓN HAMBURGUESA
   ========================================================= */

burger.addEventListener(
  "click",
  () => {

    const abierto =
      drawer.classList.contains("open");

    toggleMenu(!abierto);

  }
);


/* =========================================================
   FONDO OSCURO
   ========================================================= */

scrim.addEventListener(
  "click",
  () => {

    toggleMenu(false);

  }
);


/* =========================================================
   TECLA ESCAPE
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      toggleMenu(false);
    }

  }
);


/* =========================================================
   ATRÁS / ADELANTE DEL NAVEGADOR
   ========================================================= */

window.addEventListener(
  "popstate",
  () => {

    const name =
      location.hash.substring(1) ||
      "inicio";

    showSlot(name);

  }
);


/* =========================================================
   CAMBIO DEL HASH
   ========================================================= */

window.addEventListener(
  "hashchange",
  () => {

    const name =
      location.hash.substring(1) ||
      "inicio";

    showSlot(name);

  }
);


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

const initialSlot =
  location.hash.substring(1) ||
  "inicio";

showSlot(initialSlot);

