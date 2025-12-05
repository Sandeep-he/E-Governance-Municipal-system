// model/complaintsModel.js
const mongoose = require('mongoose');
const generateUniqueId = require('generate-unique-id');
const Comment = require('./commentsModel');
const Warning = require('./warningModel');
const EmployeeWrapper = require('./employeeModel');
const Employee = EmployeeWrapper.EmployeeModelForAuth;

const complaintSchema = new mongoose.Schema({
  complaint_number: { type: String, unique: true },
  user: String,               // user id
  ward: Number,
  complaint_description: String,
  problemImage: String,
  complaint_status: { type: String, default: 'Pending' },
  complaint_address: String,
  empAssignedId: { type: String, default: null },
  registration_time: String,
  registration_date: String,
  completion_time: String,
  completion_date: String,
  department: String,
  priority: { type: String, default: 'low' },
  complaint_type: String,
  estimated_time: String
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', complaintSchema);

// Helper: format current date/time strings (matching your previous format)
function nowDateTime() {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  const comment_date = `${year}-${(month<10?'0':'')+month}-${(date<10?'0':'')+date}`;
  const comment_time = `${(hours<10?'0':'')+hours}:${(minutes<10?'0':'')+minutes}:${(seconds<10?'0':'')+seconds}`;
  return { comment_date, comment_time };
}

const registerComplaints = async (data) => {
  const id = generateUniqueId({ length: 5, useLetters: false });

  const { comment_date, comment_time } = nowDateTime();

  const compObj = {
    complaint_number: id,
    user: data.user,
    ward: data.ward,
    complaint_description: data.description || data.complaint_description || '',
    problemImage: data.problemImage || data.complaint_photo || '',
    complaint_status: 'Pending',
    complaint_address: data.location || data.complaint_address || '',
    empAssignedId: null,
    registration_time: comment_time,
    registration_date: comment_date,
    completion_time: null,
    completion_date: null,
    department: data.department || data.dept || null,
    estimated_time: null,
    priority: 'low',
    complaint_type: data.complaint_type || null
  };

  const created = await Complaint.create(compObj);

  const commentCreated = await Comment.create({
    complaint_number: id,
    comment_description: 'Complaint created',
    comment_time: `${comment_date} ${comment_time}`,
    empId: null
  });

  return {
    value: {
      complaintId: id,
      registrationTime: `${comment_date} ${comment_time}`,
      location: compObj.complaint_address,
      complaint_photo: compObj.problemImage,
      description: compObj.complaint_description
    },
    value2: { commentCreated: true }
  };
};

const complaintData = async () => {
  const totalCount = await Complaint.countDocuments();
  const resolvedCount = await Complaint.countDocuments({ complaint_status: 'Resolved' });
  return [{
    total: totalCount,
    resolved: resolvedCount,
    pending: totalCount - resolvedCount
  }];
};

const searchData = async (data) => {
  // SQL did: complaint_number like "data%"
  const re = new RegExp('^' + data);
  const docs = await Complaint.find({ complaint_number: { $regex: re } }).lean();
  return { value: docs };
};

const fetchAllData = async () => {
  const rows = await Complaint.find({}, {
    complaint_number: 1,
    complaint_status: 1,
    complaint_description: 1,
    priority: 1,
    complaint_type: 1,
    registration_date: 1,
    completion_time: 1,
    estimated_time: 1,
    empAssignedId: 1,
    _id: 0
  }).lean();
  return rows;
};

const updatecomplaint = async (data) => {
  let updateObj = {};
  if (data.status === 'Resolved') {
    const { comment_date, comment_time } = nowDateTime();
    updateObj = {
      complaint_status: data.status,
      completion_time: comment_time,
      completion_date: comment_date
    };
  } else {
    updateObj = { complaint_status: data.status };
  }

  await Complaint.updateOne({ complaint_number: data.id }, { $set: updateObj });

  await Comment.create({
    complaint_number: data.id,
    comment_description: `Complaint moved to the ${data.status} section`,
    comment_time: data.commentTime || `${new Date().toISOString()}`,
    empId: data.empId || null
  });

  return { value: { updated: true }, value2: { commentCreated: true } };
};

const addComment = async (data) => {
  await Comment.create({
    complaint_number: data.id,
    comment_description: data.comment,
    comment_time: data.commentTime || `${new Date().toISOString()}`,
    empId: data.empId || null
  });
  return { commentCreated: true };
};

const getcomplainttimeline = async (data) => {
  const rows = await Comment.find({ complaint_number: data.id }, { comment_description: 1, comment_time: 1, _id: 0 }).sort({ comment_time: -1 }).lean();
  return rows;
};

const fetchUserComplaints = async (data) => {
  const rows = await Complaint.find({ user: data.id }, {
    complaint_status: 1,
    complaint_type: 1,
    registration_date: 1,
    complaint_address: 1,
    complaint_number: 1,
    _id: 0
  }).sort({ registration_date: -1 }).lean();
  return rows;
};

const updateEmpDate = async (data) => {
  await Complaint.updateOne({ complaint_number: data.id }, {
    $set: {
      empAssignedId: data.empAssigned,
      estimated_time: data.estimatedDate
    }
  });

  await Comment.create({
    complaint_number: data.id,
    comment_description: `Estimated Date of Completion : ${data.estimatedDate}`,
    comment_time: data.comment_time || new Date().toISOString(),
    empId: data.empId || null
  });

  return { value: { updated: true }, value2: { updated: true } };
};

const fetchEmpData = async (empId) => {
  const rows = await Complaint.find({ empAssignedId: empId }, {
    complaint_number: 1,
    complaint_status: 1,
    complaint_description: 1,
    priority: 1,
    complaint_type: 1,
    registration_date: 1,
    completion_time: 1,
    estimated_time: 1,
    _id: 0
  }).lean();
  return rows;
};

const fetchWardWiseData = async (ssn) => {
  // find employee by ssn and get ward_number
  const emp = await Employee.findOne({ ssn }).lean();
  if (!emp || emp.ward_number == null) return [];
  const rows = await Complaint.find({ ward: emp.ward_number }, {
    complaint_number: 1,
    complaint_status: 1,
    complaint_description: 1,
    priority: 1,
    complaint_type: 1,
    registration_date: 1,
    completion_time: 1,
    estimated_time: 1,
    empAssignedId: 1,
    _id: 0
  }).lean();
  return rows;
};

const fetchWarnings = async (empId) => {
  // find complaint numbers assigned to this emp
  const comps = await Complaint.find({ empAssignedId: empId }, { complaint_number: 1 }).lean();
  const complaintNumbers = comps.map(c => c.complaint_number);
  if (complaintNumbers.length === 0) return [];
  const warnings = await Warning.find({ complaint_number: { $in: complaintNumbers } }, { complaint_number: 1, notification: 1, _id: 0 }).lean();
  return warnings;
};

module.exports = {
  registerComplaints,
  complaintData,
  searchData,
  fetchAllData,
  updatecomplaint,
  addComment,
  getcomplainttimeline,
  fetchUserComplaints,
  updateEmpDate,
  fetchEmpData,
  fetchWardWiseData,
  fetchWarnings,
  Complaint // exported if needed
};
