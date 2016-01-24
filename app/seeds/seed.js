var Team = require('../models/team.js');
var data = require('./seeds.json');

data.forEach(function (row){
  var team = new Team(row)
  team.save(function (err, result){
  })
})