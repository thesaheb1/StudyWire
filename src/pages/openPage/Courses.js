import React, { useEffect } from "react";

import CourseCard from "../../components/core/course/CourseCard";
import CourseFilterOptions from "../../components/core/course/CourseFilterOptions";

import { course } from "../../services/Apis";
import { apiConnector } from "../../services/apiConnector";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData, setFilteredData, setLoading } from "../../redux/feature/courseSlice";
import ReviewSlider from "../../components/common/ReviewSlider";
import Loader from "../../components/common/Loader";

const Courses = () => {
  const { filteredData, loading } = useSelector(state => state.course)
  const dispatch = useDispatch();

  const getCourses = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", course.get_all_courses_api);
      if (!response?.data?.status) {
        throw new Error(response);
      }

      dispatch(setCourseData(response?.data?.data));
      dispatch(setFilteredData(response?.data?.data));
    } catch (error) {
      console.log("erorr in fetching courses : ", error?.response);
      toast.error(error?.response?.data?.message);
    }

    dispatch(setLoading(false));

  };

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line
  }, []);






  return loading ? (<Loader />) : (
    <div className="w-full px-4 pt-[6rem]">
      <div className="w-full md:w-[90%] xl:w-4/5 2xl:w-8/12 mx-auto flex flex-col justify-start items-center">
        <div className="sm:my-8">
          <p className="text-lg sm:text-xl lg:text-2xl flex justify-around items-center font-[900] text-richblack-5/40 tracking-[4px] sm:tracking-[15px] xl:tracking-[20px]">
            <span>THE</span> <span>STUDY</span> <span>WIRE</span>
          </p>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl gradient font-bold">COURSES.</h1>
        </div>
        <CourseFilterOptions />

        {filteredData?.length > 0 ? <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {

            filteredData?.map((data => (
              <CourseCard key={data?._id} {...data} />
            )))
          }
        </div> : <h1 className="text-5xl text-white w-full h-[50vh] my-auto flex justify-center items-center font-medium">
          No Courses</h1>}
      </div>
      <div className="w-full flex justify-end items-start p-8 xl:p-16">
        {/* <p className="w-[50%] max-w-[500px] text-5xl text-richblack-5/20 font-extrabold m-20">
          <span className="gradient">Web design</span> is not just about creating <span className="text-yellow-50">pretty</span> layouts. It's about
          <span className="text-pink-200"> understanding</span> the marketing <span className="gradient">challenge</span> behind your business
        </p> */}
        <p className="sm:w-[60%] sm:max-w-[400px] xl:w-[45%] xl:max-w-[500px]  text-3xl xl:text-5xl text-richblack-5/20 font-extrabold">
          <span className="text-pink-200/50"> Talent</span> is <br /> cheaper  than  <span className="text-yellow-50/50">Salt,</span> what separates a <span className="text-[#FF90BC]/50">talented</span>  individual from
          the <span className="text-[#713ABE]/50">succesful</span> one is a lot of{" "}
          <span className="gradient">hardwork...</span>
        </p>
      </div>
      {/* review section */}
      <ReviewSlider />
    </div>
  );
};

export default Courses;
