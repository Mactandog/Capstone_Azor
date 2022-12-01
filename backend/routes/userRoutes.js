const express = require("express");

const router = express.Router();

// Controller functions
const {
  loginUser,
  signUpUser,
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

// Login Route
router.post("/login", loginUser);

// Signup Route
router.post("/signup", signUpUser);

// GET ALL USERS
router.get("/", getAllUsers);

// GET A SINGLE USER
router.get("/:id", getUser);

// CREATE A NEW USER
router.post("/create", createUser);

// DELETE A SINGLE USER
router.delete("/:id", deleteUser);

// UPDATE A SINGLE USER
router.put("/:id", updateUser);

module.exports = router;
