var mongoose = require('mongoose');

var Schema = mongoose.Schema
var eventSchema = new Schema({
    img_src: String
});

var Events = mongoose.model('Events', eventSchema);

module.exports = Events;