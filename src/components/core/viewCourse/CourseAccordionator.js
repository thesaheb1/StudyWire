import { IoMdCheckmarkCircle } from "react-icons/io";
import React from 'react'

// icons
import { BiArrowBack } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOndemandVideo } from 'react-icons/md';

import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";

const CourseAccordionator = ({ setReviewModal }) => {
    const { sectionId, subSectionId } = useParams();
    const { entireCourse, entireCourseSection, showCourseMenu, totalNoOfLectures, completedVideos } = useSelector(state => state.viewCourse);


    return showCourseMenu && (
        <div className={`w-full sm:w-fit sm:max-w-[20%] sm:min-w-[300px] p-4  sm:min-h-[calc(100vh-4rem)] bg-richblack-800 border-r-2 border-b-2 border-richblack-700`}>
            <button onClick={() => setReviewModal(true)} className="hidden w-full my-4 py-1 border-2 border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 rounded-lg transition-all duration-200 sm:flex justify-center items-center gap-2"><AiOutlinePlusCircle className="text-2xl" /><p>Add Review</p></button>
            <div className="hidden sm:flex justify-between items-center w-full">
            <ProgressBar className="w-[80%]" completed={((completedVideos?.length)/totalNoOfLectures)*100} bgColor="#FFD60A" baseBgColor="#585D69" isLabelVisible={false} height="10px" />
            <p className="w-[15%] text-yellow-50 text-lg font-bold">{(completedVideos?.length/totalNoOfLectures)*100}%</p>
            </div>
            <div className="hidden sm:flex justify-between items-center py-4">
                    <p className='text-richblack-400 font-medium py-2'>Completed {completedVideos?.length}/{totalNoOfLectures}</p>
                <Link to={"/dashboard/enrolled-courses"} className="cursor-pointer px-4 py-1 border-2 border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"><BiArrowBack className="text-2xl" /><p>Back</p></Link>
            </div>
            <div className='bg-richblack-700 rounded-lg'>
                {
                    entireCourseSection?.map((section, index) => (
                        <details open={section?._id === sectionId} key={section?._id}>
                            <summary className={`p-4 text-base font-medium text-richblack-5 cursor-pointer ${entireCourseSection?.length - 1 !== index && "border-b-[1px] border-richblack-500"}`}>
                                {section?.sectionName}
                            </summary>
                            <div className="text-base font-medium">
                                {section?.subSection?.map((item, index) => (
                                    <Link to={`/view-course/${entireCourse?._id}/section/${section?._id}/sub-section/${item?._id}`} key={item?._id} className={`flex justify-between ${section?.subSection?.length - 1 !== index && "border-b-[1px] border-richblack-500"} ${item?._id === subSectionId ? "bg-yellow-200 text-richblack-900" : "text-richblack-200"} px-6 py-4`}>
                                        <div className="flex justify-start items-center gap-x-2 cursor-pointer"><MdOndemandVideo className="text-xl" /><p>{item?.title}</p></div>
                                        <div className='flex justify-center items-center gap-x-2'>
                                            <p>{Math.round((item?.timeDuration / 60) * 10) / 10}Min</p>
                                            {completedVideos?.includes(item?._id) && <div className={`${item?._id === subSectionId ? "text-richblack-900" : "text-caribbeangreen-200"} text-caribbeangreen-200 text-xl font-bold`}><IoMdCheckmarkCircle /></div>}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </details>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseAccordionator