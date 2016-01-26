var Team = require('../models/team.js');
var Admin = require('../models/admin.js');
var teamData = require('./team.json');
var adminData = require('./admin.json');

teamData.forEach(function (row){
  var team = new Team(row)
  team.save(function (err, result){
  })
})

adminData.forEach(function (row){
  var admin = new Admin(row)
  admin.save(function (err, result){
  })
})