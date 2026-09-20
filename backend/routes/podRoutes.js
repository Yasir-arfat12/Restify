const express = require("express");

const router = express.Router();

const {
    protect
} = require("../middlewares/authMiddlewares");

const {
    authorize
} = require("../middlewares/roleMiddleware");

const {
    createdPod,
    getPods,
    getPodById,
    getMyPods,
    UpdatePod,
    DeletePods,
    searchPods
} = require("../Controllers/podControllers");


// =====================================================
// SEARCH PODS
// PUBLIC
// GET /api/pods/search
// =====================================================

router.get(
    "/search",
    searchPods
);


// =====================================================
// GET ALL PODS
// PUBLIC
// GET /api/pods
// =====================================================

router.get(
    "/",
    getPods
);


// =====================================================
// GET MY PODS
// OWNER
// GET /api/pods/myPods
// =====================================================

router.get(
    "/myPods",
    protect,
    authorize("owner"),
    getMyPods
);


// =====================================================
// GET SINGLE POD
// PUBLIC
// GET /api/pods/:id
// =====================================================

router.get(
    "/:id",
    getPodById
);


// =====================================================
// CREATE POD
// OWNER / ADMIN
// POST /api/pods/create-pod
// =====================================================

router.post(
    "/create-pod",
    protect,
    authorize("owner", "admin"),
    createdPod
);


// =====================================================
// UPDATE POD
// OWNER / ADMIN
// PATCH /api/pods/:id
// =====================================================

router.patch(
    "/:id",
    protect,
    authorize("owner", "admin"),
    UpdatePod
);


// =====================================================
// DELETE POD
// OWNER / ADMIN
// DELETE /api/pods/:id
// =====================================================

router.delete(
    "/:id",
    protect,
    authorize("owner", "admin"),
    DeletePods
);


module.exports = router;