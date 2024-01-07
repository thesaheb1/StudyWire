import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import React, { useEffect, useState } from 'react'
import { MdOndemandVideo } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

const ViewCourse = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const { credentialData } = useSelector(state => state.auth);
    const [viewCourse, setViewCourse] = useState([]);
    const [courseCorridator, setCourseCorridator] = useState(false);
    // const [currentVideo, setCurrentVideo] = useState("");

    useEffect(() => {
        ; (() => {
            let FilterViewCourse = credentialData?.courses?.filter((course) => (course?._id === courseId));
            setViewCourse(FilterViewCourse[0])
        })()

        // eslint-disable-next-line
    }, [courseId])

    // useEffect(() => {
    //     ; (() => {
    //         let filteredSubSections = credentialData?.courses?.map((course) => (course?._id === courseId && course?.courseContent?.map((section) => (section?.subSection?.filter((item) => item?._id === subSectionId))))).flat().flat();
    //         console.log("Filtered sections.....", filteredSubSections)
    //         setCurrentVideo(filteredSubSections[0]);
    //     })()
    //     // eslint-disable-next-line
    // }, [subSectionId])


    return (
        <div className='w-screen min-h-[calc(100vh-4rem)] pt-[4rem] flex justify-between items-start'>
            <div className={`${courseCorridator && "hidden"} max-w-[20%] min-w-[300px] p-4  min-h-[calc(100vh-4rem)] bg-richblack-800`}>
            <button className="w-full my-4 py-1 border-2 border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"><AiOutlinePlusCircle className="text-2xl" /><p>Add Review</p></button>

                <div className="flex justify-between items-center pb-4">
                    <p className='text-richblack-400 font-medium py-2'>Completed 2/3</p>
                    <Link to={"/dashboard/enrolled-courses"} className="cursor-pointer px-4 py-1 border-2 border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"><BiArrowBack className="text-2xl" /><p>Back</p></Link>
                </div>
                <div className='bg-richblack-700 rounded-lg'>
                    {
                        viewCourse?.courseContent?.map((section, index) => (
                            <details open={section?._id === sectionId} key={section?._id}>
                                <summary className={`p-4 text-base font-medium text-richblack-5 cursor-pointer ${viewCourse?.courseContent?.length - 1 !== index && "border-b-[1px] border-richblack-500"}`}>
                                    {section?.sectionName}
                                </summary>
                                <div className="text-base font-medium">
                                    {section?.subSection?.map((item, index) => (
                                        <Link to={`/view-course/${viewCourse?._id}/section/${section?._id}/sub-section/${item?._id}`} key={item?._id} className={`flex justify-between ${section?.subSection?.length - 1 !== index && "border-b-[1px] border-richblack-500"} ${item?._id === subSectionId ? "bg-yellow-200 text-richblack-900" : "text-richblack-200"} px-6 py-4`}>
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
            <div className='w-full min-h-[calc(100vh-4rem)]'>
                <div className="w-full flex justify-between items-center p-4 bg-richblack-800">
                    <div className='flex justify-center items-center gap-4 text-xl text-richblack-5 font-medium'>
                        <FiMenu onClick={() => { setCourseCorridator(!courseCorridator) }} className="text-3xl cursor-pointer" />
                        <p>{viewCourse?.courseName}</p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <button className="px-4 py-1 text-yellow-50 hover:bg-yellow-50 border-2 border-yellow-50 hover:text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"><IoIosArrowDropleft className="text-2xl" /><p>Previous</p></button>
                        <button className="px-4 py-1 text-yellow-50 hover:bg-yellow-50 border-2 border-yellow-50 hover:text-richblack-900  rounded-lg transition-all duration-200 flex justify-center items-center gap-2"><p>Next</p><IoIosArrowDropright className="text-2xl" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCourse