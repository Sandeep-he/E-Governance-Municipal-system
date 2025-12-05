// backend/initAdmin.js

const connectDB = require('./database');
const Admin = require('./model/adminModel');

// IMPORTANT: Import correct employee model
const { EmployeeModelForAuth } = require('./model/employeeModel');
const Employee = EmployeeModelForAuth;  // alias

async function run() {
  try {
    await connectDB;
    console.log("MongoDB Connected");

    // --------------------------
    // 1️⃣ CREATE ADMIN
    // --------------------------
    const adminExists = await Admin.findOne({ admin_name: "superadmin" });

    if (adminExists) {
      console.log("Admin already exists:", adminExists.adminId);
    } else {
      const admin = new Admin({
        adminId: "ADM1000",
        admin_name: "superadmin",
        passcode: "admin123",
        profile_image: "logo.png"
      });

      await admin.save();
      console.log("Created Admin:", admin.adminId);
    }

    // --------------------------
    // 2️⃣ EMPLOYEES LIST
    // --------------------------
    const employees = [
      // Garbage & Sewage
      {
        ssn: "2001",
        employee_name: "Vikram Deshmukh",
        designation: "employee",
        department: "Garbage and Sewage Management Department",
        contact_num: "9876501234",
        address: "Sector 5",
        passcode: "vikram123",
        profile_image: "logo.png"
      },
      {
        ssn: "2002",
        employee_name: "Sagar Jadhav",
        designation: "employee",
        department: "Garbage and Sewage Management Department",
        contact_num: "9898988989",
        address: "Sector 8",
        passcode: "sagar123",
        profile_image: "logo.png"
      },

      // Water Department
      {
        ssn: "3001",
        employee_name: "Amit Kulkarni",
        designation: "employee",
        department: "Water Department",
        contact_num: "9012345678",
        address: "Sector 14",
        passcode: "amit123",
        profile_image: "logo.png"
      },
      {
        ssn: "3002",
        employee_name: "Sneha Patil",
        designation: "employee",
        department: "Water Department",
        contact_num: "9123987654",
        address: "Sector 20",
        passcode: "sneha123",
        profile_image: "logo.png"
      },

      // Road Department
      {
        ssn: "4001",
        employee_name: "Ramesh Gaikwad",
        designation: "employee",
        department: "Road Management Department",
        contact_num: "9000001111",
        address: "Sector 2",
        passcode: "ramesh123",
        profile_image: "logo.png"
      },
      {
        ssn: "4002",
        employee_name: "Mahesh Kharat",
        designation: "employee",
        department: "Road Management Department",
        contact_num: "9090907070",
        address: "Sector 18",
        passcode: "mahesh123",
        profile_image: "logo.png"
      },

      // Power Department
      {
        ssn: "5001",
        employee_name: "Nitin Pawar",
        designation: "employee",
        department: "Power Supply Department",
        contact_num: "9877654321",
        address: "Sector 11",
        passcode: "nitin123",
        profile_image: "logo.png"
      },
      {
        ssn: "5002",
        employee_name: "Harsha More",
        designation: "employee",
        department: "Power Supply Department",
        contact_num: "9988776655",
        address: "Sector 25",
        passcode: "harsha123",
        profile_image: "logo.png"
      }
    ];

    // --------------------------
    // 3️⃣ SAVE EMPLOYEES
    // --------------------------
    for (let emp of employees) {
      const exists = await Employee.findOne({ ssn: emp.ssn });

      if (!exists) {
        await Employee.create(emp);
        console.log("Employee created:", emp.ssn);
      } else {
        console.log("Employee already exists:", emp.ssn);
      }
    }

    console.log("✔ All admin & employee setup completed.");
    process.exit(0);

  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

run();
