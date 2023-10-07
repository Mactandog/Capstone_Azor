const express = require("express");
const {
  getAllBookingsAdmin,
  getBookingAdmin,
  deleteBookingAdmin,
  updateBookingAdmin,
} = require("../controllers/adminBookingController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all booking routes
router.use(requireAuth);

// >>>>>> ADMIN CONTROL ROUTE <<<<<<

// GET ALL BOOKINGS
router.get("/", getAllBookingsAdmin);

// GET A SINGLE BOOKING
router.get("/:id", getBookingAdmin);

// DELETE A SINGLE BOOKING
router.delete("/:id", deleteBookingAdmin);

// UPDATE A SINGLE BOOKING
router.patch("/:id", updateBookingAdmin);

module.exports = router;
