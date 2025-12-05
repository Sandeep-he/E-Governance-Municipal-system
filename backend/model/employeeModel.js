// model/employeeModel.js
const mongoose = require('mongoose');
const generateUniqueId = require('generate-unique-id');

const employeeSchema = new mongoose.Schema({
  ssn: { type: String, unique: true },
  supervisor_ssn: { type: String, default: null }, // was second column in SQL insert
  employee_name: String,
  designation: String,
  department: String,
  contact_num: String,
  address: String,
  passcode: String,
  profile_image: String,
  ward_number: { type: Number, default: null }
}, { timestamps: true });

/**
 * Trigger logic moved here:
 * When creating/updating employee, if designation !== 'corporator', ward_number will be set to null.
 * This mirrors the SQL trigger behavior.
 */
employeeSchema.pre('save', function(next) {
  if (this.designation !== 'corporator') {
    this.ward_number = null;
  }
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

// helper exported for userModel auth
const EmployeeModelForAuth = Employee;

const registerEmployee = async (data) => {
  const id = generateUniqueId({ length: 5, useLetters: false });
  try {
    await Employee.create({
      ssn: id,
      supervisor_ssn: null,
      employee_name: data.name,
      designation: data.designation,
      department: data.department,
      contact_num: data.contactNum,
      address: data.address,
      passcode: data.password,
      profile_image: data.profileImage,
      ward_number: data.wardNumber || null
    });
    return { register: true };
  } catch (err) {
    return { register: false, error: err.message };
  }
};

const getEmpByDept = async (deptId) => {
  // keep same data shape: ssn, employee_name (only employees)
  const rows = await Employee.find({ department: deptId, designation: 'employee' }, { ssn: 1, employee_name: 1, _id: 0 }).lean();
  return rows;
};

const getAllEmp = async () => {
  const rows = await Employee.find({}, { ssn: 1, employee_name: 1, contact_num: 1, designation: 1, _id: 0 }).lean();
  return rows;
};

module.exports = {
  registerEmployee,
  getEmpByDept,
  getAllEmp,
  EmployeeModelForAuth // exported so userModel can require it
};
