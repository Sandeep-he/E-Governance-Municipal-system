import React, { useState, useEffect, useRef, useContext } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUser, FaUserTie, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import header_user from "../../../src/images/header_user.jpg";
import { UserContext } from "../context";
import { Buffer } from "buffer";

export default function Navbar() {
  const navigate = useNavigate();
  const { value, setValue } = useContext(UserContext);

  const [profileImage, setProfileImage] = useState(header_user);
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const dropdownRef = useRef();

  // ------------------------------
  // Role Badge
  // ------------------------------
  const getRoleBadge = () => {
    if (!value.exists) return null;

    const roles = {
      admin: { label: "Admin", color: "bg-red-600" },
      employee: { label: "Employee", color: "bg-blue-600" },
      user: { label: "Citizen", color: "bg-green-600" },
      corporator: { label: "Corporator", color: "bg-purple-600" },
    };

    const r = roles[value.type];
    if (!r) return null;

    return (
      <span
        className={`px-2 py-0.5 text-xs rounded-md text-white ${r.color} shadow-md`}
      >
        {r.label}
      </span>
    );
  };

  // ------------------------------
  // Update Profile Image
  // ------------------------------
  useEffect(() => {
    try {
      if (value.exists && value.profile_image) {
        setProfileImage(Buffer.from(value.profile_image).toString());
      }
    } catch (err) {
      console.log(err);
    }
  }, [value]);

  // ------------------------------
  // Dropdown Links Based on Role
  // ------------------------------
  let dropdownLinks = [];

  if (!value.exists) {
    dropdownLinks = [
      { name: "Login", link: "/loginchoice", icon: <FaUser /> },
      { name: "Employee Signup", link: "/workersignup", icon: <FaUserTie /> },
    ];
  } else if (value.type === "user") {
    dropdownLinks = [
      { name: "My Complaints", link: "/usercomplaints", icon: <FaUser /> },
      { name: "Logout", link: "/", logout: true },
    ];
  } else if (value.type === "employee") {
    dropdownLinks = [
      { name: "My Dashboard", link: "/empdash", icon: <FaUserTie /> },
      { name: "Logout", link: "/", logout: true },
    ];
  } else if (value.type === "admin") {
    dropdownLinks = [
      { name: "Admin Dashboard", link: "/admindash", icon: <FaShieldAlt /> },
      { name: "Logout", link: "/", logout: true },
    ];
  }

  // ------------------------------
  // Close dropdown on outside click
  // ------------------------------
  useEffect(() => {
    const closeDrop = (e) => {
      if (dropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", closeDrop);
    return () => document.removeEventListener("mousedown", closeDrop);
  }, [dropdown]);

  // ------------------------------
  // Main Links
  // ------------------------------
  const Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <div className="w-full fixed top-0 z-50 bg-[#0c0c0c]/80 backdrop-blur-xl border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-5 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="logo.png" className="h-10 w-10" alt="logo" />
          <h1 className="text-white text-xl font-[Lobster] drop-shadow-lg">
            My City My Pride
          </h1>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-10">
          {Links.map((item) => (
            <p
              key={item.name}
              onClick={() => navigate(item.link)}
              className="text-white text-lg hover:text-blue-400 transition cursor-pointer"
            >
              {item.name}
            </p>
          ))}
        </div>

        {/* USER DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdown((d) => !d)}
          >
            {getRoleBadge()}

            <img
              src={profileImage}
              className="h-10 w-10 rounded-full border border-white/20"
              alt="user"
            />

            {dropdown ? (
              <BiUpArrow className="text-white" />
            ) : (
              <BiDownArrow className="text-white" />
            )}
          </div>

          {/* DROPDOWN MENU */}
          {dropdown && (
            <div className="absolute right-0 mt-3 bg-[#1b1b1b] border border-white/10 rounded-lg shadow-2xl w-56 animate-slideDown">
              {dropdownLinks.map((d, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (d.logout) {
                      setValue({ exists: false });
                      setProfileImage(header_user);
                    }
                    navigate(d.link);
                    setDropdown(false);
                  }}
                  className="px-4 py-3 hover:bg-blue-600/40 cursor-pointer flex items-center gap-3 text-white transition"
                >
                  {d.icon}
                  {d.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden text-white text-3xl cursor-pointer" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <HiX /> : <HiMenuAlt3 />}
        </div>

      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden w-full bg-[#0c0c0c]/95 backdrop-blur-md py-4 px-6 animate-slideDown">
          {Links.map((item) => (
            <p
              key={item.name}
              onClick={() => {
                navigate(item.link);
                setMobileMenu(false);
              }}
              className="text-white text-lg py-3 border-b border-white/10"
            >
              {item.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
