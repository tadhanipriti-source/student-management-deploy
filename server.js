require("dotenv").config({
    path: require("path").join(__dirname, ".env")
});

const express = require("express");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware: Read JSON request body
app.use(express.json());

// Student API routes
app.use("/api/students", studentRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Port configuration
const PORT = process.env.PORT || 3000;

// Start server and connect to MongoDB
async function startServer() {
    try {
        // Check environment variable
        if (!process.env.MONGO_URI) {
            throw new Error(
                "MONGO_URI is missing. Please check your .env file."
            );
        }

        console.log("Connecting to MongoDB...");

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");

        // Start Express server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`URL: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Startup failed:", error.message);
        process.exit(1);
    }
}

startServer();