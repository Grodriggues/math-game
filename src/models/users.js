const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname:{
        required:true,
        type:String,
        unique:true,
        trim:true

    },

    bestTime:{
        type:Number,
        required:true
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User;