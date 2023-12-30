
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


import { fetchCourseDetails } from "../../../services/operations/courseOperation"
import CourseDetailsCard from "./CourseDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { BuyCourse } from "../../../services/operations/paymentOperation.";
import ConfirmationModal from "../../common/ConfirmationModal";
import { ACCOUNT_TYPE } from "../../../utils/data/constants";
import toast from "react-hot-toast";



function CourseDetails() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting courseId from url parameter
  const { courseId } = useParams()
  const { credentialData, token } = useSelector(state => state.auth)

  const [response, setResponse] = useState(null)
  const [openTab, setOpenTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null)

  const [totalLectures, setTotalLectures] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);


  function getTotalTimeDuration() {
    let totalTime = 0;

    // Iterate through each section
    response?.courseContent?.forEach((section) => {
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
    response?.courseContent?.forEach((section) => {
      lectures += section?.subSection?.length || 0
    })

    return lectures;
  }



  useEffect(() => {
    // Calling fetchCourseDetails fucntion to fetch the details
    ; (async () => {
      try {
        setLoading(true)
        const res = await fetchCourseDetails({ courseId });
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
      setLoading(false);
    })()


  }, [courseId])



  useEffect(() => {

    // get total lectures
    setTotalLectures(getTotalLecture())

    // get total duration
    setTotalDuration(getTotalTimeDuration());

    // eslint-disable-next-line
  }, [response])


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
    if(credentialData?.accountType === ACCOUNT_TYPE.STUDENT){

      BuyCourse(token, [courseId], credentialData, navigate, dispatch)
      return

    }

    toast.error("Only Students can purchase.")

  }

  return loading ? (<div className="w-screen min-h-[calc(100vh-4rem)] flex justify-center items-center pt-[4rem]">
    <div className="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>) :
    (<div className="w-full min-h-[calc(100vh-4rem)] pt-[4rem]">
      <div className="w-full bg-richblack-800 flex flex-col justify-start items-start">
        <div className="w-8/12 mx-auto relative">
          <div className="w-[60%]">
            <div className="flex flex-col justify-center items-start gap-y-4 my-10">
              <h1 className="font-bold text-richblack-5 text-4xl">
                {response?.courseName}
              </h1>
              <p className="text-richblack-200 text-lg">{response?.courseDescription}</p>
              <div className="text-richblack-400 font-medium flex justify-start items-center gap-x-4">
                <span className="text-yellow-50 text-base font-bold pt-1">4.5</span>
                <ReactStars
                  count={5}
                  value={4.5}
                  edit={false}
                  size={24}
                  color="#585D69"
                  activeColor="#FFD60A"
                  isHalf={true}
                  emptyIcon={<TiStarOutline />}
                  halfIcon={<TiStarHalfOutline />}
                  fullIcon={<TiStarFullOutline />}
                />{" "}
                <div className="text-richblack-50 font-normal flex gap-x-4">
                  <p>(20 Ratings)</p>
                  <p> 332,402 students</p>
                </div>
              </div>
              <div className="text-richblack-50 font-medium flex flex-col gap-y-2">
                <p className="text-richblack-50 font-normal"> Created by : {response?.instructor?.firstName.toUpperCase() + " " + response?.instructor?.lastName.toUpperCase()}</p>
                <div className="flex justify-center items-center gap-x-4"><p>Created At : 12/2023</p> <div className="flex justify-center items-center gap-x-2"><MdLanguage className="text-xl" /> <p>{response?.courseLanguage}</p></div></div>
              </div>
            </div>
          </div>
          <div className="absolute top-10 right-0">
            <CourseDetailsCard
              course={response}
              handleBuyCourse={handleBuyCourse}
              setConfirmationModal={setConfirmationModal}
            />
          </div>
        </div>
      </div>

      <div className="w-8/12 mx-auto">
        <div className="w-[60%]">
          <div className="my-8 border border-richblack-600 text-richblack-5 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              {response?.whatYouWillLearn}
            </div>
          </div>
          {/* Course Details Accordion */}
          <div className="py-4 text-richblack-5">
            <div className="flex justify-between items-center my-4">
              <div>
                <p className="text-3xl text-richblack-5 font-medium">Course Content</p>
                <div className="flex justify-start gap-x-2">
                  <p className="text-base text-richblack-5 font-medium my-2">{response?.courseContent?.length} Section(s)</p>
                  <p className="text-base text-richblack-5 font-medium my-2">{totalLectures} lecture(s)</p>
                  <p className="text-base text-richblack-5 font-medium my-2">{Math.round(totalDuration * 10) / 10}Min Content length</p>
                </div>
              </div>
              <p onClick={() => setOpenTab(!openTab)} className="text-yellow-50 text-base cursor-pointer">{openTab ? "Close" : "Open"} all sections</p>
            </div>
            {
              response?.courseContent?.map((section) => (
                <details open={openTab} key={section?._id}>
                  <summary className="px-6 py-6 bg-richblack-800 border-[1px] border-richblack-600 cursor-pointer">
                    <div className="inline-flex justify-between items-center">
                      <p className="text-xl font-medium">{section?.sectionName}</p>
                      <p className="text-yellow-50 text-base pl-4"><span className="p-1">{section?.subSection.length}</span>lecture(s)</p>
                    </div>
                  </summary>
                  <div className="px-6 py-4 text-base font-medium border-[1px] border-richblack-600">
                    {section?.subSection?.map((item) => (
                      <div key={item?._id} className="flex justify-between">

                        <div className="flex justify-start items-center gap-x-2 cursor-pointer"><MdOndemandVideo className="text-xl" /><p>{item?.title}</p></div>
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
                  response?.instructor.image
                    ? response?.instructor.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.instructor?.firstName} ${response?.instructor?.lastName}`
                }
                alt="Author"
                className="h-14 w-14 rounded-full object-cover"
              />
              <p className="text-lg">{`${response?.instructor?.firstName?.toUpperCase()} ${response?.instructor?.lastName.toUpperCase()}`}</p>
            </div>
            <p className="text-richblack-50">
              {response?.instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
    )
}

export default CourseDetails
