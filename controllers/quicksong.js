var db = require ('../sequelize-singleton')
  , QuickSong = db.model ('quicksong')
  , crypto = require('crypto');

exports.create = function (req, res) {
  var quicksong = req.body.song;
  if (quicksong == null)
    return;
  var rand_id = crypto.randomBytes (10).toString ('hex');
  QuickSong.create ({
    identifier: rand_id,
    song: quicksong
  }).success (function (song) {
    console.log ('Create quick song: ' + song.identifier);
    console.log ('chords: ' + song.song);
    res.send (song.identifier);
  }).error (function () {
    console.log ('Failed to create quick song.');
  });
};

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
    res.render ('quicksong', {
      title: 'ChordFork: quick song',
      owner: song.owner,
      chords: song.song
    });
  });
};


