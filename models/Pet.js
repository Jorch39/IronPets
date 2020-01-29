const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pet = new Schema({
  name :{ type : String, required: true , maxlength: 20 , trim: true},
  specie: { type : String, required: true , maxlength: 20 , trim: true},
  age: { type : String, required: true , maxlength: 100 , trim: true},
  size: { type : String, required: true , maxlength: 100 , trim: true},
  sterilized : { type : String, required: true , maxlength: 10 , trim: true},
  created: { type: Date,default: Date.now },
  status: String,
  personality: String, 
  petImage: String,
  shelter: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});



module.exports = mongoose.model('Pet',pet);

