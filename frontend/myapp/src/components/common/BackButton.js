import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function BackButton({ color = "white" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-lg font-medium hover:text-orange-300 transition duration-150"
    >
      <BsFillArrowLeftCircleFill className={`text-2xl text-${color}`} />
      <span className={`text-${color}`}>Back</span>
    </button>
  );
}
