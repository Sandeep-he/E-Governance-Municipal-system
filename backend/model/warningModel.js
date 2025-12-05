// model/warningModel.js
const mongoose = require('mongoose');

const warningSchema = new mongoose.Schema({
  complaint_number: String,
  notification: String
}, { timestamps: true });

const Warning = mongoose.model('Warning', warningSchema);

module.exports = Warning;
