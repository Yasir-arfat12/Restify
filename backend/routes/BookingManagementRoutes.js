const express = require("express");

const router = express.Router();

const {
    protect
} = require("../middlewares/authMiddlewares");

const {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking,
    getOwnerBookings,
    getOwnerEarnings
} = require("../Controllers/BookingController");


// =====================================================
// CREATE BOOKING
// =====================================================

router.post(
    "/",
    protect,
    createBooking
);


// =====================================================
// CUSTOMER BOOKINGS
// =====================================================

router.get(
    "/my-bookings",
    protect,
    getMyBookings
);


// =====================================================
// OWNER BOOKINGS
// =====================================================

router.get(
    "/owner-bookings",
    protect,
    getOwnerBookings
);


// =====================================================
// OWNER EARNINGS
// =====================================================

router.get(
    "/owner-earnings",
    protect,
    getOwnerEarnings
);


// =====================================================
// SINGLE BOOKING
// =====================================================

router.get(
    "/:id",
    protect,
    getBookingById
);


// =====================================================
// CANCEL BOOKING
// =====================================================

router.patch(
    "/:id/cancel",
    protect,
    cancelBooking
);


module.exports = router;