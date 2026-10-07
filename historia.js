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
  { when: "Río de la Plata", title: "Tango, candombe y rock",
    text: "El tango nace a fines del siglo XIX en Buenos Aires y Montevideo, y el candombe uruguayo tiene raíces afro. El rock argentino toma forma a fines de los 60. Los Redonditos de Ricota arrancan en 1976 y el Cuarteto de Nos en 1980." },
  { when: "Hoy", title: "Streaming, trap y producción digital",
    text: "Cualquiera puede grabar en su casa y publicar en plataformas. El trap y el rap crecen en Argentina y artistas como Milo J mezclan géneros con total libertad." }
];

document.getElementById("timeline").innerHTML = ERAS.map(e =>
  `<li><span class="when">${e.when}</span><h3>${e.title}</h3><p>${e.text}</p></li>`
).join("");
