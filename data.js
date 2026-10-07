/* ===== DATOS DE LOS ARTISTAS =====
   genre:  género para el filtro de la sección.
   line:   línea de tiempo [{ y: "año", t: "hito o disco" }].
   songs:  lista de canciones { title, album? , ytId? }.
           ytId = ID del video de YouTube (lo que va después de "v=") o la URL completa.
           Si ytId queda vacío, se muestra un botón que busca la canción en YouTube.
           Para que suene dentro de la página, pegá el ytId de cada canción. */
const ARTISTS = [
  {
    name: "Cuarteto de Nos",
    genre: "Rock",
    meta: "Montevideo, Uruguay · desde 1980",
    color: "#ffd23f",
    bio: [
      "El Cuarteto de Nos nació en Montevideo en 1980 y es una de las bandas más queridas del rock uruguayo. Su voz principal y compositor es Roberto Musso.",
      "Se hicieron conocidos por letras irónicas, humor negro y observaciones raras de la vida cotidiana. Con los años pasaron de ser una banda de culto en Uruguay a llenar estadios en toda Latinoamérica.",
      "Su disco más recordado es «Raro» (2006), el que los lanzó a un público masivo en la región."
    ],
    line: [
      { y: "1980", t: "Se forman en Montevideo" },
      { y: "2006", t: "Raro" },
      { y: "2009", t: "Bipolar" },
      { y: "2012", t: "Apocalipsis zombi" },
      { y: "2014", t: "Habla tu espejo" },
      { y: "2017", t: "Jueves" }
    ],
    songs: [
      { title: "Yendo a la casa de Damián", album: "Raro (2006)",
        ytId: "https://www.youtube.com/watch?v=K7XcO81TckU&list=RDK7XcO81TckU&start_radio=1" },
      { title: "Lo malo de ser bueno", ytId: "" }
    ]
  },
  {
    name: "Indio Solari",
    genre: "Rock",
    meta: "Paraná, Argentina · nació en 1949",
    color: "#7bdff2",
    bio: [
      "Carlos Alberto «Indio» Solari nació en Paraná, Entre Ríos. Fue la voz y el letrista de Patricio Rey y sus Redonditos de Ricota, banda formada en La Plata en 1976 que se separó en 2001.",
      "Los Redondos construyeron una escena propia, lejos de los medios, con recitales multitudinarios y un público fiel. Después Solari siguió en solitario con los Fundamentalistas del Aire Acondicionado.",
      "Sus letras mezclan poesía callejera, imágenes surrealistas y crítica social, y marcaron a varias generaciones del rock argentino."
    ],
    line: [
      { y: "1976", t: "Nacen los Redonditos de Ricota en La Plata" },
      { y: "1985", t: "Gulp!" },
      { y: "1986", t: "Oktubre" },
      { y: "1988", t: "Un baión para el ojo idiota" },
      { y: "1991", t: "La mosca y la sopa" },
      { y: "1993", t: "Lobo suelto / Cordero atado" },
      { y: "1998", t: "Último bondi a Finisterre" },
      { y: "2001", t: "Los Redondos se separan" },
      { y: "2004", t: "Primer disco solista: El tesoro de los inocentes" },
      { y: "2007", t: "Pajaritos, bravos muchachitos" }
    ],
    songs: [
      { title: "Ji ji ji", album: "Un baión para el ojo idiota (1988)",
        ytId: "https://www.youtube.com/watch?v=tVvTDVswTxQ&list=RDtVvTDVswTxQ&start_radio=1" },
      { title: "Mariposa Pontiac", ytId: "" },
      { title: "Un ángel para tu soledad", ytId: "" }
    ]
  },
  {
    name: "Milo J",
    genre: "Rap y trap",
    meta: "Buenos Aires, Argentina · nació en 2006",
    color: "#ff7a90",
    bio: [
      "Milo J (Milo Joaquín Lezcano) empezó a rimar siendo muy chico y se hizo conocido con videos de freestyle y trap en internet.",
      "Su estilo combina rap, trap, folklore y guitarras acústicas, con letras sobre su barrio, la familia y crecer rápido. En 2023 grabó una Music Session con Bizarrap que lo hizo conocido en todo el mundo hispanohablante.",
      "Es una de las voces más jóvenes y escuchadas de la nueva música argentina."
    ],
    line: [
      { y: "2023", t: "La vida era más corta" },
      { y: "2023", t: "Bzrp Music Sessions, Vol. 57" },
      { y: "2024", t: "166" }
    ],
    songs: [
      { title: "Jangadero", album: "La vida era más corta (2023)",
        ytId: "https://www.youtube.com/watch?v=NCmb43DcH6M&list=RDNCmb43DcH6M&start_radio=1" },
      { title: "Bzrp Music Sessions, Vol. 57", ytId: "" }
    ]
  },
  {
    name: "Callejeros",
    genre: "Rock",
    meta: "Buenos Aires, Argentina · desde 1995",
    color: "#b69cff",
    bio: [
      "Callejeros se formó en Buenos Aires en 1995 con una mezcla de rock barrial, reggae y ska. Su cantante es Patricio «Pato» Fontanet.",
      "A principios de los 2000 se volvieron una banda muy popular entre los jóvenes, con letras sobre la calle, la amistad y la vida en el barrio.",
      "El 30 de diciembre de 2004, durante un recital en República Cromañón, un incendio causó la muerte de 194 personas. Es una de las mayores tragedias de la historia argentina y su recuerdo sigue muy presente.",
      "«Rocanroles sin destino» (2004) es el disco por el que más se los recuerda."
    ],
    line: [
      { y: "1995", t: "Se forman en Buenos Aires" },
      { y: "2004", t: "Rocanroles sin destino" },
      { y: "2004", t: "30 de diciembre: la tragedia de Cromañón" }
    ],
    songs: [
      { title: "Una nueva noche fría", album: "Rocanroles sin destino (2004)",
        ytId: "https://www.youtube.com/watch?v=y7kudMJiscw&list=RDy7kudMJiscw&start_radio=1" },
      { title: "Prohibido", ytId: "" }
    ]
  },
  {
    name: "Soda Stereo",
    genre: "Rock",
    meta: "Buenos Aires, Argentina · 1982–1997",
    color: "#5eead4",
    bio: [
      "Soda Stereo se formó en Buenos Aires en 1982 con Gustavo Cerati (voz y guitarra), Zeta Bosio (bajo) y Charly Alberti (batería). Empezaron con un sonido new wave y fueron volviéndose más sofisticados, con guitarras atmosféricas y mucha experimentación.",
      "Llenaron estadios en toda Latinoamérica y abrieron el camino para toda una generación de bandas de la región.",
      "Se despidieron con un recital multitudinario en River en 1997. En 2007 volvieron con la gira «Me verás volver». Cerati sufrió un ACV en 2010 y murió en 2014, pero su música sigue sonando en cada rincón del continente."
    ],
    line: [
      { y: "1982", t: "Se forman en Buenos Aires" },
      { y: "1984", t: "Soda Stereo" },
      { y: "1985", t: "Nada personal" },
      { y: "1986", t: "Signos" },
      { y: "1988", t: "Doble vida" },
      { y: "1990", t: "Canción animal" },
      { y: "1992", t: "Dynamo" },
      { y: "1995", t: "Sueño stereo" },
      { y: "1997", t: "El último concierto, en River" },
      { y: "2007", t: "Gira «Me verás volver»" },
      { y: "2014", t: "Fallece Gustavo Cerati" }
    ],
    songs: [
      { title: "De música ligera", album: "Canción animal (1990)", ytId: "" },
      { title: "Persiana americana", album: "Signos (1986)", ytId: "" },
      { title: "En la ciudad de la furia", album: "Doble vida (1988)", ytId: "" },
      { title: "Cuando pase el temblor", album: "Soda Stereo (1984)", ytId: "" }
    ]
  },
  {
    name: "Luis Alberto Spinetta",
    genre: "Rock",
    meta: "Buenos Aires, Argentina · 1950–2012",
    color: "#f9a8d4",
    bio: [
      "Luis Alberto Spinetta es considerado uno de los grandes poetas del rock argentino. Con apenas 17 años fundó Almendra, una de las bandas fundadoras del rock nacional, y después pasó por Pescado Rabioso, Invisible y Spinetta Jade.",
      "Siempre fue cambiando: del rock poético a la fusión con jazz, del sonido más eléctrico al más delicado. Sus letras tienen imágenes muy personales, que no se parecen a las de nadie.",
      "Lo apodaron «El Flaco». Murió en 2012, y es una referencia para casi todos los músicos que vinieron después."
    ],
    line: [
      { y: "1967", t: "Funda Almendra" },
      { y: "1969", t: "Almendra" },
      { y: "1972", t: "Desatormentándonos (Pescado Rabioso)" },
      { y: "1973", t: "Artaud (Pescado Rabioso)" },
      { y: "1980", t: "Alma de diamante (Spinetta Jade)" },
      { y: "1982", t: "Kamikaze" },
      { y: "2012", t: "Fallece en Buenos Aires" }
    ],
    songs: [
      { title: "Muchacha ojos de papel", album: "Almendra (1969)", ytId: "" },
      { title: "Barro tal vez", album: "Artaud (1973)", ytId: "" },
      { title: "Alma de diamante", album: "Alma de diamante (1980)", ytId: "" }
    ]
  },
  {
    name: "Mercedes Sosa",
    genre: "Folklore",
    meta: "Tucumán, Argentina · 1935–2009",
    color: "#fcd34d",
    bio: [
      "Mercedes Sosa, «La Negra», nació en San Miguel de Tucumán y se convirtió en la voz más importante del folklore latinoamericano. Fue parte del movimiento del Nuevo Cancionero, que renovó el folklore argentino en los años 60.",
      "Cantó canciones de poetas y compositores de toda la región, como Violeta Parra, Atahualpa Yupanqui y León Gieco. Con su voz grave y potente, hacía que cada canción sonara como una declaración.",
      "En 1979 la detuvieron en un concierto en La Plata y se fue al exilio. Volvió en 1982 y cantó en el Teatro Ópera de Buenos Aires, en recitales que se recuerdan como un reencuentro con el país. Murió en 2009."
    ],
    line: [
      { y: "1935", t: "Nace en San Miguel de Tucumán" },
      { y: "1963", t: "Se suma al movimiento del Nuevo Cancionero" },
      { y: "1965", t: "Su consagración en el Festival de Cosquín" },
      { y: "1969", t: "Mujeres argentinas" },
      { y: "1971", t: "Homenaje a Violeta Parra" },
      { y: "1979", t: "Es detenida en La Plata y se exilia" },
      { y: "1982", t: "Vuelve a Argentina: recitales en el Teatro Ópera" },
      { y: "2009", t: "Fallece en Buenos Aires" }
    ],
    songs: [
      { title: "Gracias a la vida", album: "Homenaje a Violeta Parra (1971)", ytId: "" },
      { title: "Alfonsina y el mar", album: "Mujeres argentinas (1969)", ytId: "" },
      { title: "Solo le pido a Dios", ytId: "" }
    ]
  },
  {
    name: "Astor Piazzolla",
    genre: "Tango",
    meta: "Mar del Plata, Argentina · 1921–1992",
    color: "#fb923c",
    bio: [
      "Astor Piazzolla nació en Mar del Plata y creció en Nueva York. Tocaba el bandoneón, el instrumento más típico del tango, y estudió composición en París con Nadia Boulanger.",
      "Mezcló el tango con el jazz y la música clásica y creó el «nuevo tango». Al principio muchos tangueros lo criticaron mucho, pero con los años se volvió el compositor de tango más escuchado del mundo.",
      "Compuso «Adiós Nonino» en 1959, después de la muerte de su padre, y «Libertango» en 1974. Murió en Buenos Aires en 1992."
    ],
    line: [
      { y: "1921", t: "Nace en Mar del Plata" },
      { y: "1954", t: "Estudia en París con Nadia Boulanger" },
      { y: "1955", t: "Forma el Octeto Buenos Aires" },
      { y: "1959", t: "Compone «Adiós Nonino»" },
      { y: "1974", t: "Libertango" },
      { y: "1986", t: "Tango: Zero Hour" },
      { y: "1992", t: "Fallece en Buenos Aires" }
    ],
    songs: [
      { title: "Libertango", album: "Libertango (1974)", ytId: "" },
      { title: "Adiós Nonino", ytId: "" }
    ]
  },
  {
    name: "Rubén Rada",
    genre: "Candombe",
    meta: "Montevideo, Uruguay · 1943–2026",
    color: "#f87171",
    bio: [
      "Rubén «el Negro» Rada nació en Montevideo en 1943 y creció en el barrio Palermo, un lugar de candombe. Fue cantante, compositor y percusionista, y es el gran embajador del candombe en el mundo.",
      "A fines de los 60 su canción «Las manzanas» lo hizo conocido. En los 70 fue parte de Totem, una banda que mezcló el candombe con el rock y fue pionera del «candombe beat». Más tarde se hizo muy popular en Argentina.",
      "Mezcló el candombe con el jazz, el funk, el tango y el rock, y grabó más de 40 discos. Murió en Montevideo el 26 de agosto de 2026, a los 83 años, y el país le dio un homenaje con tambores en las calles de su barrio."
    ],
    line: [
      { y: "1943", t: "Nace en Montevideo" },
      { y: "1969", t: "Rada, su primer disco solista" },
      { y: "1971", t: "Totem" },
      { y: "1981", t: "La Rada" },
      { y: "1996", t: "Montevideo" },
      { y: "2015", t: "Tango, milonga y candombe" },
      { y: "2026", t: "Fallece en Montevideo" }
    ],
    songs: [
      { title: "Las manzanas", ytId: "" },
      { title: "Candombe para Gardel", ytId: "" },
      { title: "Dedos", ytId: "" }
    ]
  },
  {
    name: "Jorge Drexler",
    genre: "Pop y cantautor",
    meta: "Montevideo, Uruguay · nació en 1964",
    color: "#86efac",
    bio: [
      "Jorge Drexler nació en Montevideo y, antes de dedicarse de lleno a la música, trabajó como médico. Es cantautor y mezcla canción de autor con ritmos del Río de la Plata, electrónica y sonidos de distintas partes del mundo.",
      "En 2005 ganó el Oscar a la mejor canción original por «Al otro lado del río», de la película «Diarios de motocicleta». Fue la primera vez que una canción en español ganaba ese premio.",
      "Sus letras son muy cuidadas, con mucha ciencia y mucho amor. «Todo se transforma» es una de las más queridas."
    ],
    line: [
      { y: "1964", t: "Nace en Montevideo" },
      { y: "1992", t: "La luz que sabe robar" },
      { y: "2001", t: "Sea" },
      { y: "2004", t: "Eco" },
      { y: "2005", t: "Gana el Oscar por «Al otro lado del río»" },
      { y: "2010", t: "Amar la trama" },
      { y: "2014", t: "Bailar en la cueva" },
      { y: "2017", t: "Salvavidas de hielo" },
      { y: "2022", t: "Tinta y tiempo" }
    ],
    songs: [
      { title: "Todo se transforma", album: "Eco (2004)", ytId: "" },
      { title: "Al otro lado del río", album: "Eco (2004)", ytId: "" },
      { title: "Telefonía", album: "Eco (2004)", ytId: "" }
    ]
  },
  {
    name: "Los Palmeras",
    genre: "Cumbia",
    meta: "Santa Fe, Argentina · desde 1972",
    color: "#a3e635",
    bio: [
      "Los Palmeras nacieron en la ciudad de Santa Fe a principios de los 70 y son el grupo más tradicional de la cumbia santafesina. Se formaron como «Sexteto Palmeras», y con los años su líder y cantante fue Rubén «Cacho» Deicas.",
      "La cumbia santafesina toma el ritmo tropical de Colombia, pero lo mezcla con letras muy románticas y mucha guitarra y acordeón. Con esa receta se volvieron muy populares en el litoral y después en todo el país.",
      "Tenían más de 40 discos cuando «El bombón asesino» los hizo famosos entre los jóvenes de todo el país. Hoy siguen llenando escenarios, y «Soy sabalero» se canta en las canchas de Colón."
    ],
    line: [
      { y: "1972", t: "Nacen en Santa Fe como Sexteto Palmeras" },
      { y: "1978", t: "Cacho Deicas se suma como cantante" },
      { y: "2000s", t: "«El bombón asesino» los lleva a todo el país" },
      { y: "2018", t: "Concierto sinfónico gratuito frente al Obelisco" },
      { y: "2022", t: "Celebran 50 años con una gira nacional" }
    ],
    songs: [
      { title: "El bombón asesino", ytId: "" },
      { title: "El parrandero", ytId: "" },
      { title: "Soy sabalero", ytId: "" }
    ]
  }
];
