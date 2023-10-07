const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

//Generate token with user id and secret
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const isAdmin = user.isAdmin;
    const fname = user.first_name;
    const lname = user.last_name;
    const phone = user.phone;
    const picture = user.picture;
    const _id = user._id;

    // create token to login
    const token = createToken(user._id);

    res
      .status(200)
      .json({ _id, email, isAdmin, fname, lname, phone, picture, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//SignUp User
const signUpUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const user = await User.signup(first_name, last_name, email, password);

    // create token to login directly
    const token = createToken(user._id);
    const isAdmin = user.isAdmin;
    const fname = user.first_name;
    const lname = user.last_name;
    const phone = user.phone;
    const picture = user.picture;
    const id = user._id;
    res
      .status(200)
      .json({ id, email, isAdmin, fname, lname, phone, picture, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  // const user_id = req.user._id;

  const users = await User.find({}).sort({ createdAt: -1 }); //sort by date created

  res.status(200).json(users);
};

// GET A SINGLE USER
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// CREATE A NEW USER
const createUser = async (req, res) => {
  const { first_name, last_name, isAdmin, email, password, picture } = req.body;

  let emptyFields = [];
  if (!first_name) {
    emptyFields.push("first_name");
  }
  if (!last_name) {
    emptyFields.push("last_name");
  }
  if (!isAdmin) {
    emptyFields.push("isAdmin");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields", emptyFields });
  }

  // Validate Email
  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(400).json({ error: "Email already in use!" });
  }

  if (!validator.isEmail(email)) {
    return res.status(404).json({ error: "Email is not valid!" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password is not strong enough!" });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Add user to db
  try {
    const user = await User.create({
      first_name,
      last_name,
      isAdmin,
      email,
      password: hash,
      picture,
    });
    res.status(200).json(user);
    return { isSuccess };
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// DELETE A SINGLE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// UPDATE A SINGLE USER
const updateUser = async (req, res) => {
  const { id } = req.params;

  const { first_name, last_name, isAdmin } = req.body;

  let emptyFields = [];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }

  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  if (!first_name) {
    emptyFields.push("first_name");
  }
  if (!last_name) {
    emptyFields.push("last_name");
  }
  if (!isAdmin) {
    emptyFields.push("isAdmin");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields", emptyFields });
  }

  res.status(200).json(user);
};

module.exports = {
  loginUser,
  signUpUser,
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
