/* 
 * Object which represents a chord. Includes the note, type, and modifiers.
 *
 * For example, for the chord C#Maj7, the note is C#, the type is Maj, and
 * the modifier is 7.
 * */

function Chord (note, noteMod, type, mod, index) {
  this.note = note;
  this.noteMod = noteMod;
  this.type = type;
  this.mod = mod;
  this.index = index;
}

/* Prints the current chord to the current-chord div on the create page. */
Chord.prototype.print = function () {
  this.note = this.note == null ? "" : this.note;
  this.noteMod = this.noteMod == null ? "" : this.noteMod;
  this.type = this.type == null ? "" : this.type;
  this.mod = this.mod == null ? "" : this.mod;
  $("#current-chord").text("current: " + this.note + this.noteMod + this.type + this.mod);
}

Chord.prototype.clear = function () {
  this.note = null;
  this.noteMod = null;
  this.type = null;
  this.mod = null;
}

chord = new Chord (null, null, null, null, null);
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
  if (chord.index == null) {
    chords.push (new Chord (chord.note, chord.noteMod, chord.type, chord.mod));
    chord.clear ();
    chord.print ();
  }
  else {
    $("#test" + chord.index).remove ();
    chords.splice (chord.index, 1);
    chord.clear ();
    chord.print ();
    $("#clear").text("clear");
  }
});

$("#next-chord").click (function () {
  if (chord.note == null || chord.note == "")
    return;
  if (chord.index != null) {
    chords[chord.index] = new Chord (chord.note, chord.noteMod, chord.type, chord.mod);
    $("#test" + chord.index).text (chord.note + chord.noteMod + chord.type + chord.mod);
    chord.clear ();
    chord.index = null;
    chord.print ();
    $("#clear").text ("clear");
  }
  else {
    chords.push (new Chord (chord.note, chord.noteMod, chord.type, chord.mod));
    chord.clear ();
    chord.index = null;
    var index = chords.length - 1;
    var lastChord = chords[index];
    $(".display-chords").append ("<strong id='test" + index + "' class='disp-chords'>" 
        + lastChord.note + lastChord.noteMod + lastChord.type + lastChord.mod + ' </strong>');
    chord.print ();
    $("#test" + index).click (function () {
      chord.note = chords[index].note;
      chord.noteMod = chords[index].noteMod;
      chord.type = chords[index].type;
      chord.mod = chords[index].mod;
      chord.index = index;
      chord.print ();
      $("#clear").text ("remove");
    });
  }
});

$("#quick-post").click (function () {
  var song_body = $(".display-chords").text();
  if (song_body.length == 0)
    return;
  $.post ('/quicksong/create', {
      "song": song_body 
  }).done (function (data) {
    $(".modal-post-link").text ('http://chordfork.com/quicksong/' + data);
    $(".modal-post-link").attr ("href", "/quicksong/" + data);
    $("#myModal").modal('show');
  });
});


$("#post").click (function () {
  var song_body = $(".display-chords").text ();
  var genre = $("#genre").val ();
  var tags = $("#tags").val ();
  var notes = $("#notes").val ();
  var name = $("#song-name").val ();
  if (song_body.length == 0
    || name.length == 0)
    return;
  $.post ("/song/create", {
    "song": song_body,
    "notes": notes,
    "genre": genre,
    "tags": tags,
    "name": name
  }).done (function (data) {
    $(".modal-post-link").text ('http://chordfork.com/song/' + data);
    $(".modal-post-link").attr ("href", "/song/" + data);
    $("#myModal").modal('show');
  });
});
