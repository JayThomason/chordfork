/**
 * Controller: Song
 * ---------------------------------------------------------
 *  Allow users (or anonymous users) to post songs. Songs
 *  are linked to that user and include the chord progression,
 *  notes, genre, and tags.
 */

/* Require sequelize module */
var db = require ('../sequelize-singleton')
  , Song = db.model ('song')
  , User = db.model ('user')
  , crypto = require('crypto');

/* POST /song/create */
exports.create = function (req, res) {
  console.log (req.body);
  var song = req.body.song;
  if (song == null 
      || req.session.username === 'undefined' 
      || req.body.name === "undefined")
    res.redirect ('../splash');
  var genre = req.body.genre === 'undefined' 
      || req.body.genre == '' ? 
      'none' : req.body.genre;
  var tags = req.body.tags === 'undefined'
      || req.body.tags == '' ? 
      'none' : req.body.tags;
  var notes = req.body.notes === 'notes'
      || req.body.notes == '' ? 
      'none' : req.body.notes;
  var name = req.body.name;
  Song.create ({
    identifier: crypto.randomBytes (10).toString ('hex'), 
    owner: req.session.username,
    owner_id: req.session.user_id,
    name: name,
    song: song,
    notes: notes,
    genre: genre,
    tags: tags
  }).success (function (song_success) {
    console.log ('Created song: ' + song_success.identifier);
    User.find (req.session.user_id).success (function (owner) {
      if (owner == null)
        console.log ('Failed to associate song with user.');
      else {
        owner.addSong (song_success);
        res.send (song_success.identifier);
      }
    }).error (function (err) {
      console.log ('Failed to associate song with user.');
    });
  }).error (function () {
    console.log ('Failed to create song.');
  });
};

/* GET /song/:id */
exports.view = function (req, res) {
  var id = req.params.id;
  if (id == null)
    res.redirect ('notfound');
  Song.find (id).error (function (err) {
    console.log (err);
    res.redirect ('notfound');
  }).success (function (song) {
    if (song == null) {
      res.redirect ('notfound');
      return;
    }
    console.log (song.song);
    res.render ('song-view', {
      title: song.title,
      owner: song.owner,
      name: song.name,
      chords: song.song,
      owner_id: song.owner_id,
      genre: song.genre,
      tags: song.tags,
      notes:song.notes
    });
  });
};
