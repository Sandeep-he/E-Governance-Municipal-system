import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

export default function CitizenHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col animate-pageFade">
      <Navbar />

      <main
        className="flex-1 bg-cover bg-center text-white pt-28"
        style={{ backgroundImage: "url('/mahanagar.png')" }}
      >
        {/* Dark overlay now covers entire content cleanly */}
        <div className="w-full min-h-full bg-black/60 py-14">
          <div className="max-w-6xl mx-auto px-6">

            <h1 className="text-4xl font-bold mb-6 animate-fadeUp">
              Welcome, Citizen
            </h1>

            <p className="text-gray-200 animate-fadeUp delay-150">
              Access municipal services & track complaints.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

              <div
                onClick={() => navigate("/complaint")}
                className="p-6 bg-white/10 border border-white/20 rounded-lg cursor-pointer 
                           backdrop-blur-md hover:bg-white/20 transition animate-fadeUp delay-200"
              >
                <h3 className="text-lg font-semibold">Register a Complaint</h3>
                <p className="text-gray-300 mt-2">Submit a civic issue.</p>
              </div>

              <div
                onClick={() => navigate("/usercomplaints")}
                className="p-6 bg-white/10 border border-white/20 rounded-lg cursor-pointer 
                           backdrop-blur-md hover:bg-white/20 transition animate-fadeUp delay-300"
              >
                <h3 className="text-lg font-semibold">My Complaints</h3>
                <p className="text-gray-300 mt-2">Track your complaints.</p>
              </div>

              <div
                onClick={() => navigate("/contact")}
                className="p-6 bg-white/10 border border-white/20 rounded-lg cursor-pointer 
                           backdrop-blur-md hover:bg-white/20 transition animate-fadeUp delay-400"
              >
                <h3 className="text-lg font-semibold">Help & Support</h3>
                <p className="text-gray-300 mt-2">Contact assistance.</p>
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* ONLY ONE FOOTER */}
      <Footer />
    </div>
  );
}
