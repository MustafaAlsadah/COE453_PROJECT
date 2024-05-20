const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    phone: String,
    projects: Array,
    fieldsOfExpertise: Array
}, { collection: "users" });

const User = mongoose.model('User', UserSchema);
module.exports.User = User