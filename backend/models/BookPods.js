const mongoose = require("mongoose")

const podSchema = new mongoose.Schema({
    owner: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    },
    podName:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    },
    hourlyPrice:{
        type:Number,
        required:true
    },
    dayPrice:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        default:1
    },
    amenities:[String],

    status:{
        type:String,
        enum:["Available","Booked","Maintainence"],
        default:"Available"
    },
    images:[String]
},{
    timestamps:true
})

module.exports = mongoose.model("Pod",podSchema);