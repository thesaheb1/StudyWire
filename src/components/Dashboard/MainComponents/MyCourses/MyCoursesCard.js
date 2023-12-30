import React, { useState } from 'react'
import { RxLapTimer } from "react-icons/rx";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { COURSE_STATUS } from "../../../../utils/data/constants";
import ConfirmationModal from '../../../common/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, fetchCourseDetails, fetchInstructorCourses } from '../../../../services/operations/courseOperation';
import { setCreatedCourse, setEditCreatedCourse, setStep } from '../../../../redux/feature/courseCreationSlice';
import { useNavigate } from 'react-router-dom';

const MyCoursesCard = ({ thumbnail, courseName, courseDescription, createdAt, status, price, _id, setMycourses }) => {
    const [showModal, setShowModal] = useState(null);
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteCourse = async (courseId) => {
        await deleteCourse({ courseId }, token);
        const result = await fetchInstructorCourses(token);
        if (result) {
            setMycourses(result);
        }
        setShowModal(null);
    }

    const handleEditCourse = async (courseId) => {
        const result = await fetchCourseDetails({ courseId });

        if (result) {
            dispatch(setCreatedCourse(result));
            dispatch(setEditCreatedCourse(true));
            dispatch(setStep(1));
            navigate("/dashboard/add-course");
        }

    }

    return (
        <div
            className="w-full flex flex-col xl:flex-row justify-between items-center p-2 gap-8 xl:gap-8 border-2 border-richblack-700 rounded-lg bg-richblack-800"
        >
            <div className="w-full xl:w-[70%] flex flex-col lg:flex-row gap-4 lg:justify-start lg:items-start">
                <img
                    src={thumbnail}
                    alt=""
                    className="w-full lg:w-[450px] aspect-auto rounded-lg"
                />
                <div className='w-full md:w-[450px]'>
                    <p className="text-richblack-5 text-2xl font-semibold">
                        {courseName}
                    </p>
                    <p className="text-richblack-300 text-base font-semibold mt-1">
                        {courseDescription}
                    </p>
                    <p className="text-richblack-50 text-base font-semibold mt-4">
                        {createdAt}
                    </p>
                    {status === COURSE_STATUS?.PUBLISHED ? (
                        <div className="text-yellow-50 mt-4 px-4 py-1 bg-richblack-700 rounded-full flex justify-center items-center w-fit gap-x-2 text-lg">
                            <AiFillCheckCircle />
                            <p>Published</p>
                        </div>
                    ) : (
                        <div className="text-pink-200 mt-4 px-4 py-1 bg-richblack-700 rounded-full flex justify-center items-center w-fit gap-x-2 text-lg">
                            <RxLapTimer />
                            <p>Drafted</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='w-full xl:w-[30%] flex flex-row  gap-x-4 justify-between xl:items-center flex-wrap'>
                <div className='flex gap-x-8'>

                    <p className="min-w-fit text-richblack-50 text-lg font-semibold pb-2">
                        Rs {price}
                    </p>
                    <p className="min-w-fit text-richblack-50 text-lg font-semibold">
                        2hr 30 mins
                    </p>
                </div>
                <div className="min-w-fit flex gap-x-4">
                    <button onClick={() => handleEditCourse(_id)} className="text-caribbeangreen-200 text-2xl font-semibold cursor-pointer">
                        <FiEdit2 />
                    </button>
                    <button
                        onClick={() =>
                            setShowModal({
                                btn1: "Delete",
                                btn2: "Cancel",
                                text1: "Do you want to delete this course?",
                                text2: "All the data related to this course will be deleted",
                                btn1Handler: () => handleDeleteCourse(_id),
                                btn2Handler: () => setShowModal(null),
                            })
                        }
                        className="text-pink-200 text-2xl font-semibold cursor-pointer"
                    >
                        <RiDeleteBin6Line />
                    </button>
                </div>
            </div>
            {showModal && <ConfirmationModal modalData={showModal} />}
        </div>
    )
}

export default MyCoursesCard