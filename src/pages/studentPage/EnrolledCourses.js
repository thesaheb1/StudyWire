import { RxLapTimer } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { fetchEnrolledCourses } from "../../services/operations/courseOperation";

const EnrolledCourses = () => {
  const tabsName = [
    { id: 1, title: "All" },
    { id: 2, title: "Pending" },
    { id: 3, title: "Completed" },
  ];
  const [activeTab, setActiveTab] = useState(tabsName[0]?.title);
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getTotalTimeDuration(course) {
    let totalTime = 0;

    // Iterate through each section
    course?.courseContent?.forEach((section) => {
      // Iterate through each subsection in the section
      section?.subSection?.forEach((item) => {
        // Add the time duration to the total time
        totalTime += parseFloat(item?.timeDuration);
      });
    });

    totalTime = Math.round((totalTime / 60) * 10) / 10;

    return totalTime;
  }

  const checksum = (userData, course) => {
    if (activeTab === "Pending") {
      if (getProgressData(userData, course) !== 100)
        return true
    }
    else if (activeTab === "Completed") {
      if (getProgressData(userData, course) === 100)
        return true
    } else if (activeTab === "All") {
      return true
    }
    else {
      return false;
    }
  }

  function getProgressData(userData, course) {
    let lectures = 0
    course?.courseContent?.forEach((section) => {
      lectures += section?.subSection?.length
    })

    let completedVideo = userData?.courseProgress?.filter((item) => (item?.courseId === course?._id))

    return parseInt(((completedVideo[0]?.completedVideos.length) / lectures) * 100);
  }

  

  useEffect(() => {


    ; (async () => {
      setLoading(true);
      const result = await fetchEnrolledCourses(token);
      if (result) {
        setEnrolledCourses(result);
      }
      setLoading(false);
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (<Loader dashboard={true} />) : (
    <div className="w-full min-h-[calc(100vh-4rem)] ml-[60px] p-4 sm:p-8 xl:p-16 relative">
      <div className="w-full flex items-center flex-col sm:justify-start sm:items-start gap-y-8">
        <h1 className="text-2xl sm:text-4xl text-richblack-5">
          Enrolled Courses
        </h1>

        {enrolledCourses?.courses?.length > 0 && <div className="w-fit p-1 gap-x-2 sm:gap-x-4 rounded-full bg-richblack-800 text-richblack-200 flex justify-between items-center font-medium ">
          {tabsName.map((element) => {
            return (
              <div
                key={element?.id}
                onClick={() => setActiveTab(element?.title)}
                className={`${activeTab === element?.title &&
                  "bg-richblack-900 text-yellow-50 "
                  } py-1 sm:py-2 px-2 sm:px-4 text-sm sm:text-base font-medium rounded-full hover:bg-richblack-900 hover:text-yellow-50 transition-all duration-200 cursor-pointer`}
              >
                {element?.title}
              </div>
            );
          })}
        </div>}
      </div>
      {enrolledCourses?.courses?.length > 0 ? (<>
        <div className="w-full rounded-t-lg mt-8 text-richblack-50 font-medium hidden lg:flex justify-between items-center bg-richblack-700 p-4">
          <div className="w-[55%]">Course Name</div>
          <div className="w-1/5">Durations</div>
          <div className="w-1/5">Progress</div>
        </div>
        <div className="w-full max-h-[calc(100vh-15rem)] sm:max-h-[calc(100vh-18rem)] lg:max-h-[calc(100vh-22rem)] xl:max-h-[calc(100vh-24rem)] flex flex-col gap-2 overflow-y-auto p-2 border-2 border-richblack-700 rounded-lg lg:rounded-t-none mt-8 lg:mt-0">
          {enrolledCourses?.courses?.map((course) => (
            checksum(enrolledCourses, course) && <div
              onClick={() =>
                navigate(
                  `/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`
                )
              }
              key={course?._id}
              className="w-full bg-richblack-800 text-richblack-50 font-medium flex flex-col justify-start items-start gap-2 cursor-pointer lg:flex-row lg:justify-between lg:items-center border-2 rounded-lg border-richblack-700 lg:border-x-2 lg:border-b lg:border-richblack-700 p-2"
            >
              <div className="lg:w-[55%] flex flex-col md:flex-row gap-4 justify-start items-start">
                <img
                  src={course?.thumbnail}
                  alt=""
                  className="w-full sm:h-24 sm:w-auto  aspect-video rounded-lg my-auto"
                />
                <div className="flex flex-col justify-between items-start">
                  <p className="text-richblack-5 text-base">
                    {course?.courseName}
                  </p>
                  <p className="text-richblack-300 text-sm mt-1">
                    {course?.courseDescription}
                  </p>
                </div>
              </div>
              <div className="lg:w-1/5">
                {" "}
                <p className="text-richblack-50 text-base flex items-center gap-2">
                  {getTotalTimeDuration(course)} Min
                  <span className="lg:hidden"><RxLapTimer /></span>
                </p>
              </div>
              <div className="w-full lg:w-1/5">
                <div className="lg:max-w-[200px]">
                  {/* <p className="text-richblack-50 text-base pb-2">course</p> */}

                  <div className="flex justify-between items-center gap-4 w-full">
                    <ProgressBar
                      className="w-full"
                      completed={getProgressData(enrolledCourses, course)}
                      bgColor={getProgressData(enrolledCourses, course) === 100 ? "#03C988" : "#FFD60A"}
                      baseBgColor="#585D69"
                      isLabelVisible={false}
                      height="10px"
                    />
                    <p className={`${getProgressData(enrolledCourses, course) === 100 ? "text-[#03C988]" : "text-[#FFD60A]"} text-lg font-bold`}>
                      {getProgressData(enrolledCourses, course)}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>) : (<h1 className="text-center text-2xl text-richblack-100 absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">No courses Enrolled</h1>)}
    </div>
  );
};

export default EnrolledCourses;
