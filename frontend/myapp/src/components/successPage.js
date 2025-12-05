import React from "react";
import Navbar from "./home/navbar";
import Footer from "./home/footer";
import SuccessMsg from "./successfullMsg";
import BackButton from "./common/BackButton";

export default function SuccessMsgPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* CONTENT WRAPPER */}
      <div className="pt-24 pb-10 w-11/12 mx-auto">

        {/* Back Button */}
        <div className="mb-4">
          <BackButton />
        </div>

        {/* Success Message Component */}
        <SuccessMsg />
      </div>

      <Footer />
    </div>
  );
}
