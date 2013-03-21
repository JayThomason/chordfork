/**
 * Default routing table.
 *
 * Contains routes for pages not necessarily related to a controller.
 */

exports.index = function (req, res) {
  res.render ('index', { title: 'Express' });
};

exports.splash = function (req, res) {
  if (req.session.logged_in)
    res.redirect ('home');
  var error = req.flash ('error');
  res.render ('splash', { 
    title: 'ChordFork',
    error: error
  });
};

exports.create = function (req, res) {
  res.render ('create', { title: 'ChordFork'});
};

exports.about = function (req, res) {
  res.render ('about', { title: 'About Chordfork' });
};

exports.notfound = function (req, res) {
  res.render ('notfound', { title: 'Not Found'});
};
