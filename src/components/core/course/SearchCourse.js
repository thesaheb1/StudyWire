import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { setFilteredData } from "../../../redux/feature/courseSlice";

const SearchCourse = () => {

  const dispatch = useDispatch();
  const { courseData } = useSelector(state => state.course);
  const [searchData, setSearchData] = useState("");

  const searchHandler = (e) => {
    dispatch(setFilteredData(courseData?.filter((course) => {
      return searchData?.toLowerCase() === '' ? course : course?.courseName?.toLowerCase()?.includes(searchData?.toLowerCase())
    })))
  }

  useEffect(() => {
    searchHandler();
    // eslint-disable-next-line
  },[searchData])




  return (
    <div className="w-full max-w-[300px] sm:w-auto p-3 mt-4 rounded-lg bg-richblack-800 text-richblack-200 flex justify-center items-center font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
      <input
        type="search"
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
        placeholder="Search your Courses"
        className="bg-transparent outline-none text-richblack-5 mx-2"
      />
      <button className="text-xl text-richblack-100 font-bold">
        <FaSearch onClick={searchHandler} className="mr-2"/>
      </button>
    </div>
  );
};

export default SearchCourse;
