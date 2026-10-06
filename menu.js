/* ===== Menú hamburguesa + navegación por slots ===== */

const burger =
  document.getElementById("burger");

const drawer =
  document.getElementById("drawer");

const scrim =
  document.getElementById("scrim");

const slots = [
  ...document.querySelectorAll(
    "section[data-slot]"
  )
];

const links = [
  ...drawer.querySelectorAll("a")
];


/* =========================================================
   ABRIR / CERRAR MENÚ
   ========================================================= */

function toggleMenu(open) {

  drawer.classList.toggle(
    "open",
    open
  );

  scrim.classList.toggle(
    "open",
    open
  );

  burger.setAttribute(
    "aria-expanded",
    String(open)
  );

  burger.setAttribute(
    "aria-label",
    open
      ? "Cerrar menú"
      : "Abrir menú"
  );
}


/* =========================================================
   MOSTRAR SLOT
   ========================================================= */

function showSlot(name) {

  if (!name) {
    name = "inicio";
  }


  /*
   * El enlace es #piano,
   * pero la sección real es #piano-slot.
   */

  const id =
    name === "piano"
      ? "piano-slot"
      : name;


  let target =
    document.getElementById(id);


  /*
   * Si no existe el slot,
   * mostramos Inicio.
   */

  if (
    !target ||
    !target.matches("section[data-slot]")
  ) {

    name = "inicio";

    target =
      document.getElementById("inicio");
  }


  const targetId =
    name === "piano"
      ? "piano-slot"
      : name;


  /* Ocultar todos los slots */

  slots.forEach(slot => {

    slot.hidden =
      slot.id !== targetId;

  });


  /* Marcar enlace activo */

  links.forEach(link => {

    const href =
      link.getAttribute("href");

    const linkName =
      href
        ? href.slice(1)
        : "";

    if (linkName === name) {

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


  /* Guardar slot actual */

  document.body.dataset.slot =
    name;


  /*
   * Fuera de artistas volvemos
   * al color original.
   */

  if (name !== "artistas") {

    document.documentElement
