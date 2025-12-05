const express = require('express');
const router = express.Router();
const empController = require('../controllers/employeeController');

// Register Employee
router.post('/register', empController.registerEmployee);

// Login
router.post('/login', empController.loginEmployee);

// ⭐ Get Employees by Department Name
router.get('/getEmpByDept/:deptName', empController.getEmpByDept);

// Get All Employees
router.get('/getAllEmp', empController.getAllEmp);

module.exports = router;
