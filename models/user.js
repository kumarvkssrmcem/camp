const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passsportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
});

// it is telling that the username is uniquee
UserSchema.plugin(passsportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);