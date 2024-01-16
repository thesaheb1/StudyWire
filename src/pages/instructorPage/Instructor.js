import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getInstructorDashboardData } from '../../services/operations/profileOperation';
import { fetchInstructorCourses } from '../../services/operations/courseOperation';
import InstructorChart from '../../components/Dashboard/MainComponents/InstructorDashboard/InstructorChart';
import Loader from '../../components/common/Loader';

const Instructor = () => {

  const { credentialData, token } = useSelector(state => state.auth);
  const [instructorDashboardData, setInstructorDashboardData] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const DashboardData = await getInstructorDashboardData(token)
      const Courses = await fetchInstructorCourses(token)

      if (DashboardData.length) {
        setInstructorDashboardData(DashboardData)
      }

      if (Courses) {
        setInstructorCourses(Courses)
      }
      setLoading(false)
    })()

    // eslint-disable-next-line
  }, [])

  const totalAmount = instructorDashboardData?.reduce(
    (acc, curr) => acc + curr?.totalAmountGenerated,
    0
  )

  const totalStudents = instructorDashboardData?.reduce(
    (acc, curr) => acc + curr?.totalStudentsEnrolled,
    0
  )

  return (loading ? (<Loader dashboard={true}/>):
    (<div className="w-full max-h-[calc(100vh-4rem)] overflow-y-auto ml-[60px] p-4 sm:p-8 xl:p-16">
      <h1 className="pt-8 pb-2 text-2xl sm:text-4xl text-richblack-5 text-center sm:text-left">Hello, {credentialData?.firstName}👋</h1>
      <p className="text-richblack-100 text-xl">Let's start something now...</p>

      {loading ? (
        <div className="spinner"></div>
      ) : instructorCourses?.length > 0 && (
        <div className="my-4 flex flex-col md:flex-row justify-center min-h-fit items-center w-full gap-4">
          {/* Render chart / graph */}
          {totalAmount > 0 || totalStudents > 0 ? (
            <InstructorChart courses={instructorDashboardData} />
          ) : (
            <div className="flex-1 rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Visualize</p>
              <p className="mt-4 text-xl font-medium text-richblack-50">
                Not Enough Data To Visualize
              </p>
            </div>
          )}
          {/* Total Statistics */}
          <div className="flex w-full md:w-[30%] h-[550px] flex-col rounded-md bg-richblack-800 p-4 md:p-6 m-4 md:m-0">
            <p className="text-lg font-bold text-richblack-5">Statistics</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-lg text-richblack-200">Total Courses</p>
                <p className="text-3xl font-semibold text-richblack-50">
                  {instructorCourses.length}
                </p>
              </div>
              <div>
                <p className="text-lg text-richblack-200">Total Students</p>
                <p className="text-3xl font-semibold text-richblack-50">
                  {totalStudents}
                </p>
              </div>
              <div>
                <p className="text-lg text-richblack-200">Total Income</p>
                <p className="text-3xl font-semibold text-richblack-50">
                  Rs. {totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>)}
    </div>)
  );
}

export default Instructor