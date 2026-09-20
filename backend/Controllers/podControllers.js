const Booking = require("../models/Booking");
const Pod = require("../models/BookPods");


// =====================================================
// CREATE POD
// POST /api/pods/create-pod
// =====================================================

exports.createdPod = async (req, res) => {
    try {

        const pod = await Pod.create({

            owner: req.user._id,

            podName: req.body.podName,

            description: req.body.description,

            location: req.body.location,

            city: req.body.city,

            state: req.body.state,

            hourlyPrice: req.body.hourlyPrice,

            dayPrice: req.body.dayPrice,

            capacity: req.body.capacity,

            amenities: req.body.amenities || [],

            images: req.body.images || []

        });


        return res.status(201).json({

            success: true,

            pod

        });

    } catch (error) {

        console.error(
            "CREATE POD ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Server Error",

            error: error.message

        });

    }
};



// =====================================================
// GET ALL PODS
// GET /api/pods
// =====================================================

exports.getPods = async (req, res) => {

    try {

        const pods = await Pod.find()
            .populate(
                "owner",
                "name email"
            )
            .sort({
                createdAt: -1
            });


        return res.status(200).json(pods);

    } catch (error) {

        console.error(
            "GET PODS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Server Error",

            error: error.message

        });

    }
};



// =====================================================
// GET SINGLE POD BY ID
// GET /api/pods/:id
// PUBLIC
// =====================================================

exports.getPodById = async (req, res) => {

    try {

        const podId = req.params.id;


        console.log(
            "===================================="
        );

        console.log(
            "GET SINGLE POD REQUEST"
        );

        console.log(
            "POD ID:",
            podId
        );


        const pod = await Pod.findById(
            podId
        ).populate(
            "owner",
            "name email"
        );


        // ---------------------------------------------
        // POD DOES NOT EXIST
        // ---------------------------------------------

        if (!pod) {

            console.log(
                "POD NOT FOUND:",
                podId
            );

            return res.status(404).json({

                success: false,

                message: "Pod not found"

            });

        }


        console.log(
            "POD FOUND:",
            pod.podName
        );


        console.log(
            "===================================="
        );


        return res.status(200).json({

            success: true,

            pod

        });

    } catch (error) {

        console.error(
            "GET SINGLE POD ERROR:",
            error
        );


        // ---------------------------------------------
        // INVALID MONGODB OBJECT ID
        // ---------------------------------------------

        if (
            error.name ===
            "CastError"
        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid pod ID"

            });

        }


        return res.status(500).json({

            success: false,

            message: "Failed to fetch pod",

            error: error.message

        });

    }
};



// =====================================================
// GET MY PODS
// GET /api/pods/myPods
// OWNER
// =====================================================

exports.getMyPods = async (req, res) => {

    try {

        const pods = await Pod.find({

            owner: req.user._id

        })
            .populate(
                "owner",
                "name email"
            )
            .sort({
                createdAt: -1
            });


        return res.status(200).json(pods);

    } catch (error) {

        console.error(
            "GET MY PODS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Server Error",

            error: error.message

        });

    }
};



// =====================================================
// UPDATE POD
// POST /api/pods/:id
// OWNER / ADMIN
// =====================================================

exports.UpdatePod = async (req, res) => {

    try {

        const pod = await Pod.findById(
            req.params.id
        );


        // ---------------------------------------------
        // POD NOT FOUND
        // ---------------------------------------------

        if (!pod) {

            return res.status(404).json({

                success: false,

                message: "Pod Not Found"

            });

        }


        // ---------------------------------------------
        // OWNER / ADMIN AUTHORIZATION
        // ---------------------------------------------

        if (
            req.user.role !== "admin" &&
            pod.owner.toString() !==
            req.user._id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message: "Access Denied"

            });

        }


        // ---------------------------------------------
        // UPDATE ONLY PROVIDED FIELDS
        // ---------------------------------------------

        if (req.body.podName !== undefined) {

            pod.podName =
                req.body.podName;

        }


        if (req.body.description !== undefined) {

            pod.description =
                req.body.description;

        }


        if (req.body.location !== undefined) {

            pod.location =
                req.body.location;

        }


        if (req.body.city !== undefined) {

            pod.city =
                req.body.city;

        }


        if (req.body.state !== undefined) {

            pod.state =
                req.body.state;

        }


        if (req.body.hourlyPrice !== undefined) {

            pod.hourlyPrice =
                req.body.hourlyPrice;

        }


        if (req.body.dayPrice !== undefined) {

            pod.dayPrice =
                req.body.dayPrice;

        }


        if (req.body.capacity !== undefined) {

            pod.capacity =
                req.body.capacity;

        }


        if (req.body.amenities !== undefined) {

            pod.amenities =
                req.body.amenities;

        }


        if (req.body.images !== undefined) {

            pod.images =
                req.body.images;

        }


        if (req.body.status !== undefined) {

            pod.status =
                req.body.status;

        }


        await pod.save();


        return res.status(200).json({

            success: true,

            pod

        });

    } catch (error) {

        console.error(
            "UPDATE POD ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Server Error",

            error: error.message

        });

    }
};



// =====================================================
// DELETE POD
// DELETE /api/pods/:id
// OWNER / ADMIN
// =====================================================

exports.DeletePods = async (req, res) => {

    try {

        const pod = await Pod.findById(
            req.params.id
        );


        // ---------------------------------------------
        // POD NOT FOUND
        // ---------------------------------------------

        if (!pod) {

            return res.status(404).json({

                success: false,

                message: "Pod Not Found"

            });

        }


        // ---------------------------------------------
        // OWNER / ADMIN AUTHORIZATION
        // ---------------------------------------------

        if (
            req.user.role !== "admin" &&
            pod.owner.toString() !==
            req.user._id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message: "Access Denied"

            });

        }


        await pod.deleteOne();


        return res.status(200).json({

            success: true,

            message: "Pod Deleted"

        });

    } catch (error) {

        console.error(
            "DELETE POD ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Server Error",

            error: error.message

        });

    }
};



// =====================================================
// SEARCH PODS
// GET /api/pods/search
// =====================================================

exports.searchPods = async (req, res) => {

    try {

        const {

            state,

            city,

            location,

            podName,

            minPrice,

            maxPrice,

            capacity,

            bookingDate,

            startTime,

            endTime

        } = req.query;


        // ---------------------------------------------
        // BASE FILTER
        // ---------------------------------------------

        const filter = {

            status: "Available"

        };


        // ---------------------------------------------
        // STATE
        // ---------------------------------------------

        if (state) {

            filter.state = {

                $regex: state.trim(),

                $options: "i"

            };

        }


        // ---------------------------------------------
        // CITY
        // ---------------------------------------------

        if (city) {

            filter.city = {

                $regex: city.trim(),

                $options: "i"

            };

        }


        // ---------------------------------------------
        // LOCATION
        // ---------------------------------------------

        if (location) {

            filter.location = {

                $regex: location.trim(),

                $options: "i"

            };

        }


        // ---------------------------------------------
        // POD NAME
        // ---------------------------------------------

        if (podName) {

            filter.podName = {

                $regex: podName.trim(),

                $options: "i"

            };

        }


        // ---------------------------------------------
        // CAPACITY
        // ---------------------------------------------

        if (capacity !== undefined && capacity !== "") {

            filter.capacity = {

                $gte: Number(capacity)

            };

        }


        // ---------------------------------------------
        // PRICE
        // ---------------------------------------------

        if (
            minPrice !== undefined &&
            minPrice !== "" ||
            maxPrice !== undefined &&
            maxPrice !== ""
        ) {

            filter.hourlyPrice = {};

        }


        if (
            minPrice !== undefined &&
            minPrice !== ""
        ) {

            filter.hourlyPrice.$gte =
                Number(minPrice);

        }


        if (
            maxPrice !== undefined &&
            maxPrice !== ""
        ) {

            filter.hourlyPrice.$lte =
                Number(maxPrice);

        }


        console.log(
            "===================================="
        );

        console.log(
            "SEARCH POD FILTER:"
        );

        console.log(
            filter
        );


        // ---------------------------------------------
        // GET PODS
        // ---------------------------------------------

        let pods = await Pod.find(
            filter
        )
            .populate(
                "owner",
                "name email"
            )
            .sort({
                hourlyPrice: 1
            });


        // ---------------------------------------------
        // AVAILABILITY FILTER
        // ---------------------------------------------

        if (
            bookingDate &&
            startTime &&
            endTime
        ) {

            const bookings =
                await Booking.find({

                    bookingDate:
                        new Date(bookingDate),

                    bookingStatus: {

                        $in: [
                            "Pending",
                            "Confirmed"
                        ]

                    }

                }).select(
                    "pod startTime endTime"
                );


            const availablePods =
                pods.filter((pod) => {

                    const podBookings =
                        bookings.filter(
                            (booking) =>
                                booking.pod.toString() ===
                                pod._id.toString()
                        );


                    // No bookings for this pod
                    if (
                        podBookings.length === 0
                    ) {

                        return true;

                    }


                    const requestedStart =
                        startTime;


                    const requestedEnd =
                        endTime;


                    // Check whether requested
                    // time overlaps an existing booking
                    const hasOverlap =
                        podBookings.some(
                            (booking) => {

                                const bookedStart =
                                    booking.startTime;

                                const bookedEnd =
                                    booking.endTime;


                                return (
                                    requestedStart <
                                        bookedEnd &&
                                    requestedEnd >
                                        bookedStart
                                );

                            }
                        );


                    return !hasOverlap;

                });


            pods = availablePods;

        }


        console.log(
            "SEARCH RESULT COUNT:",
            pods.length
        );


        console.log(
            "===================================="
        );


        return res.status(200).json({

            success: true,

            count: pods.length,

            pods

        });

    } catch (error) {

        console.error(
            "SEARCH PODS ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Failed to search pods",

            error: error.message

        });

    }
};