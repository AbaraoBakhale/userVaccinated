
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    AdharNumber:{
      type:Number,
      unique:true
  },
  State:{
      type:String
  },
  Date:{
      type:Date
  },



})

module.exports = mongoose.model('users', userSchema);