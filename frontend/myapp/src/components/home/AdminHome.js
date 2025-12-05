import React, { useContext, useEffect } from "react";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const { value, setValue } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!value.exists || value.type !== "admin") {
      navigate("/adminlogin");
    }
  }, [value, navigate]);

  const logout = () => {
    setValue({ exists: false });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071124] text-white animate-pageFade">
      <Navbar />
      <Sidebar role="admin" onLogout={logout} />

      {/* MAIN CONTENT */}
      <div className="md:ml-64 pt-24 px-6 pb-10 flex-1">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-6 animate-fadeUp">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="p-6 bg-white/5 border border-white/10 rounded-lg animate-fadeUp delay-150">
              Task Assign
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-lg animate-fadeUp delay-200">
              Manage Employees
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-lg animate-fadeUp delay-300">
              System Reports
            </div>

          </div>

          <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-lg animate-fadeUp delay-400">
            <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
            <p className="text-gray-300">No recent activity.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
