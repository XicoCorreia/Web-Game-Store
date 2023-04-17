const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    id : {type:Number,required:true,unique:true},
    title : {type:String,required:true},
    description : {type:String,required:true,maxLength: 1000},
    type : {type:String,lowercase:true,required:true,enum:['game','subscription','dlc']},
    platform : {type:String, lowercase:true,required:true,enum:['all','xbox','pc','playstation','switch'],default:'all'},
    language : {type:String,required:true,default: 'english'},
    price : {type:Number,required:true},
    cover : {type:String,required:true,
        default:'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'},
    reel : {type:[String],required:false,default:[]},
    video : {type:String,required:false,default:''}

});

const Item = mongoose.model("Item",ItemSchema);

module.exports = {Item};