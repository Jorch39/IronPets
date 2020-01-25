// models/user.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const petSchema = new Schema({
  name: String,
  shelter: String,
  breed: String,
  age: String, 
  size: String, 
  status: String,
  personality: String, 
  petImage: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;