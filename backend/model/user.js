

const assportLocalMongoose=require("passport-local-mongoose")

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,  // Ensure email is required
        unique: true     // Ensure email is unique
    }
});

// Apply the plugin before exporting
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);