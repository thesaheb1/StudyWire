import React from "react";

const AuthBtn = ({ color, text }) => {

  return color ? (
    <button
      className="py-1 px-2 md:py-2 md:px-4 text-sm  md:text-lg rounded-lg border-b-2 border-[#12D8FA] hover:shadow-[0_8px_20px_-3px_#12D8FA] transition-all duration-200"
    >
      {text}
    </button>
  ) : (
    <button
      className="py-1 px-2 md:py-2 md:px-4 text-sm md:text-lg rounded-lg border-b-2 border-[#FFD60A] hover:shadow-[0_8px_20px_-3px_#FFD60A] transition-all duration-200"
    >
      {text}
    </button>
  );
};

export default AuthBtn;
