const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema ({
  name : { type: String, required: true , maxlength: 80, trim: true},
  lastname : { type: String, required: true , maxlength: 80, trim: true},
  email : { type : String, required: true, maxlength:40, trim: true },
  password : { type: String, required: true, maxlength : 100 , trim:true},
  phone : { type: Number, required: true},  
  role: { type: String ,required: true, maxlength : 100 , trim:true},
  location: { type: { type: String }, coordinates: [Number] }

  //direction : { type: Object  , trim:true},

  }, 
  {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

