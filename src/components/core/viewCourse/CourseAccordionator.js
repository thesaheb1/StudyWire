import React, { useEffect, useState } from 'react'

// icons
import { BiArrowBack } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOndemandVideo } from 'react-icons/md';

import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';

const CourseAccordionator = ({setReviewModal}) => {
    const { sectionId, subSectionId } = useParams();
    const { entireCourse, entireCourseSection, showCourseMenu } = useSelector(state => state.viewCourse);
    const [totalLecture, setTotalLecture] = useState(0);

    useEffect(() => {
        (() => {
          let Count = 0;
          entireCourseSection?.forEach((section) => {
            Count += section?.subSection?.length;
          });
          setTotalLecture(Count);
        })();
        console.log("EFFECT rendered..........");
        // eslint-disable-next-line
      }, []);

      console.log("UI rendered..........");

    return showCourseMenu && (
        <div className={`max-w-[20%] min-w-[300px] p-4  min-h-[calc(100vh-4rem)] bg-richblack-800 border-r-2 border-b-2 border-richblack-700`}>
            <button onClick={() => setReviewModal(true)} className="w-full my-4 py-1 border-2 border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"><AiOutlinePlusCircle className="text-2xl" /><p>Add Review</p></button>
            <div className="flex justify-between items-center pb-4">
                <p className='text-richblack-400 font-medium py-2'>Completed 2/{totalLecture}</p>
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
                                        <p>{Math.round((item?.timeDuration / 60) * 10) / 10}Min</p>
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