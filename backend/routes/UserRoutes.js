const express = require("express");
const router = express.Router();

const {

registerUser,

loginUser,

getProfile

}=require("../Controllers/UserControllers");

const {protect} = require("../middlewares/authMiddlewares")
const {authorize} = require("../middlewares/roleMiddleware")



router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/profile",

protect,

getProfile

);


router.get("/admin",

protect,

authorize("admin"),

(req,res)=>{

res.json({

message:"Welcome Admin"

});

}

);

module.exports=router;