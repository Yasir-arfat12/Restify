const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddlewares");
const { authorize } = require("../middlewares/roleMiddleware");

const {
    createdPod,
    getPods,
    getMyPods,
    UpdatePod,
    DeletePods,
    searchPods
} = require("../Controllers/podControllers");


// =====================================================
// SEARCH PODS
// PUBLIC ROUTE
// =====================================================

router.get(
    "/pods/search",
    searchPods
);


// =====================================================
// GET ALL PODS
// PUBLIC ROUTE
// =====================================================

router.get(
    "/",
    getPods
);


// =====================================================
// CREATE POD
// ADMIN / OWNER ONLY
// =====================================================

router.post(
    "/create-pod",
    protect,
    authorize("admin", "owner"),
    createdPod
);


// =====================================================
// GET MY PODS
// OWNER ONLY
// =====================================================

router.get(
    "/myPods",
    protect,
    authorize("owner"),
    getMyPods
);


// =====================================================
// UPDATE POD
// ADMIN / OWNER ONLY
// =====================================================

router.post(
    "/:id",
    protect,
    authorize("owner", "admin"),
    UpdatePod
);


// =====================================================
// DELETE POD
// ADMIN / OWNER ONLY
// =====================================================

router.delete(
    "/:id",
    protect,
    authorize("owner", "admin"),
    DeletePods
);


module.exports = router;