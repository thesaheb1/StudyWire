import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const CtaBtn = ({ color, text, arrow, hoverOnShadow }) => {
  return (
    <button
      className={`py-2 flex justify-center items-center px-4 md:py-3 md:px-6 min-w-min rounded-md text-richblack-900 text-sm md:text-lg font-semibold hover:scale-90 ${color} ${hoverOnShadow} transition-all duration-200`}
    >
      {text} {arrow && <FaArrowRight className="ml-4 animate-left-right" />}
    </button>
  );
};

export default CtaBtn;
