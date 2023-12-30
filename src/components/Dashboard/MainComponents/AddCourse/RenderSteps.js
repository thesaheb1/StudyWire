import { GiCheckMark } from "react-icons/gi"; 
import React from "react";
import { useSelector } from "react-redux";
import CourseCreater from "./CourseCreater";
import SectionCreater from "./SectionCreater";
import PublishCourse from "./PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.courseCreation);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div className="w-full md:min-w-[500px] md:w-[700px]">
      <div className="w-full flex flex-col justify-center items-baseline">
        <div className="w-full flex justify-center items-center">
          {steps.map((item) => (
            <div
              key={item?.id}
              className={`${
                item.id === steps.length ? "w-fit" : "w-1/3"
              } flex justify-center items-center`}
            >
              <div
                className={`w-[50px] aspect-square rounded-full border-2 ${
                  step > item?.id
                    ? "border-yellow-50 bg-yellow-50"
                    : "border-richblack-300 bg-richblack-700 text-richblack-100"
                } text-lg font-bold flex justify-center items-center`}
              >
                {step > item?.id ? (
                  <GiCheckMark />
                ) : (
                  item?.id
                )}
              </div>
              {item?.id !== steps.length && (
                <div
                  className={`w-[calc(100%-50px)] border-b-2 border-dashed ${
                    step > item?.id
                      ? "border-yellow-50"
                      : "border-richblack-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center items-center mt-2">
          {steps.map((item) => (
            <p
              key={item?.id}
              className={`${
                step > item?.id ? "text-yellow-50" : "text-richblack-100"
              } w-1/3 text-center`}
            >
              {item?.title}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full my-10">
        {step === 1 && <CourseCreater />}
        {step === 2 && <SectionCreater />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  );
};

export default RenderSteps;
