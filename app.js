/**
 * Module dependencies.
 */

/* Basic Modules and Express */
var express = require ('express')
  , http = require ('http')
  , path = require ('path')
  , config = require ('./config')
  , flash = require ('connect-flash')
  , app = express ();

/* Sequelize Singleton */
require ('./sequelize-singleton').setup ('./models', config.db_name, 
  config.db_username, config.db_password, {
    dialect: config.db_dialect,
    host: config.db_host,
    port: config.db_port 
  });
var db = require ('./sequelize-singleton');

/* Routing And Controllers */
var user = require ('./controllers/user')
  , quicksong = require ('./controllers/quicksong')
  , song = require ('./controllers/song')
  , routes = require ('./controllers');


/**
 * Configuration
 */

app.configure (function () {
  app.set  ('port', process.env.PORT || 8080);
  app.set ('views', __dirname + '/views');
  app.set ('view engine', 'jade');
  app.set ('view options', { pretty: true});
  app.use (express.favicon ());
  app.use (express.logger ('dev'));
  app.use (express.bodyParser ());
  app.use (express.methodOverride ());
  app.use (express.cookieParser ('your secret here'));
  app.use (express.session ());
  app.use (flash ());
  app.use (app.router);
  app.use (express.static (path.join (__dirname, 'public')));
});



/**
 * Sequelize Configuration
 */

var User = db.model ("user");
User.sync ({
  force: true
}).success ( function () {
  console.log ("User table created.");
}).error (function () {
  console.log ("Failed to create User table.");
});
var QuickSong = db.model ("quicksong");
QuickSong.sync ({
  force: true
}).success (function () {
  console.log ("QuickSong table created.");
}).error (function () {
  console.log ("Failed to create QuickSong table.");
});
var Song = db.model ("song");
Song.sync ({
  force: true
}).success (function () {
  console.log ("Song table created.");
}).error (function () {
  console.log ("Failed to create Song table.");
});


/**
 * Routes and Controllers
 */
app.get ('/', routes.splash);
app.get ('/splash', routes.splash);
app.get ('/create', routes.create);
app.get ('/about', routes.about);
app.post ('/users/login', user.login);
app.post ('/users/create', user.create);
app.post ('/quicksong/create', quicksong.create);
app.get ('/quicksong/view/:id', quicksong.view);
app.post ('/song/create', song.create);
app.get ('/song/view/:id', song.view);



/**
 * Start
 */

app.configure ('development', function () {
  app.use (express.errorHandler ());
  app.use (app.router);
});

http.createServer (app).listen (app.get ('port'), function () {
  console.log ("Express server listening on port " + app.get ('port'));
});
