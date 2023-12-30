import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { fetchAllCoursecategories } from "../../../services/operations/courseOperation";
import { setFilteredData } from "../../../redux/feature/courseSlice";
import { useDispatch, useSelector } from "react-redux";

const CourseTab = () => {


  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const [allCategories, setAllCategories] = useState([]);
  const { courseData } = useSelector(state => state.course)
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    // fetch categories
    ; (async () => {
      setLoading(true);
      const categories = await fetchAllCoursecategories();
      if (categories.length > 0) {
        setAllCategories(categories);
      }
      setLoading(false);
    })()

    // eslint-disable-next-line
  }, [])


  

  const FilterTabCourses = () => {
    const filtered = courseData?.filter((item) => {
      if (location?.pathname?.split("/")?.slice(-1)[0] === "all") {
        return item
      }
      else if (item?.category?.name?.replace(" ", "-")?.toLowerCase() === location?.pathname?.split("/")?.slice(-1)[0]) {
        return item
      }

      return null;
    })

    dispatch(setFilteredData(filtered))
  }

 

  useEffect(() => {

    FilterTabCourses();

    // eslint-disable-next-line
  }, [location?.pathname?.split("/")?.slice(-1)[0]])



  return loading ? (<></>) : (
    <div className="w-full sm:w-auto mt-4 text-richblack-200 flex justify-center items-center gap-2 flex-wrap font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
      <Link
        to={"/courses/all"}
        className={`${matchRoute("/courses/all") && "bg-richblack-800 text-[#12D8FA]"
          } py-2 px-4 font-medium rounded-lg hover:bg-richblack-800 hover:text-[#12D8FA] transition-all duration-200 cursor-pointer`}
      >
        All
      </Link>
      {allCategories?.map((element) => {
        return (
          <Link
            to={"/courses/" + element?.name?.replace(" ", "-")?.toLowerCase()}
            key={element?._id}
            className={`${matchRoute("/courses/" + element?.name?.replace(" ", "-")?.toLowerCase()) && "bg-richblack-800 text-[#12D8FA]"
              } py-2 px-4 font-medium rounded-lg hover:bg-richblack-800 hover:text-[#12D8FA] transition-all duration-200 cursor-pointer`}
          >
            {element?.name}
          </Link>
        );
      })}
    </div>
  )
};

export default CourseTab;
