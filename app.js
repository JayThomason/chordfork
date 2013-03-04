/**
 * Module dependencies.
 */

var express = require ('express')
  , routes = require ('./routes')
  , user = require ('./routes/user')
  , http = require ('http')
  , path = require ('path')
  , Sequelize = require ('sequelize')
  , config = require ('./config')
  , db = new Sequelize (config.db_name, config.db_username, config.db_password, {
      dialect: config.db_dialect,
      host: config.db_host,
      port: config.db_port
    })
  , crypto = require('crypto')
  , app = express ();


/**
 * Configuration
 */

app.configure (function () {
  app.set  ('port', process.env.PORT || 8080);
  app.set ('views', __dirname + '/views');
  app.set ('view engine', 'jade');
  app.use (express.favicon ());
  app.use (express.logger ('dev'));
  app.use (express.bodyParser ());
  app.use (express.methodOverride ());
  app.use (express.cookieParser ('your secret here'));
  app.use (express.session ());
  app.use (app.router);
  app.use (express.static (path.join (__dirname, 'public')));
});



/**
 * Sequelize Configuration
 */

var User = db.import (__dirname + '/models/user.js');
User.sync ().success ( function () {
  console.log ("User table created.");
}).error (function () {
  console.log ("Failed to create User table.");
});
var TestSong = db.import (__dirname + '/models/test.js');
TestSong.sync ().success (function () {
  console.log ("TestSong table created.");
}).error (function () {
  console.log ("Failed to create TestSong table.");
});


/**
 * Routes and Controllers
 */
app.get ('/', routes.index);
app.get ('/splash', routes.splash);
app.get ('/create', routes.create);

app.post ('/login', function (req, res) {
  User.find({ where: {name: req.body.login_username} }).success (function (user) {
    if (user == null)
      return;
    req.session.logged_in = true;
    req.session.username = User.name;
  });
});

app.post ('/account/create', function (req, res) {
  var username = req.body.create_username;
  var pw = req.body.create_password;
  if (username == null || pw == null)
    return;
  User.create ({
    name: username,
    password: pw
  }).success (function (user) {
    console.log ('Created user: ' + user.name);
  }).error (function () {
    console.log ('Failed to create user.');
  });
});

app.post ('/test', function (req, res) {
  if (req.session.username == null)
    return;
  var username = req.session.username;
  var testsong = req.body.song;
/*  var current_date = (new Date ()).valueOf ().toString ();
  var random = Math.random ().toString ();
  var rand_id = crypto.createHash ('sha1').update (current_date + random).digest ('hex');*/
  var rand_id = crypto.randomBytes (10).toString ('hex');
  TestSong.create ({
    id: rand_id,
    song: testsong
  }).success (function (song) {
    console.log ('Create test song: ' + song.id);
  }).error (function () {
    console.log ('Failed to create test song.');
  });
});




app.configure ('development', function () {
  app.use (express.errorHandler ());
  app.use (app.router);
});

/**
 * Start
 */

http.createServer (app).listen (app.get ('port'), function () {
  console.log ("Express server listening on port " + app.get ('port'));
});
