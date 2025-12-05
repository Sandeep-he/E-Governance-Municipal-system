import React, { useContext, useEffect } from "react";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function EmployeeHome() {
  const { value, setValue } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!value.exists || value.type !== "employee") {
      navigate("/employeelogin");
    }
  }, [value, navigate]);

  const logout = () => {
    setValue({ exists: false });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white animate-pageFade">
      <Navbar />
      <Sidebar role="employee" onLogout={logout} />

      {/* MAIN CONTENT */}
      <div className="md:ml-64 pt-24 px-6 pb-10 flex-1">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-6 animate-fadeUp">
            Employee Dashboard
          </h1>

          {/* ACTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Assigned Complaints */}
            <div
              onClick={() => navigate("/emp/assigned")}
              className="p-6 bg-white/5 border border-white/10 rounded-lg 
                         animate-fadeUp delay-150 cursor-pointer
                         hover:bg-white/10 hover:scale-[1.02] transition-all duration-200"
            >
              <h2 className="text-xl font-semibold">Assigned Complaints</h2>
              <p className="text-gray-300 text-sm mt-2">
                View all complaints assigned to you.
              </p>
            </div>

            {/* Quick Update */}
            <div
              onClick={() => navigate("/emp/quickupdate")}
              className="p-6 bg-white/5 border border-white/10 rounded-lg 
                         animate-fadeUp delay-200 cursor-pointer
                         hover:bg-white/10 hover:scale-[1.02] transition-all duration-200"
            >
              <h2 className="text-xl font-semibold">Quick Update</h2>
              <p className="text-gray-300 text-sm mt-2">
                Update complaint status quickly.
              </p>
            </div>

          </div>

          {/* TODAY TASK BOX */}
          <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-lg animate-fadeUp delay-300">
            <p className="text-gray-300">Today's Tasks: No tasks pending.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
