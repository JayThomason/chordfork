/**
 * Default routing table.
 *
 * Contains routes for pages not necessarily related to a controller.
 */

exports.index = function (req, res) {
  res.render ('index', { title: 'Express' });
};

exports.splash = function (req, res) {
  var error = req.flash ('error');
  res.render ('splash', { 
    title: 'ChordFork',
    error: error
  });
};

exports.create = function (req, res) {
  res.render ('create', { title: 'ChordFork'});
};

