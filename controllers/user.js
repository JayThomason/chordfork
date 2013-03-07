var db = require ('../sequelize-singleton');
var User = db.model ('user');

exports.login =  function (req, res) {
  User.find({ 
    where: {
      name: req.body.login_username
    } 
  }).success (function (user) {
    if (user == null) {
      console.log ('Failed to log in user.');
      res.send ('Failed to log in user.');
    }
    else {
      req.session.logged_in = true;
      req.session.username = User.name;
      res.redirect ('/create');
    }
  });
}

exports.create = function (req, res) {
  var username = req.body.create_username;
  var pw = req.body.create_password;
  if (username == null || pw == null)
    return;
  User.create ({
    name: username,
    password: pw
  }).success (function (user) {
    console.log ('Created user: ' + user.name);
    res.redirect ('/create');
  }).error (function () {
    console.log ('Failed to create user.');
    res.send ('Failed to create user.');
  });
};
