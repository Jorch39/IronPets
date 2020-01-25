const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema ({
  name : { type: String, required: true , maxlength: 80, trim: true},
  email : { type : String, required: true, maxlength:40, trim: true },
  password : { type: String, required: true, maxlength : 40 , trim:true},
  phone : { type: Number, required: true},
 // type : { type: String , required: true, maxlength:20},
  created: { type: Date, default: Date.now }
  
})

const User = mongoose.model('User', userSchema);
module.exports = User;
