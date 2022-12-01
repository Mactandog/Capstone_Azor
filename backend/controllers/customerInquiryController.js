const mongoose = require("mongoose");
const CustomerInquiry = require("../models/customerInquiryModel");
const validator = require("validator");

// GET ALL INQUIRIES
const getAllInquiries = async (req, res) => {
  const inquiries = await CustomerInquiry.find({}).sort({ createdAt: -1 }); //sort by date created

  res.status(200).json(inquiries);
};

// CREATE GENERAL INQUIRY
const createInquiry = async (req, res) => {
  const { first_name, last_name, email, message } = req.body;

  let emptyFields = [];

  if (!first_name) {
    emptyFields.push("first_name");
  }
  if (!last_name) {
    emptyFields.push("last_name");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!message) {
    emptyFields.push("message");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields", emptyFields });
  }

  if (!validator.isEmail(email)) {
    return res.status(404).json({ error: "Email is not valid!" });
  }

  // Add data to db
  try {
    const inquiry = await CustomerInquiry.create({
      first_name,
      last_name,
      email,
      message,
    });
    res.status(200).json(inquiry);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllInquiries, createInquiry };
