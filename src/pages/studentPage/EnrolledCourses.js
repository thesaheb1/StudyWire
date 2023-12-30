import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";

const EnrolledCourses = () => {
  const tabsName = [
    { id: 1, title: "All" },
    { id: 2, title: "Pending" },
    { id: 3, title: "Completed" },
  ];
  const [activeTab, setActiveTab] = useState(tabsName[0]?.title);
  const { credentialData } = useSelector(state => state.auth)

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

    totalTime = Math.round((totalTime / 60) * 10) / 10

    return totalTime;
  }

  return (
    <div className="w-full h-full ml-[60px] m-2 sm:m-8 xl:m-16">
      <div className="w-full flex items-center flex-col sm:justify-start sm:items-start gap-y-8">
        <h1 className="text-2xl sm:text-4xl text-richblack-5">
          Enrolled Courses
        </h1>

        <div className="w-fit p-1 gap-x-2 sm:gap-x-4 rounded-full bg-richblack-800 text-richblack-200 flex justify-between items-center font-medium ">
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
        </div>
      </div>
      <div className="w-full rounded-t-lg mt-8 text-richblack-50 font-medium hidden lg:flex justify-between items-center bg-richblack-700 p-4">
        <div className="w-[55%]">Course Name</div>
        <div className="w-1/5">Durations</div>
        <div className="w-1/5">Progress</div>
      </div>
      <div className="w-full max-h-[calc(100vh-15rem)] sm:max-h-[calc(100vh-18rem)] lg:max-h-[calc(100vh-22rem)] xl:max-h-[calc(100vh-24rem)] overflow-y-auto p-2 border-2 border-richblack-700 rounded-lg lg:rounded-t-none mt-8 lg:mt-0">
        {credentialData?.courses?.map((course) => (
          <div key={course?._id} className="w-full bg-richblack-800 text-richblack-50 font-medium flex flex-col justify-start items-start gap-y-2 mb-4 lg:flex-row lg:justify-between lg:items-center border-2 rounded-lg border-richblack-700 lg:border-x-2 lg:border-b lg:border-richblack-700 p-2">
            <div className="lg:w-[55%] flex flex-col md:flex-row gap-4 justify-start items-start">
              <img
                src={course?.thumbnail}
                alt=""
                className="w-full sm:h-24 sm:w-auto  aspect-auto rounded-lg my-auto"
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
              <p className="text-richblack-50 text-base">{getTotalTimeDuration(course)} Min</p>
            </div>
            <div className="w-full lg:w-1/5">
              <div className="lg:max-w-[200px]">
                <p className="text-richblack-50 text-base pb-2">course</p>

                <ProgressBar completed="65" height="8px" isLabelVisible={false} />
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>



  );
};

export default EnrolledCourses;
