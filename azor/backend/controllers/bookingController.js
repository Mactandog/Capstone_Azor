const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");

// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {
  const user_id = req.user._id;

  const bookings = await Booking.find({ user_id }).sort({ createdAt: -1 }); //sort by date created

  res.status(200).json(bookings);
};
// ADMIN GET ALL BOOKINGS
const getAllBookingsAdmin = async (req, res) => {
  const bookings = await Booking.find({}).sort({ createdAt: -1 }); //sort by date created

  res.status(200).json(bookings);
};

// GET A SINGLE BOOKING
const getBooking = async (req, res) => {
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

// ADMIN GET A SINGLE BOOKING
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

// CREATE A NEW BOOKING
const createBooking = async (req, res) => {
  const {
    date,
    time_slot,
    brand,
    model,
    reg_num,
    services,
    remarks,
    costs,
    user_phone,
    mechanic_notes,
    first_name,
    last_name,
  } = req.body;

  let emptyFields = [];
  if (!date) {
    emptyFields.push("date");
  }
  if (!time_slot) {
    emptyFields.push("timeSlot");
  }
  if (!user_phone) {
    emptyFields.push("user_phone");
  }
  if (!brand) {
    emptyFields.push("brand");
  }
  if (!model) {
    emptyFields.push("model");
  }
  if (!reg_num) {
    emptyFields.push("regNum");
  }
  if (services.length === 0) {
    emptyFields.push("services");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields", emptyFields });
  }

  // Add data to db

  try {
    const user_id = req.user._id;

    const booking = await Booking.create({
      // date,
      // time_slot,
      // user_phone,
      // brand,
      // model,
      // reg_num,
      // services,
      // remarks,
      // costs,
      // user_id,
      // first_name,
      // last_name,

      date,
      time_slot,
      brand,
      model,
      reg_num,
      services,
      remarks,
      costs,
      user_phone,
      mechanic_notes,
      first_name,
      last_name,
      user_id,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE A SINGLE BOOKING
const deleteBooking = async (req, res) => {
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
const updateBooking = async (req, res) => {
  const { id } = req.params;

  const { date, time_slot, user_phone, brand, model, reg_num, services } =
    req.body;

  let emptyFields = [];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }
  if (!date) {
    emptyFields.push("date");
  }
  if (!time_slot) {
    emptyFields.push("timeSlot");
  }
  if (!user_phone) {
    emptyFields.push("user_phone");
  }
  if (!brand) {
    emptyFields.push("brand");
  }
  if (!model) {
    emptyFields.push("model");
  }
  if (!reg_num) {
    emptyFields.push("regNum");
  }
  if (services.length === 0) {
    emptyFields.push("services");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields", emptyFields });
  }
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!booking) {
      return res.status(400).json({ error: "No such booking" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  CANCEL A SINGLE BOOKING
const cancelBooking = async (req, res) => {
  const { id } = req.params;

  const { stats } = req.body;

  let emptyFields = [];

  if (!stats) {
    emptyFields.push("stats");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please select status to update",
      emptyFields,
    });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid id" });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!booking) {
      return res.status(400).json({ error: "No such booking" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ADMIN UPDATE A SINGLE BOOKING
const updateBookingAdmin = async (req, res) => {
  const { id } = req.params;

  const { stats, mechanic_notes } = req.body;

  let emptyFields = [];

  if (!stats) {
    emptyFields.push("stats");
  }
  if (!mechanic_notes) {
    emptyFields.push("mechanic_notes");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error:
        'Please put any notes by the mechanic in-charge. Or just leave this note "No other recommendations."',
      emptyFields,
    });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not a valid id" });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!booking) {
      return res.status(400).json({ error: "No such booking" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
  getAllBookingsAdmin,
  getBookingAdmin,
  updateBookingAdmin,
  cancelBooking,
};
