// Line 1: Express package import કરો
const express = require("express");

// Line 2: .env file ની values load કરો
require("dotenv").config();

// Line 3: Database connection function import કરો
const connectDB = require("./config/db");

// Line 4: Student routes import કરો
const studentRoutes = require("./routes/studentRoutes");

// Line 5: Express application બનાવો
const app = express();

// Line 6: JSON request body વાંચવા માટે middleware
app.use(express.json());

// Line 7: Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Student Management API is running!"
    });
});

// Line 8: Student API routes connect કરો
app.use("/api/students", studentRoutes);

// Line 9: Unknown routes માટે 404 response
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Line 10: Hosting platform નો port અથવા local port
const PORT = process.env.PORT || 3000;

// Line 11: Database connect થયા પછી server start કરો
async function startServer() {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Line 12: Startup error handle કરો

startServer().catch((error) => {
    console.error("Startup failed:", error);
    process.exit(1);
});
