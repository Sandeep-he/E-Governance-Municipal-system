import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../home/navbar";
import Sidebar from "../home/Sidebar";
import { UserContext } from "../context";
import toast, { Toaster } from "react-hot-toast";

export default function AssignedComplaintsPage() {
  const { value } = useContext(UserContext);
  const empId = value.user_id;

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ⭐ Fetch complaints assigned to this employee
  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`/complaint/getAssigned/${empId}`);
      setComplaints(res.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load assigned complaints");
    }
  };

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <Navbar />
      <Sidebar role="employee" />

      <Toaster position="top-right" />

      <div className="md:ml-64 pt-24 px-6 pb-10 animate-fadeIn flex-1">
        <h1 className="text-3xl font-bold mb-6">Assigned Complaints</h1>

        {loading && <p className="text-gray-400">Loading...</p>}

        {/* GRID LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!loading &&
            complaints.map((c) => (
              <div
                key={c.complaint_number}
                onClick={() => openModal(c)}
                className="p-6 bg-white/5 border border-white/10 rounded-lg shadow-lg hover:bg-white/10 cursor-pointer transition"
              >
                <h2 className="text-xl font-semibold">{c.complaint_type}</h2>
                <p className="text-gray-300 text-sm mt-2">
                  {c.complaint_description}
                </p>

                <div className="flex items-center gap-2 mt-3 text-sm">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                    CUId: {c.complaint_number}
                  </span>
                  <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">
                    Priority: {c.priority ?? "Low"}
                  </span>
                  <span className="px-2 py-1 bg-green-700 text-white text-xs rounded">
                    Status: {c.complaint_status}
                  </span>
                </div>

                <p className="text-gray-400 text-xs mt-3">
                  Date: {c.registration_date?.slice(0, 10)}
                </p>
              </div>
            ))}
        </div>

        {!loading && complaints.length === 0 && (
          <p className="text-center text-gray-400 text-lg mt-10">
            No complaints assigned.
          </p>
        )}
      </div>

      {/* ⭐ MODAL FOR COMPLAINT DETAILS */}
      {modalOpen && selectedComplaint && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999]"
          onClick={closeModal}
        >
          <div
            className="bg-[#1a1a1a] w-[90%] md:w-[600px] p-6 rounded-xl shadow-xl text-white animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">
              Complaint Details (CUId: {selectedComplaint.complaint_number})
            </h2>

            <p className="text-gray-400"><b>Type:</b> {selectedComplaint.complaint_type}</p>
            <p className="text-gray-400"><b>Description:</b> {selectedComplaint.complaint_description}</p>
            <p className="text-gray-400"><b>Address:</b> {selectedComplaint.complaint_address}</p>
            <p className="text-gray-400"><b>Status:</b> {selectedComplaint.complaint_status}</p>

            <p className="text-gray-400 mt-2">
              <b>Registered:</b> {selectedComplaint.registration_date?.slice(0, 10)}
            </p>

            {/* Complaint Image */}
            {selectedComplaint.complaint_photo && (
              <img
                src={selectedComplaint.complaint_photo}
                alt="Complaint"
                className="mt-4 rounded-lg border border-white/10"
              />
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
