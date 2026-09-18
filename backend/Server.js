// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv")
// const jwt = require("jsonwebtoken");
// const connectDB = require("./config/db")
// const BookingRoutes = require("./routes/BookingRoutes");
// const BookingPodRoutes = require("./routes/BookPodRoutes");
// const UserRoutes  = require("./routes/UserRoutes")
// const BillRoutes = require("./routes/BillRoutes");
// const BookingManagementRoutes = require("./routes/BookingManagementRoutes")
// const PartnerRoutes = require("./routes/PartnerRoutes");
// const app = express();
// app.use(express.json());
// app.use(cors());

// dotenv.config();
// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res)=> {
//     res.send("Welcome to Restify")
// });

// //connect mongodb
// connectDB();


// // connect routes
// app.use("/api/users",UserRoutes)
// app.use("/api/pods", BookingRoutes)
// app.use("/api/bill",BillRoutes)
// app.use("/api/bookings",BookingManagementRoutes)
// app.use("/api/partners",PartnerRoutes);
// console.log("server started")
// app.listen(PORT, ()=> {
//     console.log("server running on", PORT);
    
// })

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const UserRoutes =
    require("./routes/UserRoutes");

const PodRoutes =
    require("./routes/podRoutes");

const BookingRoutes =
    require("./routes/BookingRoutes");

const BillRoutes =
    require("./routes/BillRoutes");

const PartnerRoutes =
    require("./routes/PartnerRoutes");


dotenv.config();

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
    cors({
        origin: true,
        credentials: true
    })
);

app.use(
    express.json()
);


// =====================================================
// DATABASE
// =====================================================

connectDB();


// =====================================================
// HEALTH CHECK
// =====================================================

app.get(
    "/",
    (req, res) => {

        res.status(200).json({

            success: true,

            message:
                "Restify API is running"

        });

    }
);


// =====================================================
// API ROUTES
// =====================================================

app.use(
    "/api/users",
    UserRoutes
);


app.use(
    "/api/pods",
    PodRoutes
);


app.use(
    "/api/bookings",
    BookingRoutes
);


app.use(
    "/api/bill",
    BillRoutes
);


app.use(
    "/api/partners",
    PartnerRoutes
);


// =====================================================
// 404 HANDLER
// =====================================================

app.use(
    (req, res) => {

        res.status(404).json({

            success: false,

            message:
                `Route not found: ${req.method} ${req.originalUrl}`

        });

    }
);


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use(
    (error, req, res, next) => {

        console.error(
            "GLOBAL SERVER ERROR:",
            error
        );

        res.status(
            error.status || 500
        ).json({

            success: false,

            message:
                error.message ||
                "Internal server error"

        });

    }
);


// =====================================================
// SERVER
// =====================================================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(
            `Restify server running on port ${PORT}`
        );

    }
);