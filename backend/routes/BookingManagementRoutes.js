const express = require("express");

const router = express.Router();

const {
    protect
} = require("../middlewares/authMiddlewares");

const {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking
} = require("../Controllers/BookingController");


// ====================================================
// CREATE BOOKING
// ====================================================

router.post(
    "/",
    protect,
    createBooking
);


// ====================================================
// CUSTOMER BOOKINGS
// ====================================================

router.get(
    "/my-bookings",
    protect,
    getMyBookings
);


// ====================================================
// SINGLE BOOKING
// ====================================================

router.get(
    "/:id",
    protect,
    getBookingById
);


// ====================================================
// CANCEL BOOKING
// ====================================================

router.patch(
    "/:id/cancel",
    protect,
    cancelBooking
);


module.exports = router;