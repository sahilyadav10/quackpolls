const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  value: String,
  votes: { type: Number, required: true, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: {type:String, required: true},
  visibility: {type:String, required: true},
  options: {type:[optionSchema], required: true},
});

module.exports = mongoose.model("Poll", pollSchema);
