// backend/controllers/employeeController.js

const empModel = require('../model/employeeModel');
const Employee = require('../model/employeeModel').EmployeeModelForAuth;

// --------------------------------------
// REGISTER EMPLOYEE
// --------------------------------------
const registerEmployee = (req, res) => {
    empModel.registerEmployee(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err));
};

// --------------------------------------
// ⭐ GET EMPLOYEES BY DEPARTMENT (MONGODB FIX)
// --------------------------------------
const getEmpByDept = async (req, res) => {
    try {
        const deptName = decodeURIComponent(req.params.deptName);

        const employees = await Employee.find({
            department: deptName,
            designation: "employee"
        }).lean();

        return res.status(200).json(employees);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// --------------------------------------
// GET ALL EMPLOYEES
// --------------------------------------
const getAllEmp = (req, res) => {
    empModel.getAllEmp()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err));
};

// --------------------------------------
// LOGIN EMPLOYEE
// --------------------------------------
const loginEmployee = async (req, res) => {
    try {
        const { ssn, password } = req.body;

        if (!ssn || !password) {
            return res.status(200).json({ success: false, msg: "Missing credentials" });
        }

        const employee = await Employee.findOne({ ssn }).lean();

        if (!employee) {
            return res.status(200).json({ success: false, msg: "Employee not found" });
        }
        if (employee.passcode !== password) {
            return res.status(200).json({ success: false, msg: "Incorrect password" });
        }

        return res.status(200).json({
            success: true,
            msg: "Login Successful",
            employee
        });

    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
};

module.exports = {
    registerEmployee,
    getEmpByDept,
    getAllEmp,
    loginEmployee
};
