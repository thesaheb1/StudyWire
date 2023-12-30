import React from "react";
import FormTemplate from "../../components/core/login_&_signup/FormTemplate";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Login() {
  const { loading } = useSelector((state) => state.auth);
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
    <div className="w-screen min-h-[calc(100vh-4rem)] pt-[4rem]">
      <FormTemplate
        title="Welcome Back"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        formtype="login"
      />
      d
    </div>
  );
}

export default Login;
