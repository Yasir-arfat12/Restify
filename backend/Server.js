const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const UserRoutes = require("./routes/UserRoutes");
const PodRoutes = require("./routes/PodRoutes");
const BookingRoutes = require("./routes/BookingRoutes");
const BillRoutes = require("./routes/BillRoutes");
const PartnerRoutes = require("./routes/PartnerRoutes");

dotenv.config();

const app = express();


// =====================================================
// CONFIGURATION
// =====================================================

const PORT = process.env.PORT || 5000;

const allowedOrigin =
    process.env.FRONTEND_URL || "*";


// =====================================================
// CORS
// =====================================================

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true
    })
);


// =====================================================
// BODY PARSER
// =====================================================

app.use(
    express.json({
        limit: "1mb"
    })
);


// =====================================================
// DATABASE
// =====================================================

connectDB();


// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Restify API is running",
        environment:
            process.env.NODE_ENV || "development"
    });

});


// =====================================================
// API HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Restify API is healthy",
        timestamp: new Date().toISOString()
    });

});


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

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message:
            `Route not found: ${req.method} ${req.originalUrl}`
    });

});


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use(
    (error, req, res, next) => {

        console.error(
            "GLOBAL SERVER ERROR:",
            error
        );

        const statusCode =
            error.statusCode ||
            error.status ||
            500;

        res.status(statusCode).json({

            success: false,

            message:
                process.env.NODE_ENV === "production"
                    ? "Internal server error"
                    : error.message ||
                      "Internal server error"

        });

    }
);


// =====================================================
// START SERVER
// =====================================================

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Restify server running on port ${PORT}`
        );

    }
);