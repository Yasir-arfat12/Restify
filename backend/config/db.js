const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB CONNECTED SUCCESFULLY");
        
    } catch (err) {
        console.error("Mongo Db Connection Failed");
        process.exit(1); 
        
    }
}

module.exports = connectDB