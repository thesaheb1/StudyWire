import React from "react";
import AuthTemplate from "../../components/core/login_&_signup/FormTemplate";
import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader";

function SignUp() {
  const { loading } = useSelector(state => state.auth);
  return loading ? (
    <Loader/>
  ) : (
    <div className="w-full min-h-[calc(100vh)] pt-[4rem]">
      <AuthTemplate
        title="Join the millions learning to code with StudyWire for free"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        formtype="signup"
      />
    </div>
  );
}

export default SignUp;
