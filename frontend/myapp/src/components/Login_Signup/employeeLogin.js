import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import toast, { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:3307";

export default function EmployeeLogin() {
  const { setValue } = useContext(UserContext);

  const [form, setForm] = useState({
    ssn: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function verifyEmployee() {
    try {
      const res = await axios.post("/employee/login", {
        ssn: form.ssn,
        password: form.password,
      });

      if (res.data.success) {
        toast.success("Login Successful!");

        setValue({
          exists: true,
          type: "employee",
          user: res.data.employee.employee_name,
          user_id: res.data.employee.ssn,
          designation: res.data.employee.designation,
          department: res.data.employee.department,
        });

        setTimeout(() => {
          navigate("/empdash");
        }, 800);
      } else {
        toast.error("Invalid Employee Credentials!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Login Failed");
    }
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: "url('/loginpage2.png')" }}
    >
      <Toaster />

      <div className="w-96 p-8 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Employee Login
        </h1>

        <input
          type="text"
          name="ssn"
          placeholder="Employee SSN"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-md bg-white/20 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-md bg-white/20 text-white outline-none"
        />

        <button
          onClick={verifyEmployee}
          className="w-full p-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90"
        >
          Login
        </button>
      </div>
    </div>
  );
}
