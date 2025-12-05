import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3307";

export default function Login() {
  const { setValue } = useContext(UserContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function verify() {
    try {
      const response = await axios.post("/user/auth", form);

      if (response.status === 200 && response.data.exists === 1) {
        const userType = response.data.type; // 'user' | 'employee' | 'admin'

        // save user details
        setValue((prev) => ({
          ...prev,
          exists: true,
          type: userType,
          user: response.data.user,
          user_id: response.data.user_id,
          profile_image: response.data.profile_image,
        }));

        toast.success("Login Successful!");

        // ⭐ role-based redirect ⭐
        setTimeout(() => {
          if (userType === "admin") navigate("/adminhome");
          else if (userType === "employee") navigate("/employeehome");
          else navigate("/userhome"); // citizen
        }, 800);

      } else {
        toast.error("Incorrect Username or Password!");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      toast.error("Connection Error!");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/loginpage2.png')" }}
    >
      <Toaster />

      {/* Glass Card */}
      <div className="w-[380px] p-10 rounded-2xl 
                      backdrop-blur-xl bg-white/10 border border-white/20 
                      shadow-[0px_0px_40px_rgba(0,0,0,0.5)]
                      animate-[fadeIn_1s_ease]">

        {/* Top Glow Line */}
        <div className="w-full h-[3px] rounded-full mb-6 
                        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"></div>

        <h1 className="text-white text-3xl text-center font-bold drop-shadow-lg mb-8">
          Login
        </h1>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full h-12 px-4 mb-5 rounded-xl bg-white/20 text-white 
                     placeholder-gray-300 border border-white/30
                     hover:bg-white/25 
                     focus:border-purple-400 focus:shadow-lg 
                     focus:shadow-purple-500/40 outline-none
                     transition-all duration-300"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full h-12 px-4 mb-6 rounded-xl bg-white/20 text-white 
                     placeholder-gray-300 border border-white/30
                     hover:bg-white/25 
                     focus:border-blue-400 focus:shadow-lg 
                     focus:shadow-blue-500/40 outline-none
                     transition-all duration-300"
        />

        {/* Submit Button */}
        <button
          onClick={verify}
          className="w-full h-12 text-white font-semibold rounded-xl
                     bg-gradient-to-r from-blue-600 to-purple-600
                     shadow-lg hover:shadow-purple-700/50 
                     hover:scale-[1.03] transition-all duration-300"
        >
          Submit
        </button>

        {/* Signup Link */}
        <p
          onClick={() => navigate("/register")}
          className="text-white text-center mt-6 cursor-pointer hover:underline 
                     underline-offset-4 hover:text-blue-200
                     transition duration-200"
        >
          Not registered? Signup Now!
        </p>
      </div>
    </div>
  );
}
