var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDb');

var Schema = mongoose.Schema
var teamSchema = new Schema({
    name: String, 
    img:  Array
});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;