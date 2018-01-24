var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

/**
 * Create a user Schema
 */
 var userSchema = new Schema({
     username: String,
     password: String,
     firstname: {
         type: String,
         default: ''
     },
     lastname: {
         type: String,
         default: ''
     },
     phone: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true
     },
     admin: {
         type: Boolean,
         default: false
     }
 },
{timestamps: true});

/**
 * instance methods to get the name and contact of the user
 */
userSchema.methods.getName = function () {
    return (this.firstname + " " + this.lastname);
}
userSchema.methods.getContact = function () {
    return (this.phone);
}

/**
 * Use the passport local mongoose module for authentication
 */
userSchema.plugin(passportLocalMongoose);

/**
 * mongoose will create a collection named users from schema
 */
var Users = mongoose.model('User', userSchema)

/**
 * export the userSchema schema
 */
module.exports = Users;