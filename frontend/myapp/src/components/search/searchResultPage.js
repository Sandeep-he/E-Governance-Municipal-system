import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../home/navbar";
import Footer from "../home/footer";
import axios from "axios";

export default function SearchResultPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Complaint ID passed from home search box
    const complaintId = location.state?.id;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(false);

    useEffect(() => {
        if (!complaintId) {
            setLoading(false);
            setFound(false);
            return;
        }

        axios
            .get(`/complaint/search/${complaintId}`)
            .then((res) => {
                if (res.data?.value?.length > 0) {
                    setData(res.data.value);
                    setFound(true);
                } else {
                    setFound(false);
                }
                setLoading(false);
            })
            .catch(() => {
                setFound(false);
                setLoading(false);
            });
    }, [complaintId]);

    return (
        <div>
            <Navbar />

            <div className="w-full min-h-screen bg-[#171717] pt-28 pb-10 flex justify-center">
                <div className="w-3/5 bg-[#1f1f1f] rounded-xl border border-white/20 p-8 text-white shadow-xl">

                    <h1 className="text-3xl font-semibold text-center border-b border-white/20 pb-4">
                        Complaint Search Results
                    </h1>

                    {loading && (
                        <p className="text-center mt-10 text-gray-300 text-xl">Loading...</p>
                    )}

                    {!loading && found && (
                        <div className="mt-10 flex flex-col gap-6">
                            {data.map((item) => (
                                <div
                                    key={item.complaint_number}
                                    className="bg-[#2b2b2b] p-5 rounded-lg border border-white/10 shadow-md"
                                >
                                    <p><b>Complaint Number:</b> {item.complaint_number}</p>
                                    <p><b>Status:</b> {item.complaint_status}</p>
                                    <p><b>Date:</b> {item.registration_date.slice(0, 10)}</p>
                                    <p><b>Description:</b> {item.complaint_description}</p>
                                    <p><b>Location:</b> {item.complaint_address}</p>

                                    <button
                                        onClick={() =>
                                            navigate("/viewcomplaint", { state: [item] })
                                        }
                                        className="mt-3 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && !found && (
                        <p className="text-center mt-16 text-2xl text-red-400 font-semibold">
                            ❌ No Result Found
                        </p>
                    )}

                </div>
            </div>

            <Footer />
        </div>
    );
}
