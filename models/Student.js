// 1. Mongoose import કરો
const mongoose = require("mongoose");

// 2. Student schema બનાવો
const studentSchema = new mongoose.Schema(
    {
        // 3. Student name
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },

        // 4. Student email
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        // 5. Student age
        age: {
            type: Number,
            required: true,
            min: 1,
            max: 100
        },

        // 6. Student course
        course: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        // 7. Created and updated timestamps
        timestamps: true
    }
);

// 8. Student model export કરો
module.exports = mongoose.model("Student", studentSchema);
