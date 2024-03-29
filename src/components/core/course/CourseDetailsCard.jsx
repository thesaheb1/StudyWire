import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ACCOUNT_TYPE } from "../../../utils/data/constants"
import { addToCart, removeFromCart } from "../../../redux/feature/cartSlice"


function CourseDetailsCard({ course , handleBuyCourse, setConfirmationModal}) {

  const { credentialData, token } = useSelector(state => state.auth)
  const { cart } = useSelector(state => state.cart)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

    const handleAddToCart = () => {
    if (credentialData && credentialData?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Only Students can purchase.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1: "Login",
      btn2: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        <img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="w-full sm:w-[400px] rounded-lg"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {course?.price}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="bg-yellow-50 py-2 rounded-lg text-richblack-900 text-lg font-medium"
              onClick={
                credentialData && course?.enrolledStudent.includes(credentialData?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
            {credentialData && course?.enrolledStudent.includes(credentialData?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {!(course?.enrolledStudent.includes(credentialData?._id)) && (cart?.some((c) => c?._id === course?._id) ? (<button onClick={() => dispatch(removeFromCart(course?._id))} className="bg-black py-2 rounded-lg text-richblack-5 text-lg font-medium">
              Remove from cart
            </button>) : (<button onClick={handleAddToCart} className="bg-black py-2 rounded-lg text-richblack-5 text-lg font-medium">
              Add to Cart
            </button>))}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              Course Prerequisite :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard
