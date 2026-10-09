<p align="center">
  <img src="assets/logo-claro.png" alt="Surco Aprende" width="480">
</p>

# Surco · Música para meterse adentro

Página para aprender las 7 notas, tocar un piano virtual, practicar (acordes, metrónomo, afinador, progresiones), conocer artistas de Argentina y Uruguay y charlar con Cuartetito, un guía con IA.

## Archivos

- `assets/`: logo (versiones para fondo oscuro y claro), ícono y favicon
- `index.html`: página principal
- `styles.css`: estilos
- `data.js`: **datos de los artistas** (bio, géneros, línea de tiempo y canciones)
- `artists.js`: sección de artistas (filtro por género, línea de tiempo, selector de canciones)
- `historia.js`: línea de tiempo de la historia de la música
- `notes.js`, `piano.js`, `practica.js`: notas, piano y herramientas de práctica
- `chat.js` + `server.js`: chat con IA (necesita Node y una API key)
- `menu.js`: menú y navegación por secciones

## Cómo agregar un artista

Copiá un bloque de `data.js` y completá `name`, `genre`, `meta`, `color`, `bio`, `line` (línea de tiempo) y `songs`.
Después agregá el nombre del artista a `ARTISTS_OK` en `server.js`, para que Cuartetito sepa de quién estás hablando.

## Cómo hacer que suene una canción dentro de la página

En cada canción de `data.js`, pegá el `ytId` (lo que va después de `v=` en la URL de YouTube, o la URL entera).
Si `ytId` está vacío, se muestra un botón que busca la canción en YouTube.

## Cómo probarlo localmente

```
npm install
GEMINI_API_KEY=tu_clave npm start     # o ANTHROPIC_API_KEY
```

Abrí http://localhost:3000. Sin servidor todo funciona menos el chat.
