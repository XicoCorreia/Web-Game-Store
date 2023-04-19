const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id : {type: Number,required:true,unique:true},
    username : {type: String,required: true,unique:true,minlength:3},
    password : {type: String,required: true},
    image : {type:String,required:true,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'},
    following : {type:[String],required:true,default:[]},
    followers : {type:[String],required:true,default:[]},

});

const User = mongoose.model("User",UserSchema);

module.exports = {User};