import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { profile } from "../Apis";
import { setCredentialData, setLoading } from "../../redux/feature/authSlice";
import { logout } from "./authOperation";

//***************************************************************************//
//                             Profile Operation                             //
//***************************************************************************//

// getUserDetals
export const getUserDetails = (token, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", profile.get_user_details_api, null, {
        Authorization: `Bearer ${token}`
      });
      if (!response.data.status) {
        throw new Error(response);
      }
      dispatch(setCredentialData(response?.data?.data));
      navigate("/dashboard/my-profile");
      console.log("UserDetailsResponse : ", response)
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error in login : ", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
  };
};

// Update Display Picture
export const updatedp = (formData, token, CredentialData) => {
  return async (dispatch) => {
    const tid = toast.loading("Dp Updating...");
    try {
      const response = await apiConnector(
        "PUT",
        profile.update_dp_api,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.status) {
        throw new Error(response);
      }

      dispatch(
        setCredentialData({
          ...CredentialData,
          image: response?.data?.data?.image,
        })
      );

      console.log("updateDP.. : ", response?.data?.message);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error in Updating DP : ", error);
      toast.error(error?.response?.data?.message);
    }

    toast.dismiss(tid);
  };
};

// Update Profile
export const updateprofile = (data, token) => {
  return async (dispatch) => {
    const tid = toast.loading("profile updating...");
    try {
      const response = await apiConnector(
        "PUT",
        profile.update_profile_api,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response?.data?.status) {
        throw new Error(response);
      }

      dispatch(setCredentialData(response?.data?.data));
      console.log("profile updating : ", response);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error in Updating profile : ", error);
      toast.error(error?.response?.data?.message);
    }
    toast.dismiss(tid);
  };
};


// detete account
export const deleteuser = (token, navigate) => {
  return async (dispatch) => {
    const tid = toast.loading("Deleting User...");
    try {
      const response = await apiConnector(
        "DELETE",
        profile.delete_user_api,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.status) {
        throw new Error(response);
      }

      dispatch(logout(navigate));

      console.log("user deleted : ", response);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error in user deletion : ", error);
      toast.error(error?.response?.data?.message);
    }

    toast.dismiss(tid);
  };
};

export const getInstructorDashboardData = async (token) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", profile.get_instructor_dashboard_api, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success(response?.data?.message);
    console.log("response?.data?.message...", response?.data?.data);
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId)
  return result
}