/**
 * Controller: QuickSong
 * -------------------------------------------------------
 *  Allow users (or anonymous users) to quickly post songs
 *  without the song being linked to their account. Meant
 *  for quick sharing of ideas since the user only needs to
 *  enter the desired chord progression without tagging, 
 *  adding the genre, adding lyrics, or adding notes.
 */

/* Require sequelize module */
var db = require ('../sequelize-singleton')
  , QuickSong = db.model ('quicksong')
  , crypto = require('crypto');

/* POST /quicksong/create */
exports.create = function (req, res) {
  var quicksong = req.body.song;
  if (quicksong == null)
    res.redirect ('../splash');
  var owner = req.session.username === 'undefined' ? 
      'Anonymous' : req.session.username;
  QuickSong.create ({
    identifier: crypto.randomBytes (10).toString ('hex'), 
    owner: owner,
    song: quicksong
  }).success (function (song) {
    console.log ('Create quick song: ' + song.identifier);
    console.log ('chords: ' + song.song);
    res.send (song.identifier);
  }).error (function () {
    console.log ('Failed to create quick song.');
  });
};

/* GET /quicksong/view/:id */
exports.view = function (req, res) {
  var id = req.params.id;
  if (id == null)
    return;
  QuickSong.find (id).error (function (err) {
    console.log (err);
    res.send ('failed to find quick song ' + id);
  }).success (function (song) {
    if (song == null) {
      res.send ('failed to find quick song ' + id);
      return;
    }
    console.log (song.song);
    res.render ('quicksong-view', {
      title: 'ChordFork: quick song',
      owner: song.owner,
      chords: song.song
    });
  });
};
