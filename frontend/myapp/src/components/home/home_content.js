import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";

import AdminHome from "./AdminHome";
import CitizenHome from "./CitizenHome";
import EmployeeHome from "./EmployeeHome";

import { BsFillPersonPlusFill } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";

export default function HomeBody() {
  const navigate = useNavigate();
  const { value } = useContext(UserContext);

  // AUTO REDIRECT IF LOGGED IN
  if (value.exists === true) {
    if (value.type === "admin") return <AdminHome />;
    if (value.type === "employee") return <EmployeeHome />;
    if (value.type === "user") return <CitizenHome />;
  }

  // PUBLIC HOME PAGE
  return (
    <main
      className="w-full min-h-[85vh] bg-cover bg-center bg-no-repeat relative pt-28 pb-16 animate-pageFade"
      style={{ backgroundImage: "url('/mahanagar.png')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeUp">
          Smart Municipal Complaint System
        </h1>

        <p className="text-gray-200 text-lg mb-12 animate-fadeUp delay-150">
          Register as a citizen or log in to access municipal services.
        </p>

        {/* BUTTON CARDS */}
        <div className="flex flex-col md:flex-row gap-10 justify-center animate-fadeUp delay-300">

          {/* REGISTER */}
          <div
            onClick={() => navigate("/register")}
            className="cursor-pointer w-80 p-6 bg-white/10 border border-white/20 
                       backdrop-blur-lg rounded-xl hover:bg-white/20 transition"
          >
            <BsFillPersonPlusFill className="text-white text-4xl mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-white">Citizen Registration</h2>
            <p className="text-gray-300 mt-2">Create an account</p>
          </div>

          {/* LOGIN CHOICE */}
          <div
            onClick={() => navigate("/loginchoice")}
            className="cursor-pointer w-80 p-6 bg-white/10 border border-white/20 
                       backdrop-blur-lg rounded-xl hover:bg-white/20 transition"
          >
            <AiOutlineLogin className="text-white text-4xl mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-white">Login</h2>
            <p className="text-gray-300 mt-2">Citizen, Employee, or Admin</p>
          </div>

        </div>

      </div>
    </main>
  );
}
