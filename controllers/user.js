/**
 * Controller: User
 * -------------------------------------------------------
 *  Actions undertaken by users which interact with their
 *  own accounts, such as logging in and signing up.
 */

/* Require sequelize module */
var db = require ('../sequelize-singleton');
var User = db.model ('user');

/* Logs a user in by setting session variables and
 * redirecting to /create. This should later be changed
 * to the home page.
 */
function session_login (req, res, user) {
  req.session.logged_in = true;
  req.session.username = user.name;
  res.redirect ('/create');
}

/* POST /user/login */
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
      session_login (req, res, user);
    }
  }).error (function () {
    console.log ('Failed to find user.');
    res.send ('Failed to find user.');
  });
}

/* POST user/create */
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
    session_login (req, res, user);
  }).error (function () {
    console.log ('Failed to create user.');
    res.send ('Failed to create user.');
  });
};
