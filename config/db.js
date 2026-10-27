// 1. Mongoose package import કરો
const mongoose = require("mongoose");

// 2. Database connection function બનાવો
async function connectDB() {

    // 3. Environment variable માંથી URI મેળવો
    const mongoURI = process.env.MONGODB_URI;

    // 4. URI ન હોય તો error આપો
    if (!mongoURI) {
        throw new Error("MONGODB_URI is missing in .env");
    }

    // 5. MongoDB સાથે connect કરો
    await mongoose.connect(mongoURI);

    // 6. Success message
    console.log("MongoDB connected successfully");
}

// 7. Function export કરો
module.exports = connectDB;
