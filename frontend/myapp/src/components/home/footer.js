import React from "react";

export default function Footer() {
  return (
    <footer
      className="
        w-full 
        bg-black/50 
        backdrop-blur-md 
        border-t border-white/10 
        py-10 
        flex-shrink-0
      "
    >
      <div className="max-w-6xl mx-auto text-center px-6">

        {/* Navigation Links */}
        <div className="flex justify-center gap-10 mb-4 flex-wrap">
          <p className="text-gray-300 hover:text-white cursor-pointer transition">
            Departments
          </p>
          <p className="text-gray-300 hover:text-white cursor-pointer transition">
            Contact Us
          </p>
          <p className="text-gray-300 hover:text-white cursor-pointer transition">
            About Us
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 my-4"></div>

        {/* Copyright */}
        <div className="text-gray-300 text-sm">
          <p>All rights reserved © {new Date().getFullYear()}</p>
          <p className="font-semibold tracking-wide mt-1">MyCityMyPride</p>
        </div>

      </div>
    </footer>
  );
}
