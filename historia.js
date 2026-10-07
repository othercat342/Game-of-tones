/* ===== HISTORIA DE LA MÚSICA ===== */
const ERAS = [
  { when: "Antes de la escritura", title: "Voz, ritmo y flautas de hueso",
    text: "La música es anterior a la escritura. Se encontraron flautas de hueso de unos 40.000 años: antes de cualquier instrumento complejo ya existían el canto y el ritmo." },
  { when: "Antigüedad", title: "Grecia y los números del sonido",
    text: "Pitágoras estudió cómo las proporciones entre cuerdas producen intervalos que suenan bien juntos. Desde entonces, música y matemática caminan de la mano." },
  { when: "Edad Media (500–1400)", title: "Canto gregoriano y los nombres de las notas",
    text: "En los monasterios se cantaba en una sola línea melódica. En el siglo XI, el monje Guido d'Arezzo usó las sílabas de un himno para nombrar las notas: de ahí vienen Do, Re, Mi, Fa, Sol, La." },
  { when: "Renacimiento (1400–1600)", title: "Varias voces a la vez",
    text: "La polifonía se vuelve la norma: voces independientes que suenan juntas. A comienzos del siglo XVI aparece la imprenta musical y las partituras empiezan a circular." },
  { when: "Barroco (1600–1750)", title: "Nace la ópera, reina el acorde",
    text: "Monteverdi lleva el drama a la música con la ópera. Bach y Vivaldi consolidan la armonía basada en acordes y tonalidades, que sigue siendo la base de casi todo lo que escuchamos hoy." },
  { when: "Clasicismo (1750–1820)", title: "Orden, equilibrio y el piano",
    text: "Haydn y Mozart fijan la sinfonía y la forma sonata. El piano reemplaza al clavecín porque permite tocar suave o fuerte. Beethoven cierra la época y abre la siguiente." },
  { when: "Romanticismo (1820–1900)", title: "La emoción primero",
    text: "Chopin, Schubert y Wagner buscan expresar sentimientos intensos. Muchos compositores incorporan melodías y ritmos de su propio país." },
  { when: "Principios del siglo XX", title: "Blues, jazz y la grabación",
    text: "La radio y los discos llevan la música a todos lados. Del blues y del jazz de Estados Unidos salen la improvisación y el swing, y más tarde el rock and roll de los años 50." },
  { when: "Años 30 a 60", title: "Del tango de Gardel al nuevo tango",
    text: "El tango se vuelve música de masas con Carlos Gardel, que murió en 1935 y cuyo lugar de nacimiento se discute entre Francia y Uruguay. En los 50 y 60 Astor Piazzolla lo mezcla con jazz y música clásica y crea el «nuevo tango»." },
  { when: "Años 60", title: "Folklore: el Nuevo Cancionero y Cosquín",
    text: "El Festival de Cosquín arranca en 1961 y en 1963 el Nuevo Cancionero propone un folklore con poesía actual y más compromiso. Mercedes Sosa y Atahualpa Yupanqui son dos de sus voces más importantes." },
  { when: "Siempre en el Río de la Plata", title: "Candombe: tres tambores y un barrio",
    text: "El candombe nace de la comunidad afro de Montevideo y se toca con tres tambores: chico, repique y piano. Late sobre todo en los barrios Sur y Palermo, y la UNESCO lo declaró Patrimonio Cultural Inmaterial de la Humanidad en 2009. A fines de los 60 el candombe beat lo cruza con guitarras eléctricas, con músicos como Eduardo Mateo y Rubén Rada." },
  { when: "Carnaval", title: "Murga: cantar lo que pasa",
    text: "La murga mezcla coro, bombo, platillos y redoblante, y comenta con humor y crítica lo que pasó en el año. Es una pieza central del carnaval de Uruguay y también tiene su versión en el carnaval de Buenos Aires." },
  { when: "Fines de los 60 a los 80", title: "Nace el rock en español del Río de la Plata",
    text: "En 1967 «La balsa» de Los Gatos marca el comienzo del rock argentino, y bandas como Almendra, con Luis Alberto Spinetta, lo hacen crecer. Los Redonditos de Ricota arrancan en 1976, el Cuarteto de Nos en 1980 y Soda Stereo en 1982." },
  { when: "De los 70 a hoy", title: "Cumbia: de Colombia al barrio",
    text: "La cumbia nace en el Caribe colombiano y llega al Río de la Plata, donde se transforma. En Santa Fe se vuelve cumbia santafesina, más romántica y con guitarra y acordeón, con Los Palmeras como grupo emblemático. A fines de los 90 aparece la cumbia villera en el Gran Buenos Aires, con letras sobre la vida de barrio." },
  { when: "Hoy", title: "Streaming, trap y producción digital",
    text: "Cualquiera puede grabar en su casa y publicar en plataformas. El trap y el rap crecen en Argentina y artistas como Milo J mezclan géneros con total libertad." }
];

document.getElementById("timeline").innerHTML = ERAS.map(e =>
  `<li><span class="when">${e.when}</span><h3>${e.title}</h3><p>${e.text}</p></li>`
).join("");
