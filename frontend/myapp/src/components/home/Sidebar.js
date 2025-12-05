// src/components/home/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdAssignment,
  MdManageAccounts,
  MdPeople,
  MdLogout,
} from "react-icons/md";

export default function Sidebar({ role = "citizen", onLogout }) {
  // role: "admin" | "employee" | "citizen"
  return (
    <aside className="w-64 fixed inset-y-0 left-0 z-20 bg-[#0b1220] border-r border-r-[#1f2937] text-white hidden md:flex flex-col">
      <div className="px-6 py-6 flex items-center gap-3 border-b border-b-[#111827]/30">
        <img src="/logo.png" alt="logo" className="h-10 w-10 rounded" />
        <div>
          <h2 className="font-semibold text-lg">My City</h2>
          <span className="text-xs text-gray-400">Municipal Portal</span>
        </div>
      </div>

      <nav className="flex-1 overflow-auto px-2 py-4 space-y-1">
        <NavLink
          to={ role === "admin" ? "/admindash" : role === "employee" ? "/empdash" : "/" }
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/6 transition ${
              isActive ? "bg-white/6" : ""
            }`
          }
        >
          <MdDashboard className="text-xl" />
          <span>Dashboard</span>
        </NavLink>

        {role === "admin" && (
          <>
            <NavLink
              to="/admindash"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/6 transition ${
                  isActive ? "bg-white/6" : ""
                }`
              }
            >
              <MdAssignment className="text-xl" />
              <span>Task Assign</span>
            </NavLink>

            <NavLink
              to="/manageemployees"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/6 transition ${
                  isActive ? "bg-white/6" : ""
                }`
              }
            >
              <MdManageAccounts className="text-xl" />
              <span>Manage Employees</span>
            </NavLink>
          </>
        )}

        {role === "employee" && (
          <>
            <NavLink
              to="/empdash"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/6 transition ${
                  isActive ? "bg-white/6" : ""
                }`
              }
            >
              <MdAssignment className="text-xl" />
              <span>Assigned Complaints</span>
            </NavLink>

            <NavLink
              to="/empupdate"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/6 transition ${
                  isActive ? "bg-white/6" : ""
                }`
              }
            >
              <MdPeople className="text-xl" />
              <span>Quick Update</span>
            </NavLink>
          </>
        )}

        {role === "citizen" && (
          <>
            <NavLink
              to="/complaint"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/6 transition ${
                  isActive ? "bg-white/6" : ""
                }`
              }
            >
              <MdAssignment className="text-xl" />
              <span>Register Complaint</span>
            </NavLink>

            <NavLink
              to="/usercomplaints"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/6 transition ${
                  isActive ? "bg-white/6" : ""
                }`
              }
            >
              <MdPeople className="text-xl" />
              <span>My Complaints</span>
            </NavLink>
          </>
        )}
      </nav>

      <div className="px-4 py-4 border-t border-t-[#111827]/30">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-red-600/85 hover:bg-red-600 transition"
        >
          <MdLogout />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
