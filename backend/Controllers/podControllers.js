const BookPod = require("../models/BookPods");
const Booking = require("../models/Booking");

// --------------------------------------------------
// Helper: escape regex special characters
// --------------------------------------------------
const escapeRegex = (value = "") => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// --------------------------------------------------
// Helper: create case-insensitive exact-ish regex
// --------------------------------------------------
const createRegex = (value) => {
    if (!value) return null;

    return new RegExp(
        `^${escapeRegex(value.trim())}$`,
        "i"
    );
};

// --------------------------------------------------
// City aliases
// --------------------------------------------------
const CITY_ALIASES = {
    bangalore: ["bangalore", "bengaluru"],
    bengaluru: ["bangalore", "bengaluru"],

    bombay: ["bombay", "mumbai"],
    mumbai: ["bombay", "mumbai"],

    calcutta: ["calcutta", "kolkata"],
    kolkata: ["calcutta", "kolkata"],

    madras: ["madras", "chennai"],
    chennai: ["madras", "chennai"],

    delhi: ["delhi", "new delhi"],
    "new delhi": ["delhi", "new delhi"]
};

// --------------------------------------------------
// Helper: convert HH:mm into minutes
// --------------------------------------------------
const timeToMinutes = (time) => {
    if (!time) return null;

    const parts = time.split(":");

    if (parts.length !== 2) {
        return null;
    }

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        return null;
    }

    return hours * 60 + minutes;
};

// --------------------------------------------------
// GET ALL PODS
// --------------------------------------------------
const getPods = async (req, res) => {
    try {
        const pods = await BookPod.find({
            status: "Available"
        }).populate(
            "owner",
            "name email"
        );

        res.status(200).json({
            success: true,
            count: pods.length,
            pods
        });

    } catch (error) {
        console.error("GET PODS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch pods",
            error: error.message
        });
    }
};

// --------------------------------------------------
// GET MY PODS
// --------------------------------------------------
const getMyPods = async (req, res) => {
    try {
        const pods = await BookPod.find({
            owner: req.user._id
        }).populate(
            "owner",
            "name email"
        );

        res.status(200).json({
            success: true,
            count: pods.length,
            pods
        });

    } catch (error) {
        console.error("GET MY PODS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch your pods",
            error: error.message
        });
    }
};

// --------------------------------------------------
// CREATE POD
// --------------------------------------------------
const createdPod = async (req, res) => {
    try {
        const {
            podName,
            description,
            location,
            city,
            state,
            hourlyPrice,
            dayPrice,
            capacity,
            amenities,
            images
        } = req.body;

        if (
            !podName ||
            !description ||
            !location ||
            !city ||
            !state ||
            hourlyPrice === undefined ||
            dayPrice === undefined ||
            capacity === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required pod details"
            });
        }

        const pod = await BookPod.create({
            owner: req.user._id,
            podName,
            description,
            location,
            city,
            state,
            hourlyPrice,
            dayPrice,
            capacity,
            amenities: amenities || [],
            images: images || [],
            status: "Available"
        });

        res.status(201).json({
            success: true,
            message: "Pod created successfully",
            pod
        });

    } catch (error) {
        console.error("CREATE POD ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create pod",
            error: error.message
        });
    }
};

// --------------------------------------------------
// UPDATE POD
// --------------------------------------------------
const UpdatePod = async (req, res) => {
    try {
        const pod = await BookPod.findById(req.params.id);

        if (!pod) {
            return res.status(404).json({
                success: false,
                message: "Pod not found"
            });
        }

        if (
            req.user.role !== "admin" &&
            pod.owner.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this pod"
            });
        }

        const updatedPod = await BookPod.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Pod updated successfully",
            pod: updatedPod
        });

    } catch (error) {
        console.error("UPDATE POD ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update pod",
            error: error.message
        });
    }
};

// --------------------------------------------------
// DELETE POD
// --------------------------------------------------
const DeletePods = async (req, res) => {
    try {
        const pod = await BookPod.findById(req.params.id);

        if (!pod) {
            return res.status(404).json({
                success: false,
                message: "Pod not found"
            });
        }

        if (
            req.user.role !== "admin" &&
            pod.owner.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this pod"
            });
        }

        await BookPod.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Pod deleted successfully"
        });

    } catch (error) {
        console.error("DELETE POD ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete pod",
            error: error.message
        });
    }
};

// --------------------------------------------------
// SEARCH PODS
// --------------------------------------------------
const searchPods = async (req, res) => {
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

        console.log("\n======================================");
        console.log("POD SEARCH REQUEST");
        console.log("======================================");
        console.log("state:", state);
        console.log("city:", city);
        console.log("location:", location);
        console.log("podName:", podName);
        console.log("minPrice:", minPrice);
        console.log("maxPrice:", maxPrice);
        console.log("capacity:", capacity);
        console.log("bookingDate:", bookingDate);
        console.log("startTime:", startTime);
        console.log("endTime:", endTime);

        // ------------------------------------------
        // Start with available pods
        // ------------------------------------------
        const filter = {
            status: "Available"
        };

        // ------------------------------------------
        // STATE FILTER
        // ------------------------------------------
        if (state && state.trim()) {
            filter.state = createRegex(state);
        }

        // ------------------------------------------
        // CITY FILTER
        // Handles:
        // Bangalore <-> Bengaluru
        // Mumbai <-> Bombay
        // etc.
        // ------------------------------------------
        if (city && city.trim()) {
            const normalizedCity = city
                .trim()
                .toLowerCase();

            const aliases =
                CITY_ALIASES[normalizedCity];

            if (aliases) {
                filter.city = {
                    $in: aliases.map(
                        (item) => createRegex(item)
                    )
                };
            } else {
                filter.city = createRegex(city);
            }
        }

        // ------------------------------------------
        // LOCATION FILTER
        // ------------------------------------------
        if (location && location.trim()) {
            filter.location = {
                $regex: escapeRegex(location.trim()),
                $options: "i"
            };
        }

        // ------------------------------------------
        // POD NAME FILTER
        // ------------------------------------------
        if (podName && podName.trim()) {
            filter.podName = {
                $regex: escapeRegex(podName.trim()),
                $options: "i"
            };
        }

        // ------------------------------------------
        // MIN PRICE
        // ------------------------------------------
        if (
            minPrice !== undefined &&
            minPrice !== ""
        ) {
            filter.hourlyPrice = {
                ...(filter.hourlyPrice || {}),
                $gte: Number(minPrice)
            };
        }

        // ------------------------------------------
        // MAX PRICE
        // ------------------------------------------
        if (
            maxPrice !== undefined &&
            maxPrice !== ""
        ) {
            filter.hourlyPrice = {
                ...(filter.hourlyPrice || {}),
                $lte: Number(maxPrice)
            };
        }

        // ------------------------------------------
        // CAPACITY
        // ------------------------------------------
        if (
            capacity !== undefined &&
            capacity !== ""
        ) {
            filter.capacity = {
                $gte: Number(capacity)
            };
        }

        console.log(
            "MONGODB FILTER:",
            JSON.stringify(filter, null, 2)
        );

        // ------------------------------------------
        // FETCH PODS
        // ------------------------------------------
        let pods = await BookPod.find(filter)
            .populate(
                "owner",
                "name email"
            )
            .lean();

        console.log(
            "PODS AFTER BASIC FILTER:",
            pods.length
        );

        // ------------------------------------------
        // BOOKING AVAILABILITY FILTER
        // Only run when complete booking details exist
        // ------------------------------------------
        if (
            bookingDate &&
            startTime &&
            endTime
        ) {
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
                        "Invalid time format. Use HH:mm."
                });
            }

            if (requestedEnd <= requestedStart) {
                return res.status(400).json({
                    success: false,
                    message:
                        "End time must be after start time."
                });
            }

            // --------------------------------------
            // Find bookings for selected date
            // --------------------------------------
            const bookings = await Booking.find({
                bookingDate: bookingDate,
                status: {
                    $in: [
                        "Pending",
                        "Confirmed"
                    ]
                }
            }).lean();

            console.log(
                "BOOKINGS ON DATE:",
                bookings.length
            );

            // --------------------------------------
            // Find unavailable pod IDs
            // --------------------------------------
            const unavailablePodIds =
                new Set();

            for (const booking of bookings) {
                if (
                    !booking.startTime ||
                    !booking.endTime
                ) {
                    continue;
                }

                const bookedStart =
                    timeToMinutes(
                        booking.startTime
                    );

                const bookedEnd =
                    timeToMinutes(
                        booking.endTime
                    );

                if (
                    bookedStart === null ||
                    bookedEnd === null
                ) {
                    continue;
                }

                // Two time ranges overlap when:
                // requestedStart < bookedEnd
                // AND requestedEnd > bookedStart
                const overlaps =
                    requestedStart < bookedEnd &&
                    requestedEnd > bookedStart;

                if (overlaps && booking.pod) {
                    unavailablePodIds.add(
                        booking.pod.toString()
                    );
                }
            }

            // --------------------------------------
            // Remove unavailable pods
            // --------------------------------------
            pods = pods.filter(
                (pod) =>
                    !unavailablePodIds.has(
                        pod._id.toString()
                    )
            );

            console.log(
                "PODS AFTER AVAILABILITY FILTER:",
                pods.length
            );
        }

        console.log(
            "FINAL POD COUNT:",
            pods.length
        );

        console.log("======================================\n");

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

module.exports = {
    getPods,
    getMyPods,
    createdPod,
    UpdatePod,
    DeletePods,
    searchPods
};