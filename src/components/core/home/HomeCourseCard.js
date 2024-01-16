import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import CtaBtn from "../../button/CtaBtn";


const CourseCard = ({ courses, activeCourse, setActiveCourse }) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center flex-wrap gap-y-8 gap-x-16">
        {courses.map((course) => {
          return (
            <div
              key={course?.id}
              onClick={() => {
                setActiveCourse(course?.heading);
              }}
              className={`${activeCourse === course?.heading
                ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 scale-105"
                : "bg-richblack-800"
                } max-w-full max-h-fit md:max-h-[300px] sm:max-w-[360px] rounded-md text-richblack-25 cursor-pointer p-4 transition-all duration-200`}
            >
              <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
                <div
                  className={`${activeCourse === course?.heading && "text-richblack-900"
                    } font-semibold text-2xl`}
                >
                  {course?.heading}
                </div>

                <p className="text-richblack-400 text-lg font-semibold">
                  {course?.description}
                </p>
              </div>
              <div
                className={`${activeCourse === course?.heading
                  ? "text-blue-300"
                  : "text-richblack-300"
                  } px-6 py-3 font-medium flex justify-between`}
              >
                {/* Level */}
                <div className="flex items-center gap-2 text-[16px]">
                  <HiUsers />
                  <p>{course?.level}</p>
                </div>

                {/* Flow Chart */}
                <div className="flex items-center gap-2 text-[16px]">
                  <ImTree />
                  <p>{course?.lessonNumber} Lession</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Links */}
      <div className="mx-auto flex justify-start sm:justify-center items-center gap-2 lg:gap-6 mt-8 md:mt-12 w-full">
        <CtaBtn
          color={"bgYellow"}
          arrow={true}
          hoverOnShadow={"hover:shadow-[0px_0px_40px_0px_#FFD60A]"}
          text={"Explore Full Catalog"}
        />
        <CtaBtn
          color={"bgBlue"}
          arrow={false}
          hoverOnShadow={"hover:shadow-[0px_0px_40px_0px_#12D8FA]"}
          text={"Learn More"}
        />
      </div>
    </div>
  );
};

export default CourseCard;
