import React, { useEffect, useState } from "react";
import { fetchInstructorCourses } from "../../services/operations/courseOperation";
import { useSelector } from "react-redux";
import MyCoursesCard from "../../components/Dashboard/MainComponents/MyCourses/MyCoursesCard";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [mycourses, setMycourses] = useState([]);


  useEffect(() => {


    ; (async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token);
      if (result) {
        setMycourses(result);
      }
      setLoading(false);
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (loading ? <div className="w-screen min-h-[calc(100vh-4rem)] flex justify-center items-center">
    <div className="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div> :
    <div className="w-full max-h-[calc(100vh-4rem)] overflow-y-auto ml-[60px] p-4 sm:p-8 xl:p-16">
      <h1 className="py-8 text-2xl sm:text-4xl text-richblack-5 text-center sm:text-left">My Course</h1>
      <div className="w-full flex flex-col gap-y-8">
        {mycourses?.length > 0 ?
          mycourses?.map((course) => (
            <MyCoursesCard key={course?._id} {...course} setMycourses={setMycourses} />
          )) : (<h1 className="text-5xl text-richblack-100 font-medium m-10 mx-auto">No Courses Created</h1>)}
      </div>
    </div>
  );
};

export default MyCourses;
