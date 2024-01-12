import React, { useEffect, useRef, useState } from "react";

import { FiMenu } from "react-icons/fi";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsArrowRepeat } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setShowCourseMenu, updateCompletedVideos } from "../../../redux/feature/viewCourseSlice";
import { markLectureAsComplete } from "../../../services/operations/courseOperation";
import ProgressBar from "@ramonak/react-progress-bar";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";

const LectureContent = ({setReviewModal}) => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { entireCourse, entireCourseSection, showCourseMenu, completedVideos, totalNoOfLectures } =
        useSelector((state) => state.viewCourse);
    const { token } = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState({});
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    let videoRef = useRef();

    const rewatchHandler = () => {
        if (videoRef?.current) {
            // set the current time of the video to 0
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setVideoEnded(false)
        }
    }
    const markAsCompletedHandler = async () => {
        setLoading(true)
        const response = await markLectureAsComplete(
            { courseId, subSectionId },
            token
        )
        if (response) {
            dispatch(updateCompletedVideos(subSectionId))
        }
        setLoading(false)
    }

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
                setVideoEnded(false);
                return;
            }
        })();
        console.log("EFFECT rendered video..........");
        // eslint-disable-next-line
    }, [entireCourse, entireCourseSection, location.pathname])

    console.log("UI rendered video..........");
    return (
        <>
            <div className="w-full sm:h-[6rem] flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 border-b-2 border-richblack-700 bg-richblack-800">

                <div className="flex justify-start sm:justify-center items-center gap-4 text-base sm:text-xl text-richblack-5 font-medium py-4">
                    <FiMenu
                        onClick={() => {
                            dispatch(setShowCourseMenu(!showCourseMenu));
                        }}
                        className="hidden sm:block text-3xl cursor-pointer"
                    />
                    <p>{entireCourse?.courseName}</p>
                </div>
                <div className="sm:hidden flex justify-between items-center pb-4">
                    <p className='text-richblack-400 font-medium py-2'>Completed {completedVideos?.length}/{totalNoOfLectures}</p>
                    <Link to={"/dashboard/enrolled-courses"} className="cursor-pointer px-4 py-1 border-2 border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"><BiArrowBack className="text-2xl" /><p>Back</p></Link>
                </div>
                <div className="flex justify-end sm:justify-center items-center gap-2 pb-4 sm:pb-auto">
                    {!isFirstVideo() && (
                        <button
                            disabled={loading}
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
                            disabled={loading}
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

            <div className="w-full flex flex-col justify-start items-center border-b-2 border-richblack-700 2xl:pt-8">
                <div className="w-full relative flex justify-center items-center">
                    <video ref={videoRef} className="w-full 2xl:w-fit 2xl:h-[700px] aspect-video rounded-lg" controls autoPlay onEnded={() => { setVideoEnded(true) }} src={currentVideo?.videoUrl}>
                    </video>
                    {videoEnded && <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] flex justify-center items-center gap-2">
                        <button disabled={loading} onClick={rewatchHandler}
                            className="px-4 text-base sm:text-xl py-1 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"
                        >
                            <BsArrowRepeat className="text-xl sm:text-2xl" />
                            <p>Rewatch</p>
                        </button>
                        {!completedVideos?.includes(subSectionId) && <button
                            disabled={loading}
                            onClick={markAsCompletedHandler}
                            className="px-4 text-base sm:text-xl py-1 bg-yellow-50 hover:bg-yellow-100 text-richblack-900  rounded-lg transition-all duration-200 flex justify-center items-center gap-2"
                        >
                            <p>MarkAsCompleted</p>
                            <IoIosCheckmarkCircleOutline className="text-xl sm:text-2xl" />
                        </button>}
                    </div>}
                </div>
                <div className="sm:hidden flex justify-between items-center gap-x-4 w-[90%]">
                    <ProgressBar className="w-full" completed={(completedVideos?.length / totalNoOfLectures) * 100} bgColor="#FFD60A" baseBgColor="#585D69" isLabelVisible={false} height="10px" />
                    <p className="text-yellow-50 text-lg font-bold">{(completedVideos?.length / totalNoOfLectures) * 100}%</p>
                </div>
                <button onClick={() => setReviewModal(true)} className="sm:hidden w-[90%] my-4 py-1 border-2 border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"><AiOutlinePlusCircle className="text-2xl" /><p>Add Review</p></button>

                <div className="w-full pl-4 md:pl-8 2xl:pl-16 flex flex-col items-start gap-4 p-8 border-t-2 border-richblack-700 mt-8">
                    <h1 className="text-richblack-5 text-4xl">{currentVideo?.title}</h1>
                    <h2 className="text-richblack-100 text-2xl">{currentVideo?.description}</h2>
                </div>
            </div>

        </>
    );
};
export default LectureContent;
