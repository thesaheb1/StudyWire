import { toast } from "react-hot-toast";
import {
  setCredentialData,
  setSignupData,
  setLoading,
  setToken,
} from "../../redux/feature/authSlice";
import { apiConnector } from "../apiConnector";
import { auth } from "../Apis";

//***************************************************************************//
//                              Auth Operation                               //
//***************************************************************************//

// signup
export const signup = (finalData, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", auth.signup_api, finalData);
      if (!response.data.status) {
        throw new Error(response);
      }
      navigate("/login");
      console.log("signup : ", response?.data);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error in signup : ", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
  };
};

// send otp
export const sendotp = (email, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", auth.sendotp_api, { email });
      if (!response?.data?.status) {
        throw new Error(response);
      }
      navigate("/verify-email");
      console.log("otp : ", response?.data);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error in sendingOtp : ", error?.response);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
  };
};

// Login
export const login = (FormData, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", auth.login_api, FormData);
      if (!response.data.status) {
        throw new Error(response);
      }
      dispatch(setCredentialData(response?.data?.data));
      dispatch(setToken(response?.data?.token));
      localStorage.setItem("token", response?.data?.token);
      navigate("/dashboard/my-profile");
      console.log("login : ", response?.data);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error in login : ", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
  };
};

// Forgot password token generator
export const forgotpassword = (email, setEmailSent) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        auth.generate_reset_password_token_api,
        { email }
      );
      if (!response?.data?.status) {
        throw new Error(response);
      }
      console.log("passGen.. : ", response?.data);
      toast.success(response?.data?.message);
      setEmailSent(true);
    } catch (error) {
      console.log("error in generating token : ", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
  };
};

// Reset password
export const resetpassword = (finalData, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        auth.reset_password_api,
        finalData
      );
      if (!response?.data?.status) {
        throw new Error(response);
      }
      navigate("/login");
      console.log("pass-reset.. : ", response?.data);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error in resetting password : ", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
  };
};

// Change passsword
export const changepassword = (data, token) => {
  return async () => {
    const tid = toast.loading("Updating Password...");
    try {
      const response = await apiConnector(
        "POST",
        auth.change_password_api,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.status) {
        throw new Error(response);
      }
      console.log("password changed : ", response?.data);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error in Updating password : ", error?.response);
      toast.error(error?.response?.data?.message);
    }

    toast.dismiss(tid);
  };
};

//***************************************************************************//
//                              Logout Operation                             //
//***************************************************************************//
export const logout = (navigate) => {
  return async (dispatch) => {
    dispatch(setCredentialData(null));
    dispatch(setSignupData(null));
    dispatch(setToken(null));
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout Success");
  };
};
