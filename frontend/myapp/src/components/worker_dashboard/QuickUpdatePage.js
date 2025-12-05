// frontend/src/components/employee_dashboard/QuickUpdatePage.js

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../home/navbar";
import Sidebar from "../home/Sidebar";
import { UserContext } from "../context";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function QuickUpdatePage() {
  const { value } = useContext(UserContext);
  const navigate = useNavigate();

  // safe access — value might be undefined at first render
  const empId = value?.user_id;

  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [comment, setComment] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    // guard: only employees should access this page
    if (!value?.exists || value?.type !== "employee") {
      navigate("/employeelogin");
      return;
    }

    // fetch assigned complaints when empId is available
    if (empId) {
      fetchAssignedComplaints();
    }
    // include dependencies used inside effect to satisfy eslint
  }, [empId, value?.exists, value?.type, navigate]);

  // ⭐ Fetch complaints assigned to this employee
  const fetchAssignedComplaints = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/complaint/getAssigned/${empId}`);
      setComplaints(res.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Error loading complaints");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Update complaint status
  const updateStatus = async (complaintId, newStatus) => {
    try {
      const res = await axios.post("/complaint/updateStatus", {
        id: complaintId,
        status: newStatus,
        empId,
      });

      if (res.status === 200) {
        toast.success("Status Updated!");
        fetchAssignedComplaints();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  // ⭐ Add comment
  const submitComment = async () => {
    if (!selectedComplaint) return toast.error("Select a complaint first");
    if (!comment.trim()) return toast.error("Comment cannot be empty!");

    try {
      const res = await axios.post("/complaint/addcomment", {
        id: selectedComplaint,
        comment,
        empId,
        commentTime: new Date().toISOString(),
      });

      if (res.status === 200) {
        toast.success("Comment Added");
        setComment("");
      } else {
        toast.error("Failed to add comment");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error adding comment");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <Navbar />
      <Sidebar role="employee" />

      <Toaster position="top-right" />

      <div className="md:ml-64 pt-24 px-6 pb-10 animate-fadeIn flex-1">
        <h1 className="text-3xl font-bold mb-6">Quick Update</h1>

        {/* LOADING */}
        {loading && <p className="text-gray-300">Loading complaints...</p>}

        {/* Complaints List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaints.map((c) => (
            <div
              key={c.complaint_number}
              className="bg-white/5 border border-white/10 rounded-lg p-5 shadow-lg hover:bg-white/10 transition"
            >
              <h2 className="text-lg font-semibold">{c.complaint_type}</h2>
              <p className="text-gray-300 text-sm mt-2">{c.complaint_description}</p>

              <div className="flex items-center gap-2 mt-3 text-sm">
                <span className="px-2 py-1 bg-blue-600 rounded text-white text-xs">
                  CUId: {c.complaint_number}
                </span>

                <span className="px-2 py-1 bg-yellow-600 rounded text-white text-xs">
                  Priority: {c.priority || "Low"}
                </span>

                <span className="px-2 py-1 bg-green-700 rounded text-white text-xs">
                  Status: {c.complaint_status}
                </span>
              </div>

              {/* STATUS BUTTONS */}
              <div className="flex flex-row gap-3 mt-4">
                <button
                  onClick={() => updateStatus(c.complaint_number, "Working")}
                  className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition text-sm"
                >
                  Mark Working
                </button>

                <button
                  onClick={() => updateStatus(c.complaint_number, "Resolved")}
                  className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition text-sm"
                >
                  Mark Resolved
                </button>
              </div>

              {/* COMMENT BOX */}
              <div className="mt-4">
                <textarea
                  className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-sm text-white"
                  placeholder="Add a comment..."
                  value={selectedComplaint === c.complaint_number ? comment : ""}
                  onChange={(e) => {
                    setSelectedComplaint(c.complaint_number);
                    setComment(e.target.value);
                  }}
                ></textarea>

                <button
                  onClick={submitComment}
                  className="mt-2 w-full py-2 rounded bg-purple-600 hover:bg-purple-700 transition"
                >
                  Submit Comment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Complaints */}
        {!loading && complaints.length === 0 && (
          <p className="text-center text-gray-400 mt-10 text-lg">
            No complaints assigned to you.
          </p>
        )}
      </div>
    </div>
  );
}
