// 1. Express import કરો
const express = require("express");

// 2. Router બનાવો
const router = express.Router();

// 3. Controller import કરો
const studentController = require("../controllers/studentController");

// 4. બધા students મેળવવા
router.get("/", studentController.getAllStudents);

// 5. ID પ્રમાણે student મેળવવા
router.get("/:id", studentController.getStudentById);

// 6. નવો student બનાવવા
router.post("/", studentController.createStudent);

// 7. Student update કરવા
router.put("/:id", studentController.updateStudent);

// 8. Student delete કરવા
router.delete("/:id", studentController.deleteStudent);

// 9. Router export કરો
module.exports = router;
