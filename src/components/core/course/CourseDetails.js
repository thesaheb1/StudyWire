
import { MdOndemandVideo } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ReactStars from "react-rating-stars-component";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"


import { fetchAverageRating, fetchCourseDetails } from "../../../services/operations/courseOperation"
import CourseDetailsCard from "./CourseDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { BuyCourse } from "../../../services/operations/paymentOperation.";
import ConfirmationModal from "../../common/ConfirmationModal";
import { ACCOUNT_TYPE } from "../../../utils/data/constants";
import toast from "react-hot-toast";
import { formatDate } from "../../../services/formatDate";
import Loader from "../../common/Loader";



function CourseDetails() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting courseId from url parameter
  const { courseId } = useParams()
  const { credentialData, token } = useSelector(state => state.auth)

  const [course, setCourse] = useState(null)
  const [rating, setRating] = useState(0)
  const [openTab, setOpenTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null)

  const [totalLectures, setTotalLectures] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);


  function getTotalTimeDuration() {
    let totalTime = 0;

    // Iterate through each section
    course?.courseContent?.forEach((section) => {
      // Iterate through each subsection in the section
      section?.subSection?.forEach((item) => {
        // Add the time duration to the total time
        totalTime += parseFloat(item?.timeDuration);
      });
    });

    totalTime = (totalTime / 60)

    return totalTime;
  }

  function getTotalLecture() {
    let lectures = 0
    course?.courseContent?.forEach((section) => {
      lectures += section?.subSection?.length || 0
    })

    return lectures;
  }



  useEffect(() => {
    // Calling fetchCourseDetails fucntion to fetch the details
    ; (async () => {
      try {
        setLoading(true)
        const ratingResponse = await fetchAverageRating({ courseId });
        const courseResponse = await fetchCourseDetails({ courseId });


        if (ratingResponse) {
          setRating(ratingResponse)
        }
        if (courseResponse) {
          setCourse(courseResponse?.data)
        }
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
      setLoading(false);
    })()

    // eslint-disable-next-line
  }, [courseId])



  useEffect(() => {

    // get total lectures
    setTotalLectures(getTotalLecture())

    // get total duration
    setTotalDuration(getTotalTimeDuration());

    // eslint-disable-next-line
  }, [course])


  const handleBuyCourse = () => {
    if (!token || !credentialData) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1: "Login",
        btn2: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })

      return
    }
    if (credentialData?.accountType === ACCOUNT_TYPE.STUDENT) {

      BuyCourse(token, [courseId], credentialData, navigate, dispatch)
      return

    }

    toast.error("Only Students can purchase.")

  }

  return loading ? (<Loader />) :
    (<div className="w-full min-h-[calc(100vh-4rem)] pt-[4rem]">
      <div className="w-full bg-richblack-800 flex flex-col justify-start items-start lg:max-h-96 py-8">
        <div className="w-full md:w-[90%] xl:w-4/5 2xl:w-8/12 mx-auto flex flex-col lg:flex-row items-center lg:justify-between lg:items-start gap-8">
          <div className="w-full lg:max-w-[60%] px-4 md:px-0">
            <div className="flex flex-col justify-center items-start flex-wrap gap-y-4 mb-4 sm:mb-10 mt-4">
              <h1 className="font-bold text-richblack-5 text-4xl">
                {course?.courseName}
              </h1>
              <p className="text-richblack-200 text-lg">{course?.courseDescription}</p>
              <div className="text-richblack-400 font-medium flex justify-start items-center flex-wrap gap-2">
                <div className="flex justify-start items-center gap-x-2">
                  <span className="text-yellow-50 text-base font-bold pt-1">{rating}</span>
                  <ReactStars
                    count={5}
                    value={rating}
                    edit={false}
                    size={24}
                    color="#585D69"
                    activeColor="#FFD60A"
                    isHalf={true}
                    emptyIcon={<TiStarOutline />}
                    halfIcon={<TiStarHalfOutline />}
                    fullIcon={<TiStarFullOutline />}
                  />
                </div>
                <div className="text-richblack-50 font-normal flex gap-x-4 gap-y-2">
                  <p>({course?.ratingAndReview?.length} Ratings)</p>
                  <p> {course?.enrolledStudent?.length} students enrolled</p>
                </div>
              </div>
              <div className="text-richblack-50 font-medium flex flex-col gap-y-2">
                <p className="text-richblack-50 font-normal"> Created by : {course?.instructor?.firstName.toUpperCase() + " " + course?.instructor?.lastName.toUpperCase()}</p>
                <div className="flex justify-start flex-wrap items-center gap-x-4 gap-y-2"><p>Created At : {formatDate(course?.createdAt)}</p> <div className="flex justify-center items-center gap-x-2"><MdLanguage className="text-xl" /> <p>{course?.courseLanguage}</p></div></div>
              </div>
            </div>
          </div>
          <div className="">
            <CourseDetailsCard
              course={course}
              handleBuyCourse={handleBuyCourse}
              setConfirmationModal={setConfirmationModal}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-[90%] xl:w-4/5 2xl:w-8/12 mx-auto px-4 md:px-0">
        <div className="w-full lg:w-[60%]">
          <div className="my-8 border border-richblack-600 text-richblack-5 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              {course?.whatYouWillLearn}
            </div>
          </div>
          {/* Course Details Accordion */}
          <div className="py-4 text-richblack-5">
            <div className="flex justify-between items-center my-4">
              <div>
                <p className="text-3xl text-richblack-5 font-medium">Course Content</p>
                <div className="flex justify-start flex-wrap gap-x-2">
                  <p className="text-base text-richblack-5 font-medium my-2">{course?.courseContent?.length} Section(s)</p>
                  <p className="text-base text-richblack-5 font-medium my-2">{totalLectures} lecture(s)</p>
                  <p className="text-base text-richblack-5 font-medium my-2">{Math.round(totalDuration * 10) / 10}Min Content length</p>
                </div>
              </div>
              <p onClick={() => setOpenTab(!openTab)} className="text-yellow-50 text-base cursor-pointer">{openTab ? "Close" : "Open"} all sections</p>
            </div>
            {
              course?.courseContent?.map((section) => (
                <details open={openTab} key={section?._id}>
                  <summary className="px-6 py-6 bg-richblack-800 border-[1px] border-richblack-600 cursor-pointer">
                    <div className="inline-flex justify-between items-center">
                      <p className="text-xl font-medium">{section?.sectionName}</p>
                      <p className="text-yellow-50 text-base pl-4"><span className="p-1">{section?.subSection?.length}</span>lecture(s)</p>
                    </div>
                  </summary>
                  <div className="px-6 py-4 text-base font-medium border-[1px] border-richblack-600">
                    {section?.subSection?.map((item) => (
                      <div key={item?._id} className="flex justify-between">

                        <div className="flex justify-start items-center gap-x-2 cursor-pointer py-2"><MdOndemandVideo className="text-xl" /><p>{item?.title}</p></div>
                        <p>{Math.round((item?.timeDuration / 60) * 10) / 10}Min</p>
                      </div>
                    ))}
                  </div>
                </details>

              ))
            }
          </div>
          <div className="mb-12 py-4 text-richblack-5">
            <p className="text-[28px] font-semibold">Author</p>
            <div className="flex items-center gap-4 py-4">
              <img
                src={
                  course?.instructor?.image
                    ? course?.instructor?.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${course?.instructor?.firstName} ${course?.instructor?.lastName}`
                }
                alt="Author"
                className="h-14 w-14 rounded-full object-cover"
              />
              <p className="text-lg">{`${course?.instructor?.firstName?.toUpperCase()} ${course?.instructor?.lastName.toUpperCase()}`}</p>
            </div>
            <p className="text-richblack-50">
              {course?.instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
    )
}

export default CourseDetails
