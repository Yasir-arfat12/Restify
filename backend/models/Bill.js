const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    
     booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        required:true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        required:true,
        ref: "User"
    },
    invoiceNumber: {
        type:String,
        required:true,
        unique:true,
    },
    pod: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },


    subtotal:Number,

    gstRate:{
        type:Number,
        default:5
    },

    gstAmount:{
        type:Number
    },

    platformFee:{
        type:Number,
        default:10
    },

    totalAmount:{
        type:Number
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed","Refunded"],
        default:"Pending"
    },

    paymentId:String,

    paidAt:Date

},{
    timestamps:true
});

module.exports = mongoose.model("Bill", BillSchema);