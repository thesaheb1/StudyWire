const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    about:String,
    dateOfBirth:String,
    gender:String,
    phoneNumber:String,
    country:String

});

module.exports = mongoose.model("Profile", profileSchema);