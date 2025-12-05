// backend/controllers/adminController.js
const Admin = require('../model/adminModel');
const generateUniqueId = require('generate-unique-id');

/**
 * Register a new admin (useful for initial setup or creating more admins)
 * Expects: { name, passcode, profileImage? }
 */
const registerAdmin = async (req, res) => {
  try {
    const data = req.body;
    const id = generateUniqueId({ length: 6, useLetters: false });
    const adminDoc = new Admin({
      adminId: `ADM${id}`,
      admin_name: data.name || data.admin_name,
      passcode: data.password || data.passcode || data.pass,
      profile_image: data.profileImage || data.profile_image || "logo.png"
    });

    await adminDoc.save();
    return res.json({ register: true, adminId: adminDoc.adminId });
  } catch (err) {
    console.error("admin register error:", err);
    // If duplicate key
    if (err.code === 11000) return res.json({ register: false, error: 'duplicate' });
    return res.status(500).json({ register: false, error: err.message });
  }
};

/**
 * Auth for admin login
 * Expects: { username, password } or { admin_id, password } depending on frontend.
 * We'll accept `username` or `admin_id` or `admin_name`.
 */
const auth = async (req, res) => {
  try {
    const data = req.body;
    const username = data.username || data.admin_id || data.admin_name;
    const password = data.password || data.passcode;

    if (!username || !password) return res.json({ exists: 0 });

    // Try find by admin_name or adminId
    const admin = await Admin.findOne({
      $or: [{ admin_name: username }, { adminId: username }]
    }).lean();

    if (!admin) return res.json({ exists: 0 });

    // Plaintext comparison to match your existing users flow
    if (admin.passcode !== password) return res.json({ exists: 0 });

    return res.json({
      exists: 1,
      type: 'admin',
      user: admin.admin_name,
      user_id: admin.adminId,
      profile_image: admin.profile_image || null
    });
  } catch (err) {
    console.error("admin auth error:", err);
    return res.status(500).json({ exists: 0, error: err.message });
  }
};

module.exports = {
  registerAdmin,
  auth
};
