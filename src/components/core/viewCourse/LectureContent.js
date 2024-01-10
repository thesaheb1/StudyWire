import React, { useEffect, useState } from "react";

import { FiMenu } from "react-icons/fi";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setShowCourseMenu } from "../../../redux/feature/viewCourseSlice";

const LectureContent = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { entireCourse, entireCourseSection, showCourseMenu } =
        useSelector((state) => state.viewCourse);

    const [currentVideo, setCurrentVideo] = useState({});


    const goToNext = () => {
        console.log("gotonext.......")
        const currentSectionIndex = entireCourseSection?.findIndex(
            (data) => data?._id === sectionId
        );
        const subSectionLength =
            entireCourseSection[currentSectionIndex]?.subSection?.length;
        const currentSubSectionIndex = entireCourseSection[
            currentSectionIndex
        ]?.subSection?.findIndex((data) => data?._id === subSectionId);

        if (currentSubSectionIndex !== subSectionLength - 1) {
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${entireCourseSection[currentSectionIndex]?.subSection[
                    currentSubSectionIndex + 1
                ]?._id
                }`
            );
        } else {
            navigate(
                `/view-course/${courseId}/section/${entireCourseSection[currentSectionIndex + 1]?._id
                }/sub-section/${entireCourseSection[currentSectionIndex + 1]?.subSection[0]?._id
                }`
            );
        }
    };

    const goToPrevious = () => {
        console.log("gotoprev.......")
        const currentSectionIndex = entireCourseSection?.findIndex(
            (data) => data?._id === sectionId
        );
        const currentSubSectionIndex = entireCourseSection[
            currentSectionIndex
        ]?.subSection?.findIndex((data) => data?._id === subSectionId);

        if (currentSubSectionIndex !== 0) {
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${entireCourseSection[currentSectionIndex]?.subSection[
                    currentSubSectionIndex - 1
                ]?._id
                }`
            );
        } else {
            navigate(
                `/view-course/${courseId}/section/${entireCourseSection[currentSectionIndex - 1]?._id
                }/sub-section/${entireCourseSection[currentSectionIndex - 1]?.subSection[
                    entireCourseSection[currentSectionIndex - 1]?.subSection?.length - 1
                ]?._id
                }`
            );
        }
    };

    const isFirstVideo = () => {
        const currentSectionIndex = entireCourseSection?.findIndex(
            (data) => data?._id === sectionId
        );
        const currentSubSectionIndex = entireCourseSection[
            currentSectionIndex
        ]?.subSection?.findIndex((data) => data?._id === subSectionId);

        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            console.log("isfirstvideo true.......")
            return true;
        } else {
            console.log("isfirstvideo false.......")
            return false;
        }
    };
    const isLastVideo = () => {
        const currentSectionIndex = entireCourseSection?.findIndex(
            (data) => data?._id === sectionId
        );
        const subSectionLength =
            entireCourseSection[currentSectionIndex]?.subSection?.length;
        const currentSubSectionIndex = entireCourseSection[
            currentSectionIndex
        ]?.subSection?.findIndex((data) => data?._id === subSectionId);

        if (
            currentSectionIndex === entireCourseSection?.length - 1 &&
            currentSubSectionIndex === subSectionLength - 1
        ) {
            console.log("islastvideo true.......")
            return true;
        } else {
            console.log("islastvideo false.......")
            return false;
        }
    };
    useEffect(() => {
        (() => {
            if (!entireCourseSection.length) {
                return;
            }
            if (!courseId && !sectionId && !subSectionId) {
                navigate('/dashboard/enrolled-courses')
                return;
            }
            else {
                const currentSectionIndex = entireCourseSection?.findIndex((data) => data?._id === sectionId);
                const filterVideo = entireCourseSection[currentSectionIndex]?.subSection?.filter((data) => (data?._id === subSectionId));
                setCurrentVideo(filterVideo[0])
                return;
            }
        })();
        console.log("EFFECT rendered video..........");
        // eslint-disable-next-line
    }, [entireCourse, entireCourseSection, location.pathname])

    console.log("UI rendered video..........");
    return (
        <>
            <div className="fixed w-full h-[6rem] flex justify-between items-center px-4 border-b-2 border-richblack-700 bg-richblack-800">
                <div className="flex justify-center items-center gap-4 text-xl text-richblack-5 font-medium">
                    <FiMenu
                        onClick={() => {
                            dispatch(setShowCourseMenu(!showCourseMenu));
                        }}
                        className="text-3xl cursor-pointer"
                    />
                    <p>{entireCourse?.courseName}</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                    {!isFirstVideo() && (
                        <button
                            onClick={() => {
                                goToPrevious();
                            }}
                            className="px-4 py-1 text-yellow-50 hover:bg-yellow-50 border-2 border-yellow-50 hover:text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"
                        >
                            <IoIosArrowDropleft className="text-2xl" />
                            <p>Previous</p>
                        </button>
                    )}
                    {!isLastVideo() && (
                        <button
                            onClick={() => {
                                goToNext();
                            }}
                            className="px-4 py-1 text-yellow-50 hover:bg-yellow-50 border-2 border-yellow-50 hover:text-richblack-900  rounded-lg transition-all duration-200 flex justify-center items-center gap-2"
                        >
                            <p>Next</p>
                            <IoIosArrowDropright className="text-2xl" />
                        </button>
                    )}
                </div>
            </div>

           <div className="min-h-[calc(100vh-10rem)] flex justify-center items-start border-b-2 border-richblack-700 p-8 mt-[6rem]">
            <video className="min-h-[calc(100vh-15rem)] aspect-video rounded-lg" controls src={currentVideo?.videoUrl}></video>
           </div>

           <div className="pl-16 flex flex-col gap-4 p-8 border-b-2 border-richblack-700">
            <h1 className="text-richblack-5 text-4xl">{currentVideo?.title}</h1>
            <h2 className="text-richblack-100 text-2xl">{currentVideo?.description}</h2>
           </div>

        </>
    );
};
export default LectureContent;
