import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { updatedp } from "../../../../services/operations/profileOperation";

const UpdateDP = () => {
  const { credentialData, token } = useSelector((state) => state.auth);
  const [uploadImage, setUploadImage] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      setUploadImage(img);
      previewFile(img);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadhandler = () => {
    const formData = new FormData();
    formData.append("image", uploadImage);
    console.log("Image FormData.........: ", formData);
    dispatch(updatedp(formData, token, credentialData));
  };

  useEffect(() => {
    if (uploadImage) {
      previewFile(uploadImage);
    }
  }, [uploadImage]);

  return (
    <div className="flex justify-evenly md:justify-start items-center gap-x-4 sm:gap-x-8 p-4 sm:p-8 border-[1px] border-richblack-700 bg-richblack-800 rounded-md">
      <img
        src={previewSource || credentialData?.image}
        className="w-[50px] sm:w-[75px] aspect-square rounded-full"
        alt={credentialData?.firstName}
      />
      <div className="flex flex-col justify-center items-start gap-y-2">
        <p className="sm:text-xl font-medium text-richblack-5  pb-2">
          Change profile picture
        </p>
        <div className="flex gap-x-4">
          <div>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleOnChange}
              accept="image/png, image/gif, image/jpeg"
            />
            <label
              className="w-fit text-richblack-50 bg-richblack-500 hover:text-richblack-5 transition-all duration-200 cursor-pointer inline-block sm:text-lg px-2 py-1 sm:px-4 sm:py-2 rounded-md font-medium"
              htmlFor="file"
            >
              <span>select</span>
            </label>
          </div>
          <button
            onClick={uploadhandler}
            className="text-black w-fit flex justify-center items-center gap-x-2 sm:text-lg px-2 py-1 sm:px-4 sm:py-2 rounded-md font-medium bg-yellow-50"
          >
            Upload <FiUpload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateDP;
