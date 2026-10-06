
/* ===== MENÚ + NAVEGACIÓN POR SLOTS ===== */

document.addEventListener("DOMContentLoaded", () => {

  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  const scrim = document.getElementById("scrim");

  const slots = [
    ...document.querySelectorAll("section[data-slot]")
  ];

  /*
   * Verificación de seguridad.
   * Si falta algún elemento del menú,
   * no rompe todo el JavaScript.
   */
  if (!burger || !drawer || !scrim) {
    console.error("No se encontraron los elementos del menú.");
    return;
  }


  /* =====================================================
     ABRIR / CERRAR MENÚ
     ===================================================== */

  function toggleMenu(open) {

    drawer.classList.toggle("open", open);
    scrim.classList.toggle("open", open);

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


  /* =====================================================
     MOSTRAR SLOT
     ===================================================== */

  function showSlot(name) {

    if (!name) {
      name = "inicio";
    }


    /*
     * El menú usa:
     *
     * #piano
     *
     * pero la sección se llama:
     *
     * #piano-slot
     */

    const targetId =
      name === "piano"
        ? "piano-slot"
        : name;


    let target =
      document.getElementById(targetId);


    /*
     * Si no existe el destino,
     * volvemos a Inicio.
     */

    if (
      !target ||
      !target.matches("section[data-slot]")
    ) {

      name = "inicio";

      targetId = "inicio";

      target =
        document.getElementById("inicio");
    }


    /* Ocultar todos los slots */

    slots.forEach(slot => {

      slot.hidden =
        slot.id !== targetId;

    });


    /* Buscar nuevamente los enlaces */

    const links = [
      ...drawer.querySelectorAll("a")
    ];


    /* Marcar enlace activo */

    links.forEach(link => {

      const href =
        link.getAttribute("href");

      const linkName =
        href
          ? href.substring(1)
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
     * Restaurar el color original
     * cuando no estamos en Artistas.
     */

    if (name !== "artistas") {

      document.documentElement.style
        .removeProperty("--accent");

    }


    /* Volver arriba */

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });


    /*
     * Avisar a artists.js.
     */

    document.dispatchEvent(
      new CustomEvent(
        "slotchange",
        {
          detail: name
        }
      )
    );
  }


  /* =====================================================
     BOTÓN HAMBURGUESA
     ===================================================== */

  burger.addEventListener("click", () => {

    const isOpen =
      drawer.classList.contains("open");

    toggleMenu(!isOpen);

  });


  /* =====================================================
     FONDO OSCURO
     ===================================================== */

  scrim.addEventListener("click", () => {

    toggleMenu(false);

  });


  /* =====================================================
     ESCAPE
     ===================================================== */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      toggleMenu(false);

    }

  });


  /* =====================================================
     ENLACES DEL MENÚ Y BOTONES INTERNOS
     ===================================================== */

  document.addEventListener("click", event => {

    const link =
      event.target.closest('a[href^="#"]');


    if (!link) {
      return;
    }


    const href =
      link.getAttribute("href");


    if (!href || href === "#") {
      return;
    }


    const name =
      href.substring(1);


    /*
     * Determinar el ID real del slot.
     */

    const targetId =
      name === "piano"
        ? "piano-slot"
        : name;


    const target =
      document.getElementById(targetId);


    /*
     * Si no corresponde a un slot,
     * dejamos que el enlace funcione normalmente.
     */

    if (
      !target ||
      !target.matches("section[data-slot]")
    ) {

      return;
    }


    event.preventDefault();


    /*
     * IMPORTANTE:
     * usamos window.history para evitar
     * cualquier conflicto con piano.js.
     */

    window.history.pushState(
      { slot: name },
      "",
      "#" + name
    );


    showSlot(name);

    toggleMenu(false);

  });


  /* =====================================================
     BOTÓN ATRÁS / ADELANTE DEL NAVEGADOR
     ===================================================== */

  window.addEventListener("popstate", () => {

    const name =
      window.location.hash.substring(1) ||
      "inicio";

    showSlot(name);

  });


  /* =====================================================
     CAMBIO DIRECTO DEL HASH
     ===================================================== */

  window.addEventListener("hashchange", () => {

    const name =
      window.location.hash.substring(1) ||
      "inicio";

    showSlot(name);

  });


  /* =====================================================
     INICIO
     ===================================================== */

  const initialSlot =
    window.location.hash.substring(1) ||
    "inicio";

  showSlot(initialSlot);

});
