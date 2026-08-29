const express = require("express");

const router = express.Router();

const {protect} = require("../middlewares/authMiddlewares")

const {authorize} = require("../middlewares/roleMiddleware");

const {
    createdPod,
    getPods,
    getMyPods,
    UpdatePod,
    DeletePods,
    searchPods
} = require("../Controllers/podControllers")

router.post("/create-pod", protect, authorize("admin","owner"),createdPod)

router.get("/", getPods);

router.get("/myPods",protect,authorize("owner"), getMyPods);

router.post("/:id", protect, authorize("owner", "admin"), UpdatePod);

router.delete("/:id",protect, authorize("owner", "admin"), DeletePods);

router.get("/search",protect, searchPods)
module.exports = router