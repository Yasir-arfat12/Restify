const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({

        booking:{
            type: mongoose.Schema.ObjectId,
            required:true,
            ref:"User"
        },
        bill:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:"Bill"
        },
        customer:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        razorpayOrderId:{
            type:String,
            required:true
        },
        razorpayPaymentId:{
            type:String
        },
        amount:{
            type:Number,
            required:true
        },
        currency:{
            type:Number,
            default:"INR"
        },
        status:{
            type:String,
            enum:[
                "Pending",
                "Success",
                "Failed",
                "Refunded"
            ],
            default:"Pending"
        },
},{timestamps:true});

module.exports = mongoose.model("Payment",paymentSchema)