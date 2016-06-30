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
const MusicDataService = require('./data_services/musicDataService');
const QueryDataService = require('./data_services/queryDataService');
const LoginDataService = require('./data_services/loginDataService');
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
    loginDataService                  : new LoginDataService(connection)
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

app.get('/', function(req, res){
  res.render('login',{
    layout: false
  });
});
app.get('/music', music.show);
app.get('/add', function(req, res){
  res.render('add');
});
app.post('/login', login.login);
app.post('/music/upload',multer({ dest: './public/uploads/', ext: '.mp3'}).single('audio') , music.add);
app.get('/delete/:id', music.delete);
const port = process.env.PORT || 2016;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
