/* ===== NOTAS ===== */
const NOTES = [["Do","C"],["Re","D"],["Mi","E"],["Fa","F"],["Sol","G"],["La","A"],["Si","B"]];
document.getElementById("noteList").innerHTML =
  NOTES.map(([n, l]) => `<li><b>${n}</b><span>letra ${l}</span></li>`).join("");
