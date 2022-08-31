const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
const handleNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username) {
    return res.status(400).json({ message: "username is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "password is required" });
  }

  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate)
    return res.status(409).json({ message: "username already exists" }); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPwd,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ success: `New user ${savedUser} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
