import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import toast, { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:3307";

export default function AdminLogin() {
  const { setValue } = useContext(UserContext);

  const [form, setForm] = useState({
    admin_id: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function verifyAdmin() {
    try {
      const res = await axios.post("/admin/auth", form);

      if (res.status === 200 && res.data.exists === 1) {
        setValue({
          exists: true,
          type: "admin",
          user: res.data.user,
          user_id: res.data.user_id,
        });

        toast.success("Admin Login Successful!");

        setTimeout(() => {
          navigate("/admindash");
        }, 800);
      } else {
        toast.error("Invalid Admin Credentials!");
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
        <h1 className="text-white text-3xl font-bold text-center mb-6">Admin Login</h1>

        <input
          type="text"
          name="admin_id"
          placeholder="Admin ID"
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
          onClick={verifyAdmin}
          className="w-full p-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90"
        >
          Login
        </button>
      </div>
    </div>
  );
}
