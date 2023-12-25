const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    age: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("myuser", userSchema);
