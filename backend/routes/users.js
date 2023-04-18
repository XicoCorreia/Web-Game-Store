var express = require('express');
var router = express.Router();
const {User} = require("../db/models/user");
const mongoose = require("mongoose");


/* GET users listing. Testing purposes */
router.get('/',async function(req, res, next) {
  const users=await User.find().select('-_id -__v');
  return res.status(200).json(users);
});

/* 
Create new User given body with username and password
Content-type must be x-www-form-urlencoded 
*/
router.post('/',async function(req,res,next){
  content=JSON.parse(JSON.stringify((req.body)));
  if(!content.hasOwnProperty('username') || !content.hasOwnProperty('password')){
    return res.status(400).json({Error:'Bad Request'});
  }
  try{
    newId = await findNextId();
    newUser = new User({...content,id:newId});
    await newUser.save();
    insertedUser= await await User.find(newUser).select('-_id -__v -password') ;
    return res.status(201).json(insertedUser);

  }catch (error){
    return res.status(304).json({Error:'Not Modified'})
  }

});

async function findNextId(){
  count = await User.find().count();
  if(count==0){
    return 1;
  }else{
    val = await User.findOne().sort('-id').select('id');
    return val.id+1;
  }
}

module.exports = router;
