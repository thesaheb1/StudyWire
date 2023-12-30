import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiShow, BiHide } from "react-icons/bi";
import { BsShieldLock } from "react-icons/bs";
import { changepassword } from "../../../../services/operations/authOperation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [isPasswordVisible, SetisPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, SetisConfirmPasswordVisible] =
    useState(true);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitHandler = (data) => {
    if (data.currentPassword === data.newPassword) {
      toast.error("Old and new password must not be same");
      return;
    }

    dispatch(changepassword(data, token));
  };


  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        currentPassword: "",
        newPassword: ""
      });
    }
  }, [reset,isSubmitSuccessful]);



  return (
    <div className="flex justify-center items-center p-4 sm:p-8 border-[1px] border-richblack-700 bg-richblack-800 rounded-md my-8">
      <form onSubmit={handleSubmit(submitHandler)} className="w-full">
        <div
          className="flex flex-col lg:flex-row justify-between items-center gap-8"
        >
          <label htmlFor="currentPassword" className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Current Password <sup className="text-pink-600">*</sup>
            </p>
            <input
              type={isPasswordVisible ? "password" : "text"}
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter Current Password"
              {...register("currentPassword", {
                required: {
                  value: true,
                  message: "Current Password is required",
                },
              })}
              className="bg-richblack-700 placeholder:text-gray-400 placeholder:text-opacity-80 border-b-[1px] border-richblack-200 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
            {errors?.currentPassword && (
              <span className="text-pink-300">{errors?.currentPassword?.message}</span>
            )}
            <div
              className="cursor-pointer absolute top-10 right-2 text-2xl text-richblack-300"
              onClick={() => {
                SetisPasswordVisible(!isPasswordVisible);
              }}
            >
              {isPasswordVisible ? <BiShow /> : <BiHide />}
            </div>
          </label>
          <label htmlFor="newPassword" className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Change Password <sup className="text-pink-600">*</sup>
            </p>
            <input
              type={isConfirmPasswordVisible ? "password" : "text"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "New Password is required",
                },
              })}
              className="bg-richblack-700 placeholder:text-gray-400 placeholder:text-opacity-80 border-b-[1px] border-richblack-200 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
            {errors?.newPassword && (
              <span className="text-pink-300">
                {errors?.newPassword?.message}
              </span>
            )}
            <div
              className="cursor-pointer absolute top-10 right-2 text-2xl text-richblack-300"
              onClick={() => {
                SetisConfirmPasswordVisible(!isConfirmPasswordVisible);
              }}
            >
              {isConfirmPasswordVisible ? <BiShow /> : <BiHide />}
            </div>
          </label>
        </div>
        <div className="w-full flex justify-end items-center flex-wrap-reverse gap-4 mt-4">
          <Link
            to="/dashboard/my-profile"
            className="text-richblack-100 w-fit flex justify-center items-center gap-x-2 sm:text-lg px-2 py-1 sm:px-4 sm:py-2 rounded-md font-medium bg-richblack-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="text-black w-fit flex justify-center items-center gap-x-2 sm:text-lg px-2 py-1 sm:px-4 sm:py-2 rounded-md font-medium bg-yellow-50"
          >
            Change Password <BsShieldLock />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
