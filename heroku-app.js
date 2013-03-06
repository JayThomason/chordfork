/**
 * Module dependencies.
 */

var express = require ('express')
  , routes = require ('./routes')
  , user = require ('./routes/user')
  , http = require ('http')
  , path = require ('path')
  , Sequelize = require ('sequelize')
  , crypto = require('crypto')
  , app = express ();


console.log (process.env);

var url = require('url')
  , dbUrl = url.parse(process.env.DATABASE_URL)
  , authArr = dbUrl.auth.split(':')
  , db_name = dbUrl.path.substring(1)
  , db_user = authArr[0]
  , db_pass = authArr[1]
  , db_host = dbUrl.host
  , db_dialect = 'postgres'
  , db_protocol = 'postgres';


  
var db = new Sequelize (db_name, db_user, db_pass, 
{
  dialect: db_dialect,
  protocol: db_protocol,
  host: db_host,
  port: null
});


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
User.sync ({
  force: true
}).success ( function () {
  console.log ("User table created.");
}).error (function () {
  console.log ("Failed to create User table.");
});
var QuickSong = db.import (__dirname + '/models/quicksong.js');
QuickSong.sync ({
  force: true
}).success (function () {
  console.log ("QuickSong table created.");
}).error (function () {
  console.log ("Failed to create QuickSong table.");
});


/**
 * Routes and Controllers
 */
app.get ('/', routes.splash);
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

app.post ('/quickpost', function (req, res) {
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
});

app.get ('/quicksong/:id', function (req, res) {
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
