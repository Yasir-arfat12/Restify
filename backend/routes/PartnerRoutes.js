const express = require("express");

const router = express.Router();

const {
    protect
} = require("../middlewares/authMiddlewares");

const {
    authorize
} = require("../middlewares/roleMiddleware");

const {

    submitPartnerApplication,

    getPartnerApplications,

    approvePartnerApplication,

    rejectPartnerApplication

} = require("../Controllers/PartnerController");


// ======================================================
// CUSTOMER
// APPLY TO BECOME PARTNER
// ======================================================

router.post(
    "/apply",
    protect,
    submitPartnerApplication
);


// ======================================================
// ADMIN
// GET ALL APPLICATIONS
// ======================================================

router.get(
    "/applications",
    protect,
    authorize("admin"),
    getPartnerApplications
);


// ======================================================
// ADMIN
// APPROVE APPLICATION
// ======================================================

router.patch(
    "/:id/approve",
    protect,
    authorize("admin"),
    approvePartnerApplication
);


// ======================================================
// ADMIN
// REJECT APPLICATION
// ======================================================

router.patch(
    "/:id/reject",
    protect,
    authorize("admin"),
    rejectPartnerApplication
);


module.exports = router;