var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var db;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/myDb';
MongoClient.connect(mongoUrl, function(err, database) {
  if (err) { throw err; }
  db = database;
  process.on('exit', db.close);
});

app.get('/', function (req, res){
  res.render('landing')
});

app.get('/about', function (req, res){
  res.render('about')
})

app.get('/theteam', function (req, res){
  db.collection('nocomplyteam').find({}).toArray(function (err, results){
    res.json(results);
  })
});

app.get('/team', function (req, res){
  db.collection('nocomplyteam').find({}).toArray(function (err, results){
    res.render('team');
  })
});

app.post('/theteam', function (req, res){
  db.collection('nocomplyteam').insert({"name": name, "img": img}, function (err, results){
    res.json(results);
  })
});

app.listen(process.env.PORT || 3000);