const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");

// GET ALL BOOKINGS
const getAllBookingsAdmin = async (req, res) => {
  const bookings = await Booking.find({}).sort({ createdAt: -1 }); //sort by date created

  res.status(200).json(bookings);
};

// GET A SINGLE BOOKING
const getBookingAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }
  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({ error: "No such booking" });
  }

  res.status(200).json(booking);
};

// DELETE A SINGLE BOOKING
const deleteBookingAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }

  const booking = await Booking.findOneAndDelete({ _id: id });

  if (!booking) {
    return res.status(400).json({ error: "No such booking" });
  }

  res.status(200).json(booking);
};

// UPDATE A SINGLE BOOKING
const updateBookingAdmin = async (req, res) => {
  const { id } = req.params;

  const { stats, mechanic_notes } = req.body;

  let emptyFields = [];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }

  const booking = await Booking.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!booking) {
    return res.status(400).json({ error: "No such booking" });
  }

  if (!stats) {
    emptyFields.push("stats");
  }
  if (!mechanic_notes) {
    emptyFields.push("mechanic_notes");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields", emptyFields });
  }

  res.status(200).json(booking);
};

module.exports = {
  getAllBookingsAdmin,
  getBookingAdmin,
  deleteBookingAdmin,
  updateBookingAdmin,
};
