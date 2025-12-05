// main.js

// Connect to MongoDB FIRST
require('./database');

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 1000000 }));

// -------------------------------------------------
// ROUTES
// -------------------------------------------------
app.use('/complaint', require('./routes/complaintsRoute'));
app.use('/user', require('./routes/userRoute'));
app.use('/employee', require('./routes/employeeRoute'));
app.use('/admin', require('./routes/adminRoute'));

// -------------------------------------------------
// START CRON JOBS AFTER DB CONNECTION
// -------------------------------------------------
setTimeout(() => {
    console.log("Starting cron jobs...");
    try {
        require('./cronJobs');
    } catch (err) {
        console.error("Cron job error:", err.message);
    }
}, 2000);

// -------------------------------------------------
// SERVER START
// -------------------------------------------------
const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
