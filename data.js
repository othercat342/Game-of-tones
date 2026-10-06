/* ===== DATOS DE LOS ARTISTAS =====
   ytId: ID del video de YouTube (lo que va después de "v=" en la URL).
   Si queda vacío, se muestra un botón que busca la canción en YouTube. */
const ARTISTS = [
  {
    name: "Cuarteto de Nos",
    meta: "Montevideo, Uruguay · desde 1980",
    color: "#ffd23f",
    bio: [
      "El Cuarteto de Nos nació en Montevideo en 1980 y es una de las bandas más queridas del rock uruguayo. Su voz principal y compositor es Roberto Musso.",
      "Se hicieron conocidos por letras irónicas, humor negro y observaciones raras de la vida cotidiana. Con los años pasaron de ser una banda de culto en Uruguay a llenar estadios en toda Latinoamérica.",
      "Su disco más recordado es «Raro» (2006), el que los lanzó a un público masivo en la región."
    ],
    album: "Raro (2006)",
    song: "Yendo a la casa de Damián",
    ytId: ""
  },
  {
    name: "Indio Solari",
    meta: "Paraná, Argentina · nació en 1949",
    color: "#7bdff2",
    bio: [
      "Carlos Alberto «Indio» Solari nació en Paraná, Entre Ríos. Fue la voz y el letrista de Patricio Rey y sus Redonditos de Ricota, banda formada en La Plata en 1976 que se separó en 2001.",
      "Los Redondos construyeron una escena propia, lejos de los medios, con recitales multitudinarios y un público fiel. Después Solari siguió en solitario con los Fundamentalistas del Aire Acondicionado.",
      "Sus letras mezclan poesía callejera, imágenes surrealistas y crítica social, y marcaron a varias generaciones del rock argentino."
    ],
    album: "Un baión para el ojo idiota (1988)",
    song: "Ji ji ji",
    ytId: ""
  },
  {
    name: "Milo J",
    meta: "Buenos Aires, Argentina · nació en 2006",
    color: "#ff7a90",
    bio: [
      "Milo J (Milo Joaquín Lezcano) empezó a rimar siendo muy chico y se hizo conocido con videos de freestyle y trap en internet.",
      "Su estilo combina rap, trap, folklore y guitarras acústicas, con letras sobre su barrio, la familia y crecer rápido. En 2023 grabó una Music Session con Bizarrap que lo hizo conocido en todo el mundo hispanohablante.",
      "Es una de las voces más jóvenes y escuchadas de la nueva música argentina."
    ],
    album: "La vida era más corta (2023)",
    song: "M.A.I",
    ytId: ""
  },
  {
    name: "Callejeros",
    meta: "Buenos Aires, Argentina · desde 1995",
    color: "#b69cff",
    bio: [
      "Callejeros se formó en Buenos Aires en 1995 con una mezcla de rock barrial, reggae y ska. Su cantante es Patricio «Pato» Fontanet.",
      "A principios de los 2000 se volvieron una banda muy popular entre los jóvenes, con letras sobre la calle, la amistad y la vida en el barrio.",
      "El 30 de diciembre de 2004, durante un recital en República Cromañón, un incendio causó la muerte de 194 personas. Es una de las mayores tragedias de la historia argentina y su recuerdo sigue muy presente.",
      "«Rocanroles sin destino» (2004) es el disco por el que más se los recuerda."
    ],
    album: "Rocanroles sin destino (2004)",
    song: "Una nueva noche fatal",
    ytId: ""
  }
];

