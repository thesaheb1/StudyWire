import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotpassword } from "../../services/operations/authOperation";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);

  // useEffect(() => {

  //   return () => {
  //     dispatch(setEmailSent(null))
  //   };
  //     //eslint-disable-next-line
  // },[]);

  function submitHandler(event) {
    event.preventDefault();
    dispatch(forgotpassword(email, setEmailSent));
  }
  return loading ? (
    <div className="w-screen min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <div className="grid min-h-[calc(100vh-5rem)] place-items-center">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          {!emailSent ? "Reset your password" : "Check email"}
        </h1>
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
          {!emailSent ? (
            "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
          ) : (
            <>
              <span>We have sent the reset email to</span>{" "}
              <span className="text-blue-100">{email?.slice(0,2) +"*******"+ email?.split("@")[0].slice(email?.split("@")[0].length -2 ,email?.split("@")[0].length) +"@"+ email?.split("@")[1]}</span>
            </>
          )}
        </p>
        <form onSubmit={submitHandler}>
          {!emailSent && (
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="bg-[rgba(255,255,255,0.2)] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 border-b-2 border-gray-400 rounded-[0.5rem] text-gray-200 w-full p-[12px]"
              />
            </label>
          )}
          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            {!emailSent ? "Submit" : "Resend Email"}
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

export default ForgotPassword;
