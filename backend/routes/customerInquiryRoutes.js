const express = require("express");

const router = express.Router();

// Controller functions
const {
  getAllInquiries,
  createInquiry,
} = require("../controllers/customerInquiryController");

// GET ALL USERS
router.get("/", getAllInquiries);

// CREATE A NEW USER
router.post("/create", createInquiry);

module.exports = router;
