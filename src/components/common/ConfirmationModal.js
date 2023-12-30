import React from "react";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed w-screen min-h-screen inset-0 z-[999999999999] backdrop-blur-sm flex justify-center items-center">
      <div
        ref={modalData?.refvalue}
        className="p-4 bg-richblack-800 m-4 border-2 border-richblack-600 rounded-md flex flex-col justify-center items-start"
      >
        <p className="pointer-events-none text-richblack-5 text-3xl">
          {modalData?.text1}
        </p>
        <p className="pointer-events-none text-richblack-200 text-lg py-2">
          {modalData?.text2}
        </p>

        <div className="pointer-events-none flex justify-start gap-x-4 items-center pt-4">
          <button
            onClick={modalData?.btn1Handler}
            className="pointer-events-auto text-black text-lg px-4 py-2 rounded-md font-bold bg-yellow-50"
          >
            {modalData?.btn1}
          </button>
          <button
            onClick={modalData?.btn2Handler}
            className="pointer-events-auto text-black text-lg px-4 py-2 rounded-md font-bold bg-richblack-300"
          >
            {modalData?.btn2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
