const express  = require("express")
const router = express.Router()

const {protect} = require("../middlewares/authMiddlewares")
const {authorize} = require("../middlewares/roleMiddleware")

const {
    createBill
} = require("../Controllers/BillControllers")

router.post("/:bookingId",protect,authorize("customer","admin"),
                createBill)

module.exports = router                