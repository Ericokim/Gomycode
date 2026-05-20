const mongoose = require("mongoose");

// Person documents store the fields required by the checkpoint.
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

module.exports = mongoose.model("Person", personSchema);
