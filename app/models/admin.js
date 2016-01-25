var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var Schema = mongoose.Schema
var adminSchema = new Schema({
    email: String, 
    password_digest: String
});

var Admin = mongoose.model('Admin', adminSchema);

adminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = Admin;