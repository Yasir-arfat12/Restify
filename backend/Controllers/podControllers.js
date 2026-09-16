const Booking = require("../models/Booking");
const Pod = require("../models/BookPods");


// =====================================================
// CREATE POD
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

            amenities: req.body.amenities,

            images: req.body.images

        });


        return res.status(201).json({

            success: true,

            pod

        });

    } catch (error) {

        console.error("CREATE POD ERROR:", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================================
// GET ALL PODS
// =====================================================

exports.getPods = async (req, res) => {

    try {

        const pods = await Pod.find()
            .populate("owner", "name email");

        // Keep this response as an array
        // because other parts of the application
        // may already depend on it.

        return res.json(pods);

    } catch (error) {

        console.error("GET PODS ERROR:", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================================
// GET MY PODS
// =====================================================

exports.getMyPods = async (req, res) => {

    try {

        const pods = await Pod.find({

            owner: req.user._id

        });

        return res.json(pods);

    } catch (error) {

        console.error("GET MY PODS ERROR:", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================================
// UPDATE POD
// =====================================================

exports.UpdatePod = async (req, res) => {

    try {

        const pod = await Pod.findById(req.params.id);


        if (!pod) {

            return res.status(404).json({

                success: false,

                message: "Pod Not Found"

            });

        }


        // Admin can update any pod.
        // Owner can update only their own pod.

        if (

            req.user.role !== "admin" &&

            pod.owner.toString() !== req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Access Denied"

            });

        }


        if (req.body.podName !== undefined) {

            pod.podName = req.body.podName;

        }


        if (req.body.description !== undefined) {

            pod.description = req.body.description;

        }


        if (req.body.location !== undefined) {

            pod.location = req.body.location;

        }


        if (req.body.city !== undefined) {

            pod.city = req.body.city;

        }


        if (req.body.state !== undefined) {

            pod.state = req.body.state;

        }


        if (req.body.hourlyPrice !== undefined) {

            pod.hourlyPrice = req.body.hourlyPrice;

        }


        if (req.body.dayPrice !== undefined) {

            pod.dayPrice = req.body.dayPrice;

        }


        if (req.body.capacity !== undefined) {

            pod.capacity = req.body.capacity;

        }


        if (req.body.amenities !== undefined) {

            pod.amenities = req.body.amenities;

        }


        if (req.body.images !== undefined) {

            pod.images = req.body.images;

        }


        await pod.save();


        return res.json({

            success: true,

            pod

        });

    } catch (error) {

        console.error("UPDATE POD ERROR:", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================================
// DELETE POD
// =====================================================

exports.DeletePods = async (req, res) => {

    try {

        const pod = await Pod.findById(req.params.id);


        if (!pod) {

            return res.status(404).json({

                success: false,

                message: "Pod Not Found"

            });

        }


        // Admin can delete any pod.
        // Owner can delete only their own pod.

        if (

            req.user.role !== "admin" &&

            pod.owner.toString() !== req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Access Denied"

            });

        }


        await pod.deleteOne();


        return res.json({

            success: true,

            message: "Pod Deleted"

        });

    } catch (error) {

        console.error("DELETE POD ERROR:", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// =====================================================
// SEARCH PODS
// =====================================================
//
// Supported query parameters:
//
// state
// city
// location
// podName
// minPrice
// maxPrice
// capacity
// bookingDate
// startTime
// endTime
//
// Example:
//
// /api/pods/search?city=Bengaluru
//
// /api/pods/search?city=Bengaluru&maxPrice=500
//
// /api/pods/search?capacity=4
//
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


        // =================================================
        // BASE FILTER
        // =================================================

        const filter = {

            status: "Available"

        };


        // =================================================
        // STATE
        // =================================================

        if (

            state !== undefined &&

            state.trim() !== ""

        ) {

            filter.state = {

                $regex: state.trim(),

                $options: "i"

            };

        }


        // =================================================
        // CITY
        // =================================================

        if (

            city !== undefined &&

            city.trim() !== ""

        ) {

            filter.city = {

                $regex: city.trim(),

                $options: "i"

            };

        }


        // =================================================
        // LOCATION
        // =================================================

        if (

            location !== undefined &&

            location.trim() !== ""

        ) {

            filter.location = {

                $regex: location.trim(),

                $options: "i"

            };

        }


        // =================================================
        // POD NAME
        // =================================================

        if (

            podName !== undefined &&

            podName.trim() !== ""

        ) {

            filter.podName = {

                $regex: podName.trim(),

                $options: "i"

            };

        }


        // =================================================
        // CAPACITY
        // =================================================

        if (

            capacity !== undefined &&

            capacity !== ""

        ) {

            const capacityNumber = Number(capacity);


            if (Number.isNaN(capacityNumber)) {

                return res.status(400).json({

                    success: false,

                    message: "Capacity must be a valid number"

                });

            }


            filter.capacity = {

                $gte: capacityNumber

            };

        }


        // =================================================
        // PRICE
        // =================================================

        if (

            (minPrice !== undefined && minPrice !== "") ||

            (maxPrice !== undefined && maxPrice !== "")

        ) {

            filter.hourlyPrice = {};


            if (

                minPrice !== undefined &&

                minPrice !== ""

            ) {

                const minimumPrice = Number(minPrice);


                if (Number.isNaN(minimumPrice)) {

                    return res.status(400).json({

                        success: false,

                        message: "Minimum price must be a valid number"

                    });

                }


                filter.hourlyPrice.$gte = minimumPrice;

            }


            if (

                maxPrice !== undefined &&

                maxPrice !== ""

            ) {

                const maximumPrice = Number(maxPrice);


                if (Number.isNaN(maximumPrice)) {

                    return res.status(400).json({

                        success: false,

                        message: "Maximum price must be a valid number"

                    });

                }


                filter.hourlyPrice.$lte = maximumPrice;

            }

        }


        // =================================================
        // FIND PODS
        // =================================================

        let pods = await Pod.find(filter)

            .populate("owner", "name email")

            .sort({

                hourlyPrice: 1

            });


        // =================================================
        // DATE + TIME AVAILABILITY
        // =================================================

        if (

            bookingDate &&

            startTime &&

            endTime

        ) {

            const requestedStart = timeToMinutes(startTime);

            const requestedEnd = timeToMinutes(endTime);


            if (

                requestedStart === null ||

                requestedEnd === null

            ) {

                return res.status(400).json({

                    success: false,

                    message: "Time must be in HH:mm format"

                });

            }


            if (requestedEnd <= requestedStart) {

                return res.status(400).json({

                    success: false,

                    message: "End time must be after start time"

                });

            }


            const bookingDay = new Date(bookingDate);


            if (Number.isNaN(bookingDay.getTime())) {

                return res.status(400).json({

                    success: false,

                    message: "Invalid booking date"

                });

            }


            // Get active bookings for the selected date

            const activeBookings = await Booking.find({

                bookingDate: bookingDay,

                bookingStatus: {

                    $in: [

                        "Pending",

                        "Confirmed"

                    ]

                },

                pod: {

                    $in: pods.map(

                        pod => pod._id

                    )

                }

            }).select(

                "pod startTime endTime"

            );


            const bookedPodIds = new Set();


            for (const booking of activeBookings) {

                const bookedStart = timeToMinutes(

                    booking.startTime

                );


                const bookedEnd = timeToMinutes(

                    booking.endTime

                );


                if (

                    bookedStart === null ||

                    bookedEnd === null

                ) {

                    continue;

                }


                const overlaps =

                    requestedStart < bookedEnd &&

                    requestedEnd > bookedStart;


                if (overlaps) {

                    bookedPodIds.add(

                        booking.pod.toString()

                    );

                }

            }


            pods = pods.filter(

                pod =>

                    !bookedPodIds.has(

                        pod._id.toString()

                    )

            );

        }


        // =================================================
        // RESPONSE
        // =================================================

        return res.json({

            success: true,

            count: pods.length,

            pods

        });

    } catch (error) {

        console.error("SEARCH PODS ERROR:", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================================
// TIME HELPER
// =====================================================

function timeToMinutes(time) {

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


    return (

        hours * 60 +

        minutes

    );

}

// ======================================================
// GET MY PODS
// OWNER ONLY
// ======================================================

const getMyPods = async (req, res) => {
    try {

        const pods = await Pod.find({
            owner: req.user._id
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: pods.length,
            pods
        });

    } catch (error) {

        console.error(
            "GET MY PODS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch your pods."
        });

    }
};
