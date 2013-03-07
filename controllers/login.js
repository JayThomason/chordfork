var db = require ('../sequelize-singleton');

exports.login =  function (req, res) {
  var User = db.model ('user');
  User.find({ where: {name: req.body.login_username} }).success (function (user) {
    if (user == null)
      res.redirect ('/splash');
    req.session.logged_in = true;
    req.session.username = User.name;
    res.render ('create', {title: 'create' });
  });
}
