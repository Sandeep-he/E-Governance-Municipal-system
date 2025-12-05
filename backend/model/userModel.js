// model/userModel.js
const mongoose = require('mongoose');
const generateUniqueId = require('generate-unique-id');

const userSchema = new mongoose.Schema({
  user_number: { type: String, unique: true },
  user_name: String,
  passcode: String,
  user_address: String,
  profile_image: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const registerUser = async (data) => {
  const id = generateUniqueId({ length: 5, useLetters: false });
  try {
    await User.create({
      user_number: id,
      user_name: data.name,
      passcode: data.password,
      user_address: data.address,
      profile_image: data.profileImage
    });
    return { register: true };
  } catch (err) {
    // match old behavior: return object with register false and error code
    return { register: false, error: err.message };
  }
};

const auth = async (data) => {
  // try users first
  const user = await User.findOne({ user_name: data.username, passcode: data.password }).lean();
  if (user) {
    return {
      exists: 1,
      type: 'user',
      user: data.username,
      user_id: user.user_number,
      profile_image: user.profile_image
    };
  }

  // attempt employee login (employeeModel handles actual lookup)
  // Controllers expect userModel.auth to return employee result as well.
  // We'll require Employee here to replicate original flow.
  const Employee = require('./employeeModel').EmployeeModelForAuth;
  if (Employee) {
    const emp = await Employee.findOne({ employee_name: data.username, passcode: data.password }).lean();
    if (emp) {
      return {
        exists: 1,
        type: emp.designation,
        user: data.username,
        user_id: emp.ssn,
        profile_image: emp.profile_image
      };
    }
  }

  return { exists: 0 };
};

module.exports = {
  registerUser,
  auth,
  User // exported in case you want raw access
};
