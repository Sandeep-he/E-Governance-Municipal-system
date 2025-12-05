// backend/model/adminModel.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true }, // friendly id like ADM001
  admin_name: { type: String, required: true },
  passcode: { type: String, required: true }, // plaintext for parity with your current users model
  profile_image: { type: String, default: "logo.png" },
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
