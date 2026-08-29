const generateInvoice = require("../Utils/invoiceGenerator");
const {calculateGST}  = require("../Utils/gstCalculator");
const Booking = require("../models/Booking")
const Bill = require("../models/Bill")

exports.createBill = async (req, res)=> {
    try{
        const bookingId = req.params.bookingId;
        const booking = await Booking.findById(req.params.bookingId).
        populate("customer")
        .populate("pod")

        if (!booking){
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        const existingBill = await Bill.findOne({booking: bookingId})

        if (existingBill){
            return res.status(400).json({
                message :"Bill Already Exists for this booking"
            });
        }


        const subTotal = booking.subtotal
 
        const gst = calculateGST(subTotal)
        
        console.log(gst);
        const bill = await Bill.create({
            booking: booking._id,

            bookingDate: booking.bookingDate,

            customer: booking.customer._id,

            owner: booking.owner,

            pod: booking.pod._id,

            invoiceNumber: generateInvoice(),

            subTotal,

            gstRate:gst.gstRate,

            gstAmount:gst.gstAmount,

            platformFee: gst.platformFee,

            totalAmount: gst.totalAmount

        });

        res.status(201).json(bill)

    
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }
}