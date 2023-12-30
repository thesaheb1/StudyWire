import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendotp, signup } from "../../services/operations/authOperation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState();
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // navigate to signup page if data is empty
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const finalData = {
      ...signupData,
      otp,
    };

    dispatch(signup(finalData, navigate));
  };

  return loading ? (
    <div className="w-screen min-h-[calc(100vh-4rem)] flex justify-center items-center pt-[4rem]">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center pt-[4rem]">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          Verify Email
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
          A verification code has been sent on{" "}
          <span className="text-blue-100">
            {signupData?.email.slice(0, 2) +
              "*******" +
              signupData?.email
                .split("@")[0]
                .slice(
                  signupData?.email.split("@")[0].length - 2,
                  signupData?.email.split("@")[0].length
                ) +
              "@" +
              signupData?.email.split("@")[1]}
          </span>
          . <br /> Enter the code below
        </p>
        <form onSubmit={submitHandler}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />
          <button
            type="submit"
            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
          >
            Verify Email
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/signup">
            <p className="text-richblack-5 flex items-center gap-x-2">
              <BiArrowBack /> Back To Signup
            </p>
          </Link>
          <button
            className="flex items-center text-blue-100 gap-x-2"
            onClick={() => dispatch(sendotp(signupData?.email, navigate))}
          >
            <RxCountdownTimer />
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
