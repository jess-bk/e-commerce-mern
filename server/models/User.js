const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      User: { type: Number, default: 2001 },
      Admin: Number,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
