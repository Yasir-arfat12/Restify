const Pod = require("../models/BookPods");
const Booking = require("../models/Booking");
const Bill = require("../models/Bill");
const generateInvoice = require("../Utils/invoiceGenerator");
const { calculateGST } = require("../Utils/gstCalculator");


// ----------------------------------------------------
// Helper: Convert HH:MM into minutes
// ----------------------------------------------------
const timeToMinutes = (time) => {
    if (!time || !/^\d{2}:\d{2}$/.test(time)) {
        return null;
    }

    const [hours, minutes] = time.split(":").map(Number);

    if (
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        return null;
    }

    return hours * 60 + minutes;
};


// ----------------------------------------------------
// Helper: Check whether two time ranges overlap
// ----------------------------------------------------
const isOverlapping = (
    requestedStart,
    requestedEnd,
    bookedStart,
    bookedEnd
) => {
    return (
        requestedStart < bookedEnd &&
        requestedEnd > bookedStart
    );
};


// ====================================================
// CREATE BOOKING
// ====================================================

exports.createBooking = async (req, res) => {
    try {

        const {
            podId,
            bookingDate,
            startTime,
            endTime
        } = req.body;


        // ---------------------------------------------
        // Basic validation
        // ---------------------------------------------

        if (
            !podId ||
            !bookingDate ||
            !startTime ||
            !endTime
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Pod, booking date, start time and end time are required"
            });
        }


        // ---------------------------------------------
        // Find pod
        // ---------------------------------------------

        const pod = await Pod.findById(podId);

        if (!pod) {
            return res.status(404).json({
                success: false,
                message: "Pod not found"
            });
        }


        // ---------------------------------------------
        // Check pod availability
        // ---------------------------------------------

        if (pod.status !== "Available") {
            return res.status(400).json({
                success: false,
                message: "This pod is currently unavailable"
            });
        }


        // ---------------------------------------------
        // Validate date
        // ---------------------------------------------

        const selectedDate = new Date(bookingDate);

        if (Number.isNaN(selectedDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking date"
            });
        }


        // ---------------------------------------------
        // Prevent booking in the past
        // ---------------------------------------------

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const bookingDay = new Date(selectedDate);

        bookingDay.setHours(0, 0, 0, 0);

        if (bookingDay < today) {
            return res.status(400).json({
                success: false,
                message: "You cannot book a pod for a past date"
            });
        }


        // ---------------------------------------------
        // Convert times to minutes
        // ---------------------------------------------

        const requestedStart = timeToMinutes(startTime);
        const requestedEnd = timeToMinutes(endTime);


        if (
            requestedStart === null ||
            requestedEnd === null
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid time format. Use HH:MM"
            });
        }


        // ---------------------------------------------
        // Validate time range
        // ---------------------------------------------

        if (requestedEnd <= requestedStart) {
            return res.status(400).json({
                success: false,
                message:
                    "End time must be greater than start time"
            });
        }


        // ---------------------------------------------
        // Calculate duration
        // ---------------------------------------------

        const durationMinutes =
            requestedEnd - requestedStart;

        const durationHours =
            durationMinutes / 60;


        // ---------------------------------------------
        // Find existing active bookings
        // ---------------------------------------------

        const existingBookings = await Booking.find({
            pod: podId,

            bookingDate: {
                $gte: new Date(
                    selectedDate.setHours(0, 0, 0, 0)
                ),

                $lt: new Date(
                    new Date(bookingDate).setHours(
                        24,
                        0,
                        0,
                        0
                    )
                )
            },

            bookingStatus: {
                $in: [
                    "Pending",
                    "Confirmed"
                ]
            }
        });


        // ---------------------------------------------
        // Check overlap
        // ---------------------------------------------

        for (const existingBooking of existingBookings) {

            const bookedStart =
                timeToMinutes(
                    existingBooking.startTime
                );

            const bookedEnd =
                timeToMinutes(
                    existingBooking.endTime
                );


            if (
                bookedStart !== null &&
                bookedEnd !== null &&
                isOverlapping(
                    requestedStart,
                    requestedEnd,
                    bookedStart,
                    bookedEnd
                )
            ) {

                return res.status(409).json({
                    success: false,
                    message:
                        "This pod is already booked for the selected time"
                });
            }
        }


        // ---------------------------------------------
        // Calculate subtotal
        // ---------------------------------------------

        const subtotal =
            durationHours * pod.hourlyPrice;


        // ---------------------------------------------
        // Create booking
        // ---------------------------------------------

        const booking = await Booking.create({

            customer: req.user._id,

            owner: pod.owner,

            pod: pod._id,

            bookingDate: selectedDate,

            startTime,

            endTime,

            duration: durationHours,

            hourlyPrice: pod.hourlyPrice,

            subtotal,

            bookingStatus: "Pending",

            paymentStatus: "Pending"

        });


        // ---------------------------------------------
        // Calculate GST
        // ---------------------------------------------

        const gst =
            calculateGST(subtotal);


        // ---------------------------------------------
        // Generate bill
        // ---------------------------------------------

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


        // ---------------------------------------------
        // Response
        // ---------------------------------------------

        return res.status(201).json({

            success: true,

            message: "Booking created successfully",

            booking,

            bill

        });


    } catch (error) {

        console.error(
            "Create Booking Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while creating booking",

            error: error.message

        });

    }
};



// ====================================================
// GET CUSTOMER BOOKINGS
// ====================================================

exports.getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            customer: req.user._id
        })
            .populate(
                "pod",
                "podName location city state hourlyPrice images"
            )
            .populate(
                "owner",
                "name email"
            )
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            count: bookings.length,

            bookings

        });


    } catch (error) {

        console.error(
            "Get My Bookings Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch your bookings",

            error: error.message

        });

    }
};


// ====================================================
// CANCEL BOOKING
// ====================================================

exports.cancelBooking = async (req, res) => {

    try {

        const booking =
            await Booking.findById(
                req.params.id
            );


        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found"

            });

        }


        // ---------------------------------------------
        // Only customer / owner / admin
        // ---------------------------------------------

        const isCustomer =
            booking.customer.toString() ===
            req.user._id.toString();

        const isOwner =
            booking.owner.toString() ===
            req.user._id.toString();

        const isAdmin =
            req.user.role === "admin";


        if (
            !isCustomer &&
            !isOwner &&
            !isAdmin
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not authorized to cancel this booking"

            });

        }


        // ---------------------------------------------
        // Already cancelled
        // ---------------------------------------------

        if (
            booking.bookingStatus ===
            "Cancelled"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Booking is already cancelled"

            });

        }


        // ---------------------------------------------
        // Completed booking cannot be cancelled
        // ---------------------------------------------

        if (
            booking.bookingStatus ===
            "Completed"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Completed bookings cannot be cancelled"

            });

        }


        booking.bookingStatus =
            "Cancelled";


        // Payment will be handled in Batch 6
        // For now keep payment status unchanged.

        await booking.save();


        return res.status(200).json({

            success: true,

            message:
                "Booking cancelled successfully",

            booking

        });


    } catch (error) {

        console.error(
            "Cancel Booking Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to cancel booking",

            error: error.message

        });

    }
};

// ====================================================
// GET OWNER BOOKINGS
// ====================================================

exports.getOwnerBookings = async (req, res) => {
    try {

        // Only owners should use this endpoint
        if (req.user.role !== "owner") {
            return res.status(403).json({
                success: false,
                message: "Only owners can view owner bookings"
            });
        }

        const bookings = await Booking.find({
            owner: req.user._id
        })
            .populate(
                "pod",
                "podName location city state hourlyPrice images"
            )
            .populate(
                "customer",
                "name email"
            )
            .sort({
                createdAt: -1
            });

        return res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {

        console.error(
            "Get Owner Bookings Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch owner bookings",
            error: error.message
        });
    }
};


// ====================================================
// GET OWNER EARNINGS
// ====================================================

exports.getOwnerEarnings = async (req, res) => {
    try {

        // Only owners should use this endpoint
        if (req.user.role !== "owner") {
            return res.status(403).json({
                success: false,
                message: "Only owners can view earnings"
            });
        }

        const bookings = await Booking.find({
            owner: req.user._id,
            bookingStatus: {
                $in: [
                    "Pending",
                    "Confirmed",
                    "Completed"
                ]
            }
        });

        // ------------------------------------------------
        // Calculate earnings
        // ------------------------------------------------

        const totalBookings = bookings.length;

        const totalEarnings = bookings.reduce(
            (total, booking) => {
                return total + Number(
                    booking.subtotal || 0
                );
            },
            0
        );

        const completedBookings = bookings.filter(
            booking =>
                booking.bookingStatus === "Completed"
        ).length;

        const confirmedBookings = bookings.filter(
            booking =>
                booking.bookingStatus === "Confirmed"
        ).length;

        const pendingBookings = bookings.filter(
            booking =>
                booking.bookingStatus === "Pending"
        ).length;


        return res.status(200).json({
            success: true,

            earnings: {
                totalEarnings,
                totalBookings,
                completedBookings,
                confirmedBookings,
                pendingBookings
            }
        });

    } catch (error) {

        console.error(
            "Get Owner Earnings Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch owner earnings",
            error: error.message
        });
    }
};