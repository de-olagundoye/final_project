var mongoose = require('mongoose');

var Schema = mongoose.Schema
var teamSchema = new Schema({
    name: String, 
    img:  Array
});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;