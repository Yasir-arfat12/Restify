const PartnerApplication = require("../models/PartnerApplication");
const User = require("../models/User");


// ======================================================
// SUBMIT PARTNER APPLICATION
// ======================================================

const submitPartnerApplication = async (req, res) => {

    try {

        const {
            businessName,
            ownerName,
            email,
            phone,
            address,
            description
        } = req.body;


        // ------------------------------------------------
        // VALIDATION
        // ------------------------------------------------

        if (
            !businessName ||
            !ownerName ||
            !email ||
            !phone ||
            !address
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Business name, owner name, email, phone and address are required."
            });

        }


        // ------------------------------------------------
        // EMAIL VALIDATION
        // ------------------------------------------------

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email)) {

            return res.status(400).json({
                success: false,
                message:
                    "Please provide a valid email address."
            });

        }


        // ------------------------------------------------
        // CHECK EXISTING PENDING APPLICATION
        // ------------------------------------------------

        const existingApplication =
            await PartnerApplication.findOne({
                email: email.toLowerCase(),
                status: "Pending"
            });


        if (existingApplication) {

            return res.status(409).json({
                success: false,
                message:
                    "You already have a pending partner application."
            });

        }


        // ------------------------------------------------
        // LOGGED-IN USER
        // ------------------------------------------------

        const userId = req.user
            ? req.user._id
            : null;


        // ------------------------------------------------
        // CREATE APPLICATION
        // ------------------------------------------------

        const application =
            await PartnerApplication.create({

                user: userId,

                businessName,

                ownerName,

                email:
                    email.toLowerCase(),

                phone,

                address,

                description,

                status: "Pending"

            });


        return res.status(201).json({

            success: true,

            message:
                "Your partner application has been submitted successfully.",

            application

        });

    } catch (error) {

        console.error(
            "PARTNER APPLICATION ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to submit the partner application."

        });

    }

};


// ======================================================
// GET ALL PARTNER APPLICATIONS
// ADMIN ONLY
// ======================================================

const getPartnerApplications = async (req, res) => {

    try {

        const applications =
            await PartnerApplication
                .find()
                .populate(
                    "user",
                    "name email role"
                )
                .sort({
                    createdAt: -1
                });


        return res.status(200).json({

            success: true,

            count: applications.length,

            applications

        });

    } catch (error) {

        console.error(
            "GET PARTNER APPLICATIONS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch partner applications."

        });

    }

};


// ======================================================
// APPROVE PARTNER APPLICATION
// ADMIN ONLY
// ======================================================

const approvePartnerApplication = async (req, res) => {

    try {

        const application =
            await PartnerApplication.findById(
                req.params.id
            );


        if (!application) {

            return res.status(404).json({

                success: false,

                message:
                    "Partner application not found."

            });

        }


        if (
            application.status === "Approved"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "This application is already approved."

            });

        }


        // ------------------------------------------------
        // APPLICATION MUST HAVE USER
        // ------------------------------------------------

        if (!application.user) {

            return res.status(400).json({

                success: false,

                message:
                    "This application is not linked to a user account."

            });

        }


        // ------------------------------------------------
        // CHANGE CUSTOMER → OWNER
        // ------------------------------------------------

        const user =
            await User.findByIdAndUpdate(

                application.user,

                {
                    role: "owner"
                },

                {
                    new: true
                }

            );


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "Associated user account not found."

            });

        }


        // ------------------------------------------------
        // UPDATE APPLICATION
        // ------------------------------------------------

        application.status = "Approved";

        await application.save();


        return res.status(200).json({

            success: true,

            message:
                "Partner approved successfully. User is now an owner.",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            },

            application

        });

    } catch (error) {

        console.error(
            "APPROVE PARTNER ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to approve partner application."

        });

    }

};


// ======================================================
// REJECT PARTNER APPLICATION
// ADMIN ONLY
// ======================================================

const rejectPartnerApplication = async (req, res) => {

    try {

        const application =
            await PartnerApplication.findById(
                req.params.id
            );


        if (!application) {

            return res.status(404).json({

                success: false,

                message:
                    "Partner application not found."

            });

        }


        if (
            application.status === "Approved"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "An approved application cannot be rejected."

            });

        }


        application.status = "Rejected";

        await application.save();


        return res.status(200).json({

            success: true,

            message:
                "Partner application rejected.",

            application

        });

    } catch (error) {

        console.error(
            "REJECT PARTNER ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to reject partner application."

        });

    }

};


module.exports = {

    submitPartnerApplication,

    getPartnerApplications,

    approvePartnerApplication,

    rejectPartnerApplication

};