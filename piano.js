/* ===== PIANO (Web Audio) ===== */

const KEYS = [
  { n: "Do",   midi: 60, k: "a" },
  { n: "Do#",  midi: 61, k: "w", black: 12.5 },
  { n: "Re",   midi: 62, k: "s" },
  { n: "Re#",  midi: 63, k: "e", black: 25 },
  { n: "Mi",   midi: 64, k: "d" },
  { n: "Fa",   midi: 65, k: "f" },
  { n: "Fa#",  midi: 66, k: "t", black: 50 },
  { n: "Sol",  midi: 67, k: "g" },
  { n: "Sol#", midi: 68, k: "y", black: 62.5 },
  { n: "La",   midi: 69, k: "h" },
  { n: "La#",  midi: 70, k: "u", black: 75 },
  { n: "Si",   midi: 71, k: "j" },
  { n: "Do",   midi: 72, k: "k" }
];

let ctx;

function play(midi) {
  ctx = ctx || new (
    window.AudioContext ||
    window.webkitAudioContext
  )();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";

  osc.frequency.value =
    440 * Math.pow(2, (midi - 69) / 12);

  gain.gain.setValueAtTime(
    0.0001,
    ctx.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.4,
    ctx.currentTime + 0.02
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + 1.2
  );

  osc.connect(gain).connect(ctx.destination);

  osc.start();

  osc.stop(
    ctx.currentTime + 1.3
  );
}


const pianoEl =
  document.getElementById("piano");

const playedEl =
  document.getElementById("played");


/*
 * IMPORTANTE:
 *
 * Antes se llamaba "history".
 * Eso entraba en conflicto con window.history,
 * que es utilizado por menu.js para navegar entre slots.
 */
const playedHistory = [];

const keyEls = {};


KEYS.forEach(key => {

  const el = document.createElement("button");

  el.className =
    "key" + (key.black ? " black" : "");

  el.textContent = key.n;

  el.setAttribute(
    "aria-label",
    key.n
  );

  if (key.black) {
    el.style.left =
      key.black + "%";
  }

  el.addEventListener(
    "pointerdown",
    () => hit(key)
  );

  pianoEl.appendChild(el);

  keyEls[key.k] = {
    el,
    key
  };

});


function hit(key) {

  play(key.midi);

  const el =
    keyEls[key.k].el;

  el.classList.add("on");

  setTimeout(
    () => el.classList.remove("on"),
    180
  );


  playedHistory.push(key.n);

  if (playedHistory.length > 12) {
    playedHistory.shift();
  }


  playedEl.textContent =
    "Tocaste: " +
    playedHistory.join(" · ");
}


document.addEventListener(
  "keydown",
  e => {

    if (
      e.repeat ||
      e.ctrlKey ||
      e.metaKey ||
      document.body.dataset.slot !== "piano"
    ) {
      return;
    }

    const hitKey =
      keyEls[e.key.toLowerCase()];

    if (hitKey) {
      hit(hitKey.key);
    }

  }
);
