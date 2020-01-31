const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pet = new Schema({
  name :{ type : String, required: true , maxlength: 20 , trim: true},
  specie: { type : String, required: true , maxlength: 20 , trim: true},
  age: { type : String, required: true , maxlength: 100 , trim: true},
  size: { type : String, required: true , maxlength: 100 , trim: true},
  sterilized : { type : String, required: true , maxlength: 10 , trim: true},
  personality : {type: String, required:true, maxlength: 100, trim:true},
  petCharacteristicsLive : {type: String, required:true, maxlength:100 , trim:true},
  petCharmyFamily : {type: String, required:true, maxlength:100 , trim:true},
  petCharmyKids : {type: String, required:true, maxlength:100 , trim:true},
  petCharmyPets : {type: String, required:true, maxlength:100 , trim:true},
  petExcersice : {type: String, required:true, maxlength:100 , trim:true},
  petSound : {type: String, required:true, maxlength:100 , trim:true},
  petBite : {type: String, required:true, maxlength:100 , trim:true},
  //created: { type: Date,default: Date.now },
  status: String,
  petImage: String,
  shelter: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});



module.exports = mongoose.model('Pet',pet);

