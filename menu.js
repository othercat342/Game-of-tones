document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a');
    const views = document.querySelectorAll('.view');

    // 1. Abrir / Cerrar menú hamburguesa en pantallas pequeñas
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. Función global para cambiar entre vistas/secciones
    window.switchView = function(targetId) {
        views.forEach(view => {
            if (view.id === targetId) {
                view.style.display = 'block';
                view.classList.add('active');
            } else {
                view.style.display = 'none';
                view.classList.remove('active');
            }
        });
    };

    // 3. Manejar clics en los slots del menú hamburguesa
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamiento por defecto del enlace
            const target = link.getAttribute('data-target');
            
            if (target) {
                switchView(target);
            }

            // Ocultar el menú hamburguesa después de hacer clic (útil en móviles)
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
});
