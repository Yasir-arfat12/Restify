const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db")
const BookingRoutes = require("./routes/BookingRoutes")
const UserRoutes  = require("./routes/UserRoutes")
const BillRoutes = require("./routes/BillRoutes")
const BookingPodRoutes = require("./routes/BookPodRoutes")
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=> {
    res.send("Welcome to Restify")
});

//connect mongodb
connectDB();


// connect routes
app.use("/api/users",UserRoutes)
app.use("/api/pods", BookingRoutes)
app.use("/api/bill",BillRoutes)
app.use("/api/bookings", BookingPodRoutes)
console.log("server started")
app.listen(PORT, ()=> {
    console.log("server running on", PORT);
    
})
