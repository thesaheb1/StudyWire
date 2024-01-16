import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetpassword } from "../../services/operations/authOperation";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../../components/common/Loader";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const finalData = {
      ...formData,
      token,
    };
    dispatch(resetpassword(finalData, navigate));
  };

  return loading ? (
    <Loader/>
  ) : (
    <div className="grid min-h-[calc(100vh)] place-items-center pt-[4rem]">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          Choose new password
        </h1>
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
          Almost done. Enter your new password and you're all set.
        </p>
        <form onSubmit={submitHandler}>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="bg-[rgba(255,255,255,0.2)] placeholder:text-gray-400 placeholder:text-opacity-80 border-b-2 border-gray-400  rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative mt-3 block">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="bg-[rgba(255,255,255,0.2)] placeholder:text-gray-400 placeholder:text-opacity-80 border-b-2 border-gray-400  rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/login">
            <p className="flex items-center gap-x-2 text-richblack-5">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
