import React, { useState } from "react";
import { login } from "../../../services/operations/authOperation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { useForm } from "react-hook-form";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, SetisPasswordVisible] = useState(true);
  const {register, handleSubmit, formState:{errors}} = useForm();

  function submitHandler(data) {
    dispatch(login(data, navigate))
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label htmlFor="email" className="w-full">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Email Address <sup className="text-pink-300">*</sup>
        </p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          {...register("email", {required:{value:true, message:"Email is required"}})}
          className="bg-[rgba(255,255,255,0.2)] border-b-2 border-gray-400 rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 text-gray-200 w-full p-[12px]"
        />
        {errors?.email && <span className="text-pink-300">{errors?.email?.message}</span>}
      </label>
      <label htmlFor="password" className="w-full relative">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Password <sup className="text-pink-300">*</sup>
        </p>
        <input
          type={isPasswordVisible ? "password" : "text"}
          name="password"
          id="password"
          placeholder="Enter your password"
          {...register("password", {required:{value:true, message:"Password is required"}})}
          className="bg-[rgba(255,255,255,0.2)] border-b-2 rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 border-gray-400 text-gray-200 w-full p-[12px]"
        />
        {errors?.password && <span className="text-pink-300">{errors?.password?.message}</span>}
        <div className="flex justify-between items-center">
          <Link to="/signup">
            <p className="text-sm text-right text-blue-100 cursor-pointer">
              or create an account
            </p>
          </Link>
          <Link to="/forgot-password">
            <p className="text-sm text-right text-blue-100 cursor-pointer">
              Forgot Password
            </p>
          </Link>
        </div>
        <div
          className="cursor-pointer absolute top-10 right-2 text-2xl text-richblack-300"
          onClick={() => {
            SetisPasswordVisible(!isPasswordVisible);
          }}
        >
          {isPasswordVisible ? <BiShow /> : <BiHide />}
        </div>
      </label>

      <button
        type="submit"
        className="bg-[#12D8FA] rounded-[8px] font-bold text-black p-[8px] mt-4"
      >
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
