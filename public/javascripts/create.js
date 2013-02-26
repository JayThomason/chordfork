
/*
 * Callback functions for chord buttons used in /create.
 */

function isValidModNote(ch) {
  var notes = ["1", "3", "5", "6", "7", "9", "11", "13"];
  for (var i = 0; i < notes.length; i++) {
    if (notes[i] == ch) {
      return true;
    }
  }
  return false;
}

function printChord() {
  noteMod = typeof(noteMod) === "undefined" ? "" : noteMod;
  type = typeof(type) === "undefined" ? "" : type;
  mod = typeof(mod) === "undefined" ? "" : mod;
  alert ("Current chord is now: " + note + noteMod + type + mod);
}

$(".chord-note").click(function () {
  note = "";
  noteMod = "";
  type = "";
  mod = "";
  note = $(this).text();
  printChord();
});

$(".chord-note-mod").click(function () {
  if (typeof(note) === "undefined" || note == "")
    return;
  if (typeof(mod) === "undefined" || mod == "") {
    if (noteMod == $(this).text())
      noteMod = "";
    else
      noteMod = $(this).text();
  }
  else {
    if (isValidModNote(mod[mod.length - 1]))
      mod += $(this).text();
  }
  printChord();
});

$(".chord-tri").click(function () {
  if (typeof(note) === "undefined" || note == "")
    return;
  type = $(this).text();
  printChord();
});

$(".chord-mod").click(function () {
  if (typeof(note) === "undefined" || note == "")
    return;
  mod = typeof(mod) === "undefined" ? "" : mod;
  mod += $(this).text();
  printChord();
});

$("#clear").click(function () {
  note = "";
  noteMod = "";
  type = "";
  mod = "";
});
