const Booking = require("../models/Booking");
const Pod = require("../models/BookPods");
const user = require("../models/User")
exports.createdPod = async(req, res)=> {
    try{
        const pod = await Pod.create({
            owner: req.user._id,
            
            podName:req.body.podName,
            
            description:req.body.description,
            
            location:req.body.location,
            
            city:req.body.city,
            
            state:req.body.state,
            
            hourlyPrice:req.body.hourlyPrice,
            
            dayPrice:req.body.dayPrice,
            
            capacity:req.body.capacity,
            
            amenities:req.body.amenities,

            images:req.body.images
            
        });

        res.status(201).json({
            success:true,
            pod
        })
    }
    catch( error){
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
}

exports.getPods= async (req, res)=> {

    try {
        const pods = await Pod.find().populate("owner", "name email");
        res.json(pods);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

exports.getMyPods = async (req,res)=> {

    try {
        const pods = await Pod.find({
            owner: req.user._id
        });

        res.json(pods);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
}

exports.UpdatePod = async (req, res)=> {
    try {
        const pod = await Pod.findById(req.params.id);

        if(!pod){
            res.status(404).json({
                message: "Pod Not Found"
            });
        }
        if (req.user.role != "admin" && pod.owner.toString != req.user._id.toString()){
            res.status(403).json({message: "Access Denied"})
        } 
    
        pod.podName=req.body.podName || pod.podName;

        pod.description=req.body.description || pod.description;

        pod.location=req.body.location || pod.location;

        pod.city=req.body.city || pod.city;

        pod.state=req.body.state || pod.state;

        pod.hourlyPrice=req.body.hourlyPrice || pod.hourlyPrice;

        pod.dayPrice=req.body.dayPrice || pod.dayPrice;

        pod.capacity=req.body.capacity || pod.capacity;

        pod.amenities=req.body.amenities || pod.amenities;

        pod.images=req.body.images || pod.images;

            await pod.save();

            res.json(pod);

            }

        catch(error){
            console.error(error);
            res.status(500).json({

            message:error.message

            });

    }
 }
 exports.DeletePods = async (req, res)=> {
    try{
    const pod = await Pod.findById(req.params.id);
    if(!pod){
        res.status(404).json({
            message:"Pod Not Found"
        });
    }
    if (req.user.role != "admin" && pod.owner.toString()!= req.user._id.toString()){
        res.status(403).json({
            message: "Access Denied"
        });
    }
    
    await pod.deleteOne();

    res.json({
        message:"Pod Deleted"
    })
 }catch(error){
    console.error(error);
    res.status(500).json({
        message:"Server Error"
    });
 }
} 

exports.searchPods = async (req,res)=> {
    try{
        const {
            city,
            location,
            podName,
            minPrice,
            maxPrice,
            capacity,
            date,
            time,
            bookingDate
        }=req.query;

        const filter = {

        };
        if (city){
            filter.city={
                $regex:city,
                $options:"i"
            }
        };
        if (location){
            filter.location={
                $regex : location,
                $options:"i"
            }
        }
        if(podName){
            filter.podName = {
                $regex:podName,
                $options:"i"
            }
        }
        if(capacity){
            filter.capacity = {
                $gte:Number(capacity)
            }
        }

        if (minPrice || maxPrice){
            filter.hourlyPrice={}
            if (minPrice){
                filter.hourlyPrice.$gte=Number(minPrice)
            }
            if (maxPrice){
                filter.hourlyPrice.$gte=Number(maxPrice)
            }
        }


    const pods = await Pod.find(filter)
    .populate("owner","name,email")
    .sort({
        hourlyPrice:1
    });
   // search available pods
  /*  const availablePods = pods;

    if (bookingDate){
        const bookedPods = await Booking.find({
            bookingDate: new Date(bookingDate),
            bookingStatus:{
                 $in: ["Pending", "Confirmed"]
            }
        }).select("pod")
    }

    const bookedPodsId = bookedPods.map((booking)=> {
        booking.pod.toString()
    })
 
    availablePods = pods.filter((pod)=> {
        !bookedPodsId.includes(pod._id.toString())
    })
         */
    res.json({
        success:true,
        count:pods.length,
        pods
    })    
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message})
    }
}