// backend/routes/adminRoute.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Register admin (POST)
router.route('/register')
  .post(adminController.registerAdmin);

// Auth/admin login
router.route('/auth')
  .post(adminController.auth);

module.exports = router;
