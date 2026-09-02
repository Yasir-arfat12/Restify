const User = require("../models/User");
const generateToken = require("../Utils/generateToken");


// Register

exports.registerUser = async(req,res)=>{

try{
const {name,email,password}=req.body;

const userExists = await User.findOne({email});

if(userExists){

return res.status(400).json({

message:"User already exists"

});

}

const user = await User.create({

name,
email,
password,
role: "customer"

});

res.status(201).json({

_id:user._id,

name:user.name,

email:user.email,

role:user.role,

token:generateToken(user._id)

});

}

catch(error){
console.error(error)
res.status(500).json({

message:error.message

});

}

};


// Login

exports.loginUser = async(req,res)=>{

try{

const {email,password}=req.body;

const user = await User.findOne({email});

if(user && await user.matchPassword(password)){

res.json({

_id:user._id,

name:user.name,

email:user.email,

role:user.role,

token:generateToken(user._id)

});

}

else{

res.status(401).json({

message:"Invalid Credentials"

});

}

}

catch(error){

res.status(500).json({

message:error.message

});

}

};


// Profile

exports.getProfile = async(req,res)=>{

const user = await User.findById(req.user._id).select("-password");

res.json(user);

};