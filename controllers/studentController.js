const Student = require("../models/Student");

// CREATE: Add a student
exports.createStudent = async (req, res) => {
    try {
        const { name, age, course } = req.body;

        const student = await Student.create({
            name,
            age,
            course
        });

        res.status(201).json({
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            message: "Unable to create student",
            error: error.message
        });
    }
};

// READ: Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch students"
        });
    }
};

// READ: Get one student
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({ data: student });
    } catch (error) {
        res.status(400).json({
            message: "Invalid student ID"
        });
    }
};

// UPDATE: Update a student
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
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            message: "Unable to update student",
            error: error.message
        });
    }
};

// DELETE: Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Unable to delete student",
            error: error.message
        });
    }
};