import React from "react";
import { setFilteredData } from "../../../redux/feature/courseSlice";
import { useDispatch, useSelector } from "react-redux";
const FilterCourse = () => {

  const dispatch = useDispatch();
  const { filteredData } = useSelector(state => state.course)

  const SortBy = (value) => {
    if (value === "mostPopular") {
      const mydata = [...filteredData]
      const filtered = mydata?.sort((a, b) => parseFloat(b?.ratingAndReview?.reduce((accumulator, currentValue) => (
        accumulator += currentValue.rating
      ), 0)) - parseFloat(a?.ratingAndReview?.reduce((accumulator, currentValue) => (
        accumulator += currentValue.rating
      ), 0)));
      dispatch(setFilteredData(filtered))
    }
    else if (value === "lowToHigh") {
      const mydata = [...filteredData]
      const filtered = mydata?.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price));
      dispatch(setFilteredData(filtered))
    }
    else if (value === "highToLow") {
      const mydata = [...filteredData]
      const filtered = mydata?.sort((a, b) => parseFloat(b?.price) - parseFloat(a?.price));
      dispatch(setFilteredData(filtered))
    }
    else if (value === "Newest") {
      const mydata = [...filteredData]
      const filtered = mydata?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
      dispatch(setFilteredData(filtered))
    }
  }

  return (
    <div className="w-full max-w-[300px] sm:w-auto p-3 mt-4 rounded-lg bg-richblack-800 text-richblack-200 flex justify-center items-center font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
      <p>Sort by : </p>{" "}
      <select onChange={(e) => SortBy(e.target.value)} name="sort" id="sort" className="bg-transparent outline-none cursor-pointer">

        <option
          className="text-richblack-5 bg-richblack-800 text-center"
          value="mostPopular"
        >
          Most Popular
        </option>
        <option
          className="text-richblack-5 bg-richblack-800 text-center"
          value="lowToHigh"
        >
          Price : Low to High
        </option>
        <option
          className="text-richblack-5 bg-richblack-800 text-center"
          value="highToLow"
        >
          Price : High to Low
        </option>
        <option
          className="text-richblack-5 bg-richblack-800 text-center"
          value="Newest"
        >
          Newest
        </option>
      </select>
    </div>
  );
};

export default FilterCourse;
