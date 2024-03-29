import React, { useState } from "react";
import { HomePageExplore, tabsName } from "../../../utils/data/homepage-explore";
import FancyHeading from "../../common/FancyHeading";
import HomeCourseTab from "./HomeCourseTab";
import HomeCourseCard from "./HomeCourseCard";

const HomeCourseSection = () => {
  const [activeTab, setActiveTab] = useState(tabsName[0].title);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [activeCourse, setActiveCourse] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setmyCard = (element) => {
    setActiveTab(element);
    const result = HomePageExplore.filter((item) => {
      return item.tag === element;
    });
    setCourses(result[0].courses);
    setActiveCourse(result[0].courses[0].heading);
  };
  return (
    <div className="w-full sm:w-[90%] lg:w-4/5 xl:w-8/12 flex flex-col justify-center items-center my-12 sm:my-20">
      {/* section Heading */}
      <h1 className="text-3xl text-richblack-5 md:text-4xl font-inter font-bold text-left sm:text-center w-full">
      Unlock the <FancyHeading text={"Power of Code"} />
      </h1>
      <p className="my-2 text-richblack-50 text-left sm:text-center text-lg font-bold w-full">{"Learn to Build Anything You Can Imagine"}</p>

      {/* Course Tabs */}
      <HomeCourseTab setmyCard={setmyCard} activeTab={activeTab} />

      {/* Courses card */}
      <div className="flex relative flex-col justify-center items-center z-10 mt-12">
        <HomeCourseCard
          courses={courses}
          activeCourse={activeCourse}
          setActiveCourse={setActiveCourse}
        />
        <div className="bgLight w-screen absolute z-[-10] bottom-[-15%] lg:bottom-[-23%] flex flex-col justify-end items-center h-[350px] pb-8">
        </div>
      </div>
    </div>
  );
};

export default HomeCourseSection;
