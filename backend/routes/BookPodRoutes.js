const express = require("express")
const router = express.Router();

const {protect} = require("../middlewares/authMiddlewares");
const {authorize} = require("../middlewares/roleMiddleware");

const {
    createBooking
} = require("../Controllers/BookingController");

router.post("/", protect, authorize("customer"), createBooking);


module.exports = router

