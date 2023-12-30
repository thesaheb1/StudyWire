import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { sendotp } from "../../../services/operations/authOperation";
import { setSignupData } from "../../../redux/feature/authSlice";
import { useForm } from "react-hook-form";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, SetisPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, SetisConfirmPasswordVisible] =
    useState(true);
  const [accountType, SetaccountType] = useState("Student");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    if (data?.password !== data?.confirmPassword) {
      toast.error("Passwords must be same");
    } else {
      const { email } = data;
      const finalData = {
        ...data,
        accountType,
      };
      dispatch(setSignupData(finalData));
      dispatch(sendotp(email, navigate));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <div className="p-1 bg-richblack-700 w-fit rounded-full flex justify-between items-center gap-2">
        <div
          onClick={() => SetaccountType("Student")}
          className={`text-md text-richblack-5 cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ease-linear ${
            accountType === "Student"
              ? "bg-richblack-800"
              : "bg-transparent text-richblack-5"
          }`}
        >
          Student
        </div>
        <div
          onClick={() => SetaccountType("Instructor")}
          className={`text-md text-richblack-5 cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ease-linear ${
            accountType === "Instructor"
              ? "bg-richblack-800"
              : "bg-transparent text-richblack-5"
          }`}
        >
          Instructor
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <label htmlFor="firstName" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            First Name <sup className="text-pink-600">*</sup>
          </p>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            {...register("firstName", {required:{value:true, message:"FirstName is required"}, maxLength:{value:35, message:"Length is Exceeded"}})}
            className="bg-[rgba(255,255,255,0.2)] border-b-2 border-gray-400  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
          />
          {errors?.firstName && <span className="text-pink-300">{errors?.firstName?.message}</span>}
        </label>
        <label htmlFor="lastName" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Last Name
          </p>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            {...register("lastName", {maxLength:{value:35, message:"Length is Exceeded"}})}
            className="bg-[rgba(255,255,255,0.2)] border-b-2 border-gray-400 placeholder:text-gray-400 placeholder:text-opacity-80  rounded-[0.5rem] text-richblack-5 w-full  p-[12px]"
          />
          {errors?.lastName && <span className="text-pink-300">{errors?.lastName?.message}</span>}
        </label>
      </div>
      <div>
        <label htmlFor="email" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address <sup className="text-pink-600">*</sup>
          </p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            {...register("email", {required:{value:true, message:"Email is required"}})}
            className="bg-[rgba(255,255,255,0.2)] placeholder:text-gray-400 placeholder:text-opacity-80 border-b-2 border-gray-400   rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
          {errors?.email && <span className="text-pink-300">{errors?.email?.message}</span>}
        </label>
      </div>
      <div htmlFor="password" className="flex flex-col md:flex-row justify-between items-center gap-2">
        <label className="w-full relative">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Create Password <sup className="text-pink-600">*</sup>
          </p>
          <input
            type={isPasswordVisible ? "password" : "text"}
            name="password"
            id="password"
            placeholder="Enter Password"
            {...register("password", {required:{value:true, message:"Password is required"}})}
            className="bg-[rgba(255,255,255,0.2)] placeholder:text-gray-400 placeholder:text-opacity-80 border-b-2 border-gray-400  rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
          {errors?.password && <span className="text-pink-300">{errors?.password?.message}</span>}
          <div
            className="cursor-pointer absolute top-10 right-2 text-2xl text-richblack-300"
            onClick={() => {
              SetisPasswordVisible(!isPasswordVisible);
            }}
          >
            {isPasswordVisible ? <BiShow /> : <BiHide />}
          </div>
        </label>
        <label htmlFor="confirmPassword" className="w-full relative">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Confirm Password <sup className="text-pink-600">*</sup>
          </p>
          <input
            type={isConfirmPasswordVisible ? "password" : "text"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            {...register("confirmPassword", {required:{value:true, message:"ConfirmPassword is required"}})}
            className="bg-[rgba(255,255,255,0.2)] placeholder:text-gray-400 placeholder:text-opacity-80 border-b-2 border-gray-400 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
          {errors?.confirmPassword && <span className="text-pink-300">{errors?.confirmPassword?.message}</span>}
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
      <button type="submit" className="bg-yellow-50 rounded-[8px]  text-black font-bold p-[8px] mt-4">
        Create Account
      </button>
    </form>
  );
}

export default SignupForm;
