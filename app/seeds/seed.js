var Team = require('../models/team.js');
var Admin = require('../models/admin.js');
var Admin = require('../models/events.js');
var teamData = require('./teams.json');
var adminData = require('./admins.json');
var eventData = require('./events.json');

teamData.forEach(function (row){
  var team = new Team(row)
  team.save(function (err, result){
  })
});

adminData.forEach(function (row){
  var admin = new Admin(row)
  admin.save(function (err, result){
  })
});

eventsData.forEach(function (row){
  var admin = new Admin(row)
  admin.save(function (err, result){
  })
})