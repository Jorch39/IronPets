const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema ({
  name : { type: String,  maxlength: 80, trim: true},
  lastname : { type: String, maxlength: 80, trim: true},
  email : { type : String,  maxlength:40, trim: true },
  password : { type: String, maxlength : 100 , trim:true},
  phone : { type: Number},  
  role: { type: String, maxlength : 100 , trim:true},
  direction : { type: String , maxlength : 100 , trim:true},
  googleID: String
  }, 
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

