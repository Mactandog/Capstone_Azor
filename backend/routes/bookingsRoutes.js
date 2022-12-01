const express = require("express");
const {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
  getAllBookingsAdmin,
  getBookingAdmin,
  updateBookingAdmin,
  cancelBooking,
} = require("../controllers/bookingController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all booking routes
router.use(requireAuth);

// GET ALL BOOKINGS
router.get("/", getAllBookings);

// ADMIN GET ALL BOOKINGS
router.get("/admin", getAllBookingsAdmin);

// GET A SINGLE BOOKING
router.get("/:id", getBooking);

// ADMIN GET A SINGLE BOOKING
router.get("/admin/:id", getBookingAdmin);

// CREATE A NEW BOOKING
router.post("/", createBooking);

// DELETE A SINGLE BOOKING
router.delete("/:id", deleteBooking);

// UPDATE A SINGLE BOOKING
router.patch("/:id", updateBooking);

//  CANCEL A BOOKING
router.patch("/cancel/:id", cancelBooking);

// ADMIN COMPLETE A BOOKING
router.patch("/admin/:id", updateBookingAdmin);

// >>>>>> ADMIN CONTROL ROUTE <<<<<<

// // GET A SINGLE BOOKING
// router.get("/:id", getBookingAdmin);

// // DELETE A SINGLE BOOKING
// router.delete("/:id", deleteBookingAdmin);

module.exports = router;
