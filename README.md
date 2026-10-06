Surco · Música para meterse adentro

Página estática para aprender las 7 notas, tocar un piano virtual y conocer artistas de Argentina y Uruguay.

Archivos

├── index.html      # Página principal
├── styles.css      # Estilos
├── data.js         # Datos de los artistas
├── notes.js        # Sección de notas
├── piano.js        # Piano interactivo (Web Audio)
├── artists.js      # Sección de artistas
└── menu.js         # Menú y navegación por secciones

Cómo probarlo localmente

Abrí index.html en el navegador (doble clic o con Live Server).

Cómo subirlo a GitHub + Netlify / Vercel





Creá un repo nuevo en GitHub.



Subí todos estos archivos a la raíz del repo (no dentro de una carpeta extra).



En netlify.com o vercel.com:





Importá el repo de GitHub



Deploy (no hace falta build command ni output directory)



Te dan una URL pública al instante.

Correcciones incluidas





Bug de la página que desaparecía: el selector tomaba el <body> y lo ocultaba. Ahora solo selecciona las <section>.



Meta tags para redes sociales y SEO.



Scripts con defer para mejor carga.

