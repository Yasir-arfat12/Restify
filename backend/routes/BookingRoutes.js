const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddlewares");

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
// POST /api/bookings
// =====================================================

router.post(
    "/",
    protect,
    createBooking
);


// =====================================================
// CUSTOMER BOOKINGS
// GET /api/bookings/my-bookings
// =====================================================

router.get(
    "/my-bookings",
    protect,
    getMyBookings
);


// =====================================================
// OWNER BOOKINGS
// GET /api/bookings/owner-bookings
// =====================================================

router.get(
    "/owner-bookings",
    protect,
    getOwnerBookings
);


// =====================================================
// OWNER EARNINGS
// GET /api/bookings/owner-earnings
// =====================================================

router.get(
    "/owner-earnings",
    protect,
    getOwnerEarnings
);


// =====================================================
// CANCEL BOOKING
// PATCH /api/bookings/:id/cancel
// =====================================================

router.patch(
    "/:id/cancel",
    protect,
    cancelBooking
);


// =====================================================
// SINGLE BOOKING
// GET /api/bookings/:id
// =====================================================

router.get(
    "/:id",
    protect,
    getBookingById
);


module.exports = router;