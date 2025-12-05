import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaUserTie, FaUserShield } from "react-icons/fa";

export default function LoginChoice() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/loginpage2.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-full max-w-3xl p-8 
                      rounded-xl bg-white/10 backdrop-blur-md 
                      border border-white/20 shadow-xl">
        
        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Sign In
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Select the type of account you want to use to login.
        </p>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Citizen Login */}
          <button
            onClick={() => navigate("/login")}
            className="flex flex-col items-center gap-3 p-6 
                       rounded-xl bg-white/10 
                       hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            <FaUserAlt className="text-white text-4xl drop-shadow" />
            <span className="text-white font-semibold">Citizen / User</span>
            <small className="text-gray-300">Login to manage your complaints</small>
          </button>

          {/* Employee Login */}
          <button
            onClick={() => navigate("/employeelogin")}
            className="flex flex-col items-center gap-3 p-6 
                       rounded-xl bg-white/10 
                       hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            <FaUserTie className="text-white text-4xl drop-shadow" />
            <span className="text-white font-semibold">Employee</span>
            <small className="text-gray-300">Access assigned complaints</small>
          </button>

          {/* Admin Login */}
          <button
            onClick={() => navigate("/adminlogin")}
            className="flex flex-col items-center gap-3 p-6 
                       rounded-xl bg-white/10 
                       hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            <FaUserShield className="text-white text-4xl drop-shadow" />
            <span className="text-white font-semibold">Admin</span>
            <small className="text-gray-300">Administrative dashboard</small>
          </button>

        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-md text-sm 
                       bg-white/10 text-white 
                       hover:bg-white/20 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
