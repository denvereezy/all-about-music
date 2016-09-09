const express      = require('express'),
      exhbs        = require('express-handlebars'),
      cookieParser = require('cookie-parser'),
      session      = require('express-session'),
      bodyParser   = require('body-parser'),
      mysql        = require('mysql'),
      multer       = require('multer'),
      connectionPv = require('connection-provider'),
      compression  = require('compression'),
      flash        = require('express-flash'),
      app          = express();

const music = require('./routes/music');
const login = require('./routes/login');
const signup = require('./routes/signup');
const router = require('./routes/router');
const videos = require('./routes/videos');

const MusicDataService = require('./data_services/musicDataService');
const QueryDataService = require('./data_services/queryDataService');
const LoginDataService = require('./data_services/loginDataService');
const SignupDataService = require('./data_services/signupDataService');
const VideoDataService = require('./data_services/videoDataService');

const dbOptions = {
  host: 'localhost',
  port: 3306,
  user: 'admin',
  password: 'password',
  database: 'music'
};

const serviceSetupCallBack = function (connection) {
  return {
    queryDataService                  : new QueryDataService(connection),
    musicDataService                  : new MusicDataService(connection),
    loginDataService                  : new LoginDataService(connection),
    signupDataService                 : new SignupDataService(connection),
    videoDataService                  : new VideoDataService(connection)
  }
};

app.use(connectionPv(dbOptions, serviceSetupCallBack));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret : 'keyboard cat', cookie :{ maxAge : 3600000 }, resave : true, saveUninitialized : true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(compression());
app.use(flash());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.get('/', router.login);
app.post('/login', login.login);
app.get('/signup', router.signup);
app.post('/signup', signup.add);
app.get('/error', router.error);
app.use(router.checkUser);
app.get('/home', router.checkUser, router.home);
app.get('/music', router.checkUser, music.show);
app.get('/select', router.checkUser, router.select);
app.get('/add', router.checkUser, router.addSong);
app.post('/music/upload', router.checkUser, multer({ dest: './public/uploads/', ext: '.mp3'}).single('audio') , music.add);
app.get('/delete/:id', router.checkUser, music.delete);
app.get('/videos', router.checkUser, videos.show);
app.get('/video/add', router.checkUser, router.addVideo);
app.post('/video/upload', router.checkUser, multer({ dest: './public/uploads/', ext: '.mp4'}).single('video') , videos.add);
app.get('/video/delete/:id', router.checkUser, videos.delete);
app.get('/logout', router.checkUser, router.logout);


const port = process.env.PORT || 2016;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
