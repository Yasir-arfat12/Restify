const mongoose = require("mongoose");

const Pod = require("../models/BookPods");
const Booking = require("../models/Booking");
const Bill = require("../models/Bill");

const generateInvoice = require("../Utils/invoiceGenerator");
const { calculateGST } = require("../Utils/gstCalculator");


// =====================================================
// TIME HELPER
// =====================================================

const timeToMinutes = (time) => {

    if (
        typeof time !== "string" ||
        !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)
    ) {
        return null;
    }

    const [
        hours,
        minutes
    ] = time.split(":").map(Number);

    return hours * 60 + minutes;
};


// =====================================================
// OVERLAP HELPER
// =====================================================

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


// =====================================================
// CREATE BOOKING
// POST /api/bookings
// =====================================================

exports.createBooking = async (req, res) => {

    try {

        const {
            podId,
            bookingDate,
            startTime,
            endTime
        } = req.body;


        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

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


        // -------------------------------------------------
        // VALIDATE OBJECT ID
        // -------------------------------------------------

        if (!mongoose.Types.ObjectId.isValid(podId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid pod ID"
            });

        }


        // -------------------------------------------------
        // FIND POD
        // -------------------------------------------------

        const pod = await Pod.findById(podId);

        if (!pod) {

            return res.status(404).json({
                success: false,
                message: "Pod not found"
            });

        }


        // -------------------------------------------------
        // POD STATUS
        // -------------------------------------------------

        if (pod.status !== "Available") {

            return res.status(400).json({
                success: false,
                message: "This pod is currently unavailable"
            });

        }


        // -------------------------------------------------
        // DATE
        // -------------------------------------------------

        const selectedDate = new Date(bookingDate);

        if (
            Number.isNaN(
                selectedDate.getTime()
            )
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid booking date"
            });

        }


        const bookingStart = new Date(
            selectedDate
        );

        bookingStart.setHours(
            0,
            0,
            0,
            0
        );


        const bookingEnd = new Date(
            bookingStart
        );

        bookingEnd.setDate(
            bookingEnd.getDate() + 1
        );


        // -------------------------------------------------
        // PREVENT PAST BOOKING
        // -------------------------------------------------

        const today = new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );


        if (bookingStart < today) {

            return res.status(400).json({
                success: false,
                message:
                    "You cannot book a pod for a past date"
            });

        }


        // -------------------------------------------------
        // TIME
        // -------------------------------------------------

        const requestedStart =
            timeToMinutes(startTime);

        const requestedEnd =
            timeToMinutes(endTime);


        if (
            requestedStart === null ||
            requestedEnd === null
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Invalid time format. Use HH:MM"
            });

        }


        if (
            requestedEnd <= requestedStart
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "End time must be greater than start time"
            });

        }


        // -------------------------------------------------
        // DURATION
        // -------------------------------------------------

        const durationMinutes =
            requestedEnd - requestedStart;

        const durationHours =
            durationMinutes / 60;


        // -------------------------------------------------
        // EXISTING BOOKINGS
        // -------------------------------------------------

        const existingBookings =
            await Booking.find({

                pod: podId,

                bookingDate: {
                    $gte: bookingStart,
                    $lt: bookingEnd
                },

                bookingStatus: {
                    $in: [
                        "Pending",
                        "Confirmed"
                    ]
                }

            });


        // -------------------------------------------------
        // CHECK OVERLAP
        // -------------------------------------------------

        for (
            const existingBooking
            of existingBookings
        ) {

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


        // -------------------------------------------------
        // PRICE
        // -------------------------------------------------

        const subtotal =
            durationHours *
            Number(pod.hourlyPrice);


        // -------------------------------------------------
        // CREATE BOOKING
        // -------------------------------------------------

        const booking =
            await Booking.create({

                customer:
                    req.user._id,

                owner:
                    pod.owner,

                pod:
                    pod._id,

                bookingDate:
                    bookingStart,

                startTime,

                endTime,

                duration:
                    durationHours,

                hourlyPrice:
                    pod.hourlyPrice,

                subtotal,

                bookingStatus:
                    "Pending",

                paymentStatus:
                    "Pending"

            });


        // -------------------------------------------------
        // GST
        // -------------------------------------------------

        const gst =
            calculateGST(subtotal);


        // -------------------------------------------------
        // BILL
        // -------------------------------------------------

        const bill =
            await Bill.create({

                booking:
                    booking._id,

                customer:
                    booking.customer,

                owner:
                    booking.owner,

                pod:
                    booking.pod,

                bookingDate:
                    booking.bookingDate,

                invoiceNumber:
                    generateInvoice(),

                subtotal:
                    booking.subtotal,

                gstRate:
                    gst.gstRate,

                gstAmount:
                    gst.gstAmount,

                platformFee:
                    gst.platformFee,

                totalAmount:
                    gst.totalAmount,

                paymentStatus:
                    "Pending"

            });


        // -------------------------------------------------
        // RESPONSE
        // -------------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Booking created successfully",

            booking,

            bill

        });


    } catch (error) {

        console.error(
            "CREATE BOOKING ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while creating booking",

            error:
                error.message

        });

    }

};


// =====================================================
// GET CUSTOMER BOOKINGS
// GET /api/bookings/my-bookings
// =====================================================

exports.getMyBookings = async (
    req,
    res
) => {

    try {

        const bookings =
            await Booking.find({

                customer:
                    req.user._id

            })

                .populate(
                    "pod",
                    "podName description location city state hourlyPrice images"
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

            count:
                bookings.length,

            bookings

        });


    } catch (error) {

        console.error(
            "GET MY BOOKINGS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch your bookings",

            error:
                error.message

        });

    }

};


// =====================================================
// GET SINGLE BOOKING
// GET /api/bookings/:id
// =====================================================

exports.getBookingById = async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;


        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid booking ID"

            });

        }


        const booking =
            await Booking.findById(id)

                .populate(
                    "pod",
                    "podName description location city state hourlyPrice images"
                )

                .populate(
                    "customer",
                    "name email"
                )

                .populate(
                    "owner",
                    "name email"
                );


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found"

            });

        }


        const userId =
            req.user._id.toString();


        const isCustomer =
            booking.customer._id.toString() ===
            userId;


        const isOwner =
            booking.owner._id.toString() ===
            userId;


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
                    "You are not authorized to view this booking"

            });

        }


        return res.status(200).json({

            success: true,

            booking

        });


    } catch (error) {

        console.error(
            "GET BOOKING ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch booking",

            error:
                error.message

        });

    }

};


// =====================================================
// CANCEL BOOKING
// PATCH /api/bookings/:id/cancel
// =====================================================

exports.cancelBooking = async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;


        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid booking ID"

            });

        }


        const booking =
            await Booking.findById(id);


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found"

            });

        }


        const userId =
            req.user._id.toString();


        const isCustomer =
            booking.customer.toString() ===
            userId;


        const isOwner =
            booking.owner.toString() ===
            userId;


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


        await booking.save();


        return res.status(200).json({

            success: true,

            message:
                "Booking cancelled successfully",

            booking

        });


    } catch (error) {

        console.error(
            "CANCEL BOOKING ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to cancel booking",

            error:
                error.message

        });

    }

};


// =====================================================
// GET OWNER BOOKINGS
// GET /api/bookings/owner-bookings
// =====================================================

exports.getOwnerBookings = async (
    req,
    res
) => {

    try {

        if (
            req.user.role !== "owner" &&
            req.user.role !== "admin"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only owners and admins can view owner bookings"

            });

        }


        const filter =
            req.user.role === "admin"
                ? {}
                : {
                    owner:
                        req.user._id
                };


        const bookings =
            await Booking.find(filter)

                .populate(
                    "pod",
                    "podName description location city state hourlyPrice images"
                )

                .populate(
                    "customer",
                    "name email"
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

            count:
                bookings.length,

            bookings

        });


    } catch (error) {

        console.error(
            "GET OWNER BOOKINGS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch owner bookings",

            error:
                error.message

        });

    }

};


// =====================================================
// GET OWNER EARNINGS
// GET /api/bookings/owner-earnings
// =====================================================

exports.getOwnerEarnings = async (
    req,
    res
) => {

    try {

        if (
            req.user.role !== "owner" &&
            req.user.role !== "admin"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only owners and admins can view earnings"

            });

        }


        const filter =
            req.user.role === "admin"
                ? {}
                : {
                    owner:
                        req.user._id
                };


        const bookings =
            await Booking.find({

                ...filter,

                bookingStatus: {
                    $in: [
                        "Pending",
                        "Confirmed",
                        "Completed"
                    ]
                }

            });


        const totalBookings =
            bookings.length;


        const totalEarnings =
            bookings.reduce(
                (
                    total,
                    booking
                ) => {

                    return (
                        total +
                        Number(
                            booking.subtotal || 0
                        )
                    );

                },
                0
            );


        const completedBookings =
            bookings.filter(
                booking =>
                    booking.bookingStatus ===
                    "Completed"
            ).length;


        const confirmedBookings =
            bookings.filter(
                booking =>
                    booking.bookingStatus ===
                    "Confirmed"
            ).length;


        const pendingBookings =
            bookings.filter(
                booking =>
                    booking.bookingStatus ===
                    "Pending"
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
            "GET OWNER EARNINGS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch owner earnings",

            error:
                error.message

        });

    }

};