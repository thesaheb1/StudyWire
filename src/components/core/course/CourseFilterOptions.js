import React from "react";
import SearchCourse from "./SearchCourse";
import CourseTab from "./CourseTab";
import FilterCourse from "./FilterCourse";

const CourseFilterOptions = () => {
  return (
    <div className="w-full flex justify-center items-center gap-8 flex-wrap my-6">
      <FilterCourse />
      <CourseTab />
      <SearchCourse />
    </div>
  );
};

export default CourseFilterOptions;
