var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Team = require('./models/team')
var methodOverride = require('method-override')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))

app.get('/', function (req, res){
  res.render('landing')
});

app.get('/about', function (req, res){
  res.render('about')
})

app.get('/team.json', function (req, res){
  Team.find({}, function (err, results){
    res.json(results)
  })
});

// app.get('/team/new', function (req, res){
//   res.render('form')
// })

app.get('/team', function (req, res){
  Team.find({}, function (err, results){
    res.render('team')
  })
});

app.get('/team/:id', function (req, res){
  Team.find({_id: req.params.id}, function (err, results){
  })
});

app.patch('/team/:id', function (req, res){
  Team.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.team.name}}, {$addToSet: {img: req.body.team.img}}, function (err){
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
  Team.find({}, function (err, results){
    res.render('dashboard')
  })
});

app.listen(process.env.PORT || 9292);