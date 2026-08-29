const Pod = require("../models/BookPods")
const Booking = require("../models/Booking")
const Bill = require("../models/Bill")
const generateInvoice = require("../Utils/invoiceGenerator");
const {calculateGST}  = require("../Utils/gstCalculator");
exports.createBooking = async (req , res)=> {
    try{

        const {
            podId,
            bookingDate,
            startTime,
            endTime
        } = req.body

        const pod = await Pod.findById(podId)

        if (!pod){
            return res.status(404).json({
                message: "Pod Not Found"
            });
        }

        const start = Number(startTime.split(":")[0]);

        const end = Number(endTime.split(":")[0]);

        if (end<=start){
            return res.status(400).json({
                message: "End Time must be greater than start time"
            });
        }

        const duration = end - start;

        const existingBooking = await Booking.findOne({
            pod: podId,
            bookingDate: new Date(bookingDate)
        });

        bookingStatus: {
            $ne: "Cancelled"
        }

        if(existingBooking){
            const bookedStart= Number(existingBooking.startTime.split(":")[0]);

            const bookedEnd = Number(existingBooking.endTime.split(":")[0]);

            const overlap = start < bookedEnd && end > bookedStart

            if (overlap){
                return res.status(409).json({
                    message: "Pod Already Booked for Selected time"
                });


            }
        }
     
    const subtotal = duration * pod.hourlyPrice;

    const booking = await Booking.create({
        customer: req.user._id,
        owner:pod.owner,

        pod:pod._id,

        bookingDate,

        startTime,

        endTime,

        duration,

        hourlyPrice:pod.hourlyPrice,

        subtotal

    });
        const subTotal = booking.subtotal
     
      const gst = calculateGST(subTotal)

    const bill = await Bill.create({

    booking: booking._id,

    customer: booking.customer,

    owner: booking.owner,

    pod: booking.pod,

    bookingDate: booking.bookingDate,

    invoiceNumber: generateInvoice(),

    subtotal: booking.subtotal,

    gstRate: gst.gstRate,

    gstAmount: gst.gstAmount,

    platformFee: gst.platformFee,

    totalAmount: gst.totalAmount,

    paymentStatus: "Pending"

});

    res.status(201).json({
        sucess:true,
        booking,
        bill
    })

    }catch(error){
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }

}