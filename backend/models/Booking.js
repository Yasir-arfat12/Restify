const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    pod: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Pod"
    },
    bookingDate:{
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required:true
    },
    endTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required:true
    },
    hourlyPrice: {
        type: Number,
        required: true
    },

        subtotal:{
        type:Number,
        required:true
    },

    bookingStatus:{
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Completed",
            "Cancelled"
        ],
        default:"Pending"
    },

    paymentStatus:{
        type:String,
        enum:[
            "Pending",
            "Paid",
            "Refunded"
        ],
        default:"Pending"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Booking", BookingSchema)
