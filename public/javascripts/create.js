/* 
 * Object which represents a chord. Includes the note, type, and modifiers.
 *
 * For example, for the chord C#Maj7, the note is C#, the type is Maj, and
 * the modifier is 7.
 * */

function Chord (note, noteMod, type, mod) {
  this.note = note;
  this.noteMod = noteMod;
  this.type = type;
  this.mod = mod;
}

/* Prints the current chord to the current-chord div on the create page. */
Chord.prototype.print = function () {
  this.note = this.note == null ? "" : this.note;
  this.noteMod = this.noteMod == null ? "" : this.noteMod;
  this.type = this.type == null ? "" : this.type;
  this.mod = this.mod == null ? "" : this.mod;
  $("#current-chord").text("current: " + this.note + this.noteMod + this.type + this.mod);
}

chord = new Chord (null, null, null, null);
chords = [];

/* Helper function which determines valid mod notes. */
function isValidModNote(ch) {
  var notes = ["1", "3", "5", "6", "7", "9", "11", "13"];
  for (var i = 0; i < notes.length; i++) {
    if (notes[i] == ch) {
      return true;
    }
  }
  return false;
}

/*
 * Callback functions for chord buttons used in /create.
 */

$(".chord-note").click(function () {
  chord.note = "";
  chord.noteMod = "";
  chord.type = "";
  chord.mod = "";
  chord.note = $(this).text();
  chord.print ();
});

$(".chord-note-mod").click(function () {
  if (chord.note == null || chord.note == "")
    return;
  if (chord.mod == null || chord.mod == "") {
    if (chord.noteMod == $(this).text())
      chord.noteMod = "";
    else
      chord.noteMod = $(this).text();
  }
  else {
    if (isValidModNote(chord.mod[chord.mod.length - 1]))
      chord.mod += $(this).text();
  }
  chord.print ();
});

$(".chord-tri").click(function () {
  if (chord.note == null || chord.note == "")
    return;
  chord.type = $(this).text();
  chord.print ();
});

$(".chord-mod").click(function () {
  if (chord.note == null || chord.note == "")
    return;
  chord.mod = typeof(chord.mod) === "undefined" ? "" : chord.mod;
  chord.mod += $(this).text();
  chord.print ();
});

$("#clear").click(function () {
  chords.push (new Chord (chord.note, chord.noteMod, chord.type, chord.mod));
  chord.note = null;
  chord.noteMod = null;
  chord.type = null;
  chord.mod = null;
  chord.print ();
});

$("#next-chord").click (function () {
  if (chord.note == null || chord.note == "")
    return;
  chords.push (new Chord (chord.note, chord.noteMod, chord.type, chord.mod));
  chord.note = null;
  chord.noteMod = null;
  chord.type = null;
  chord.mod = null;
  var index = chords.length - 1;
  var lastChord = chords[index];
  $(".display-chords").append ("<strong id='test" + index + "'>" 
      + lastChord.note + lastChord.noteMod + lastChord.type + lastChord.mod + '</strong>  ');
  chord.print ();
});
