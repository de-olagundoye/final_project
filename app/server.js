var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Team = require('./models/team');
var Admin = require('./models/admin');
var session = require('express-session');
var bcrypt = require('bcrypt');
var MongoStore = require('connect-mongo')(session);
var methodOverride = require('method-override');


var authenticateUser = function(email, password, callback) {
  Admin.findOne({email: email}, function(err, data) {
    if (err) {throw err;}
    bcrypt.compare(password, data.password_digest, function(err, passwordsMatch) {
      if (passwordsMatch) {
        callback(data);
        console.log('authenticated')
      } else {
        callback(false);
        console.log('NOT authenticated')
      }
    })
  });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

var mongolabURI = "mongodb://heroku_030635dr:qmfeb33h7jd59e4tpkm2srtfs9@ds049945.mongolab.com:49945/heroku_030635dr"
var mongoUrl = "mongodb://localhost:27017/myDb"

app.use(session({
  secret: 'charon',
  store: new MongoStore({ url: mongoUrl }),
  resave: true,
  saveUninitialized: true
}))

app.use(function(req, res, next) {
  // console.log(req.method, req.url, '\n body:', req.body, '\n session:', req.session);
  next();
});

app.get('/', function (req, res){
  res.render('landing')
});

app.get('/team.json', function (req, res){
  Team.find({}, function (err, results){
    res.json(results)
  })
});

app.get('/about', function (req, res){
  res.render('about')
})

app.get('/team', function (req, res){
  Team.find({}, function (err, results){
    res.render('team')
  })
});

app.get('/login', function (req, res){
  res.render('login')
})

app.post('/login', function(req, res) {
  authenticateUser(req.body.email, req.body.password, function(admin) {
    if (admin) {
      req.session.email = admin.email;
      req.session.password = admin.password_digest;
      }
    res.redirect('/admin');
  });
});

// app.get('/team/new', function (req, res){
//   res.render('form')
// })



app.get('/team/:id', function (req, res){
  Team.find({_id: req.params.id}, function (err, results){
  })
});

app.patch('/team/:id', function (req, res){
  console.log(req.body.team.img)
  Team.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.team.name}}, {$push: {img: req.body.team.img}}, function (err){
    res.redirect('/admin')
  })
})

app.delete('/team/:id', function (req, res) {
  Team.findOneAndRemove({_id: req.params.id}, function (err){
    if (err) throw err;
    res.redirect('/admin')
  })
});

app.post('/team', function (req, res){
  var team = new Team(req.body.team)
  team.save(function () {
    res.redirect('/admin')
  })
});

app.get('/admin', function (req, res){
  var loggedIn = req.session.email
  if (loggedIn) {
    console.log('loggedIn')

    Team.find({}, function (err, results){
      res.render('dashboard')
    })
  } else {
    console.log('NOT loggedIn')
    res.redirect('/')
  }
});

app.get('/logout', function(req, res) {
  req.session.email = null;
  req.session.password = null;
  req.session.id = null;
  console.log(req.session.email)
  res.redirect('/');
})

app.listen(process.env.PORT || 9292);