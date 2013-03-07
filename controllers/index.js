
/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render ('index', { title: 'Express' });
};

exports.splash = function (req, res) {
  res.render ('splash', { title: 'ChordFork'});
};

exports.create = function (req, res) {
  res.render ('create', { title: 'ChordFork'});
};

