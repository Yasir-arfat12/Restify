const mongoose = require("mongoose");


const BookingSchema = new mongoose.Schema({

    // ------------------------------------------------
    // Customer
    // ------------------------------------------------

    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true
    },


    // ------------------------------------------------
    // Pod owner
    // ------------------------------------------------

    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true
    },


    // ------------------------------------------------
    // Pod
    // ------------------------------------------------

    pod: {
        type: mongoose.Schema.ObjectId,
        ref: "Pod",
        required: true,
        index: true
    },


    // ------------------------------------------------
    // Booking date
    // ------------------------------------------------

    bookingDate: {
        type: Date,
        required: true,
        index: true
    },


    // ------------------------------------------------
    // Time
    // ------------------------------------------------

    startTime: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/
    },


    endTime: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/
    },


    // ------------------------------------------------
    // Duration in hours
    // Example:
    // 1
    // 1.5
    // 2
    // ------------------------------------------------

    duration: {
        type: Number,
        required: true,
        min: 0.5
    },


    // ------------------------------------------------
    // Price at time of booking
    // ------------------------------------------------

    hourlyPrice: {
        type: Number,
        required: true,
        min: 0
    },


    // ------------------------------------------------
    // Booking subtotal
    // ------------------------------------------------

    subtotal: {
        type: Number,
        required: true,
        min: 0
    },


    // ------------------------------------------------
    // Booking status
    // ------------------------------------------------

    bookingStatus: {

        type: String,

        enum: [
            "Pending",
            "Confirmed",
            "Completed",
            "Cancelled"
        ],

        default: "Pending",

        index: true

    },


    // ------------------------------------------------
    // Payment status
    // ------------------------------------------------

    paymentStatus: {

        type: String,

        enum: [
            "Pending",
            "Paid",
            "Refunded"
        ],

        default: "Pending",

        index: true

    }

}, {

    timestamps: true

});


// ----------------------------------------------------
// Compound index
//
// Useful when checking:
// "Does this pod have an active booking on this date?"
// ----------------------------------------------------

BookingSchema.index({
    pod: 1,
    bookingDate: 1,
    bookingStatus: 1
});


module.exports =
    mongoose.model(
        "Booking",
        BookingSchema
    );