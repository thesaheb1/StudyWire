import { course } from "../Apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

//***************************************************************************//
//                              Course Operation                             //
//***************************************************************************//

// fetching courseCategories
export const fetchAllCoursecategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", course.get_all_categories_api);
    if (!response?.data?.status) {
      throw new Error(response);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("error in fetchAllCoursecategories : ", error);
    toast.error(error?.response?.data?.message);
  }
  return result;
};

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", course.create_course_review_api, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success("We got your review");
  } catch (error) {
    console.log("error in creating review : ", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId)
}

// create course
export const createCourse = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    console.log("data hrere : ", data);
    const response = await apiConnector(
      "POST",
      course.create_courses_api,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success("Course Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// create section
export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    console.log("data hrere : ", data);
    console.log("link hrere : ", course.create_section_api);
    const response = await apiConnector(
      "POST",
      course.create_section_api,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success("Section Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error?.response);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// update course
export const updateCourse = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", course.update_courses_api, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// fetchInstructorCourses
export const fetchInstructorCourses = async (token) => {
  let result = null;
  try {
    const response = await apiConnector("GET", course.fetch_instructor_courses_api, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.status) {
      throw new Error(response);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE FETCHING API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  return result;
};

// fetch Course Details
export const fetchCourseDetails = async (data) => {
  let result = null;
  try {
    const response = await apiConnector("POST", course.get_course_details_api, data);
    if (!response?.data?.status) {
      throw new Error(response);
    }
    result = response?.data;
  } catch (error) {
    console.log("COURSE FETCHING API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  return result;
};

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = false;
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", course.update_course_progress_api, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.status) {
      throw new Error(response)
    }
    toast.success("Lecture Completed")

    result = true;
  } catch (error) {
    console.log("COURSE PROGRESS API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId)

  return result;
}

// update course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", course.delete_courses_api, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success("Course Deleted Successfully");
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
};

// create sub-section
export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    console.log("data hrere : ", data);
    console.log("link hrere : ", course.create_sub_section_api);
    const response = await apiConnector(
      "POST",
      course.create_sub_section_api,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success("SubSection Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE Sub SECTION API ERROR............", error?.response);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// update section
export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    console.log("data hrere : ", data);
    console.log("link hrere : ", course.update_section_api);
    const response = await apiConnector(
      "PUT",
      course.update_section_api,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success("Section Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error?.response);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// update section
export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    console.log("data hrere : ", data);
    console.log("link hrere : ", course.delete_section_api);
    const response = await apiConnector(
      "DELETE",
      course.delete_section_api,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.status) {
      throw new Error(response);
    }

    toast.success("Section Deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error?.response);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// update sub section
export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    console.log("data hrere : ", data);
    console.log("link hrere : ", course.update_sub_section_api);
    const response = await apiConnector(
      "PUT",
      course.update_sub_section_api,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success("subSection Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SUB SECTION API ERROR............", error?.response);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// update sub section
export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    console.log("data hrere : ", data);
    console.log("link hrere : ", course.delete_sub_section_api);
    const response = await apiConnector(
      "DELETE",
      course.delete_sub_section_api,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.status) {
      throw new Error(response);
    }
    toast.success("subSection Deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SUB SECTION API ERROR............", error?.response);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};
