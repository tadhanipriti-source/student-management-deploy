// 1. Student model import કરો
const Student = require("../models/Student");

// 2. બધા students મેળવો
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch students"
        });
    }
};

// 3. એક student મેળવો
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        const invalidId = error.name === "CastError";

        res.status(invalidId ? 400 : 500).json({
            success: false,
            message: invalidId ? "Invalid student ID" : "Failed to fetch student"
        });
    }
};

// 4. નવો student બનાવો
exports.createStudent = async (req, res) => {
    try {
        const { name, email, age, course } = req.body;

        const student = await Student.create({
            name,
            email,
            age,
            course
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid student data",
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create student"
        });
    }
};

// 5. Student update કરો
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid update data",
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update student"
        });
    }
};

// 6. Student delete કરો
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        const invalidId = error.name === "CastError";

        res.status(invalidId ? 400 : 500).json({
            success: false,
            message: invalidId ? "Invalid student ID" : "Failed to delete student"
        });
    }
};
