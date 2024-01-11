import React, { useEffect, useRef, useState } from "react";

import { FiMenu } from "react-icons/fi";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BsArrowRepeat } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCompletedVideos, setShowCourseMenu } from "../../../redux/feature/viewCourseSlice";
import { markLectureAsComplete } from "../../../services/operations/courseOperation";

const LectureContent = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { entireCourse, entireCourseSection, showCourseMenu } =
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
            dispatch(setCompletedVideos(response))
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
            <div className="w-full h-[6rem] flex justify-between items-center px-4 border-b-2 border-richblack-700 bg-richblack-800">
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

            <div className="min-h-[calc(100vh-10rem)] flex justify-center items-start border-b-2 border-richblack-700 p-8 relative">
                <video ref={videoRef} className="min-h-[calc(100vh-15rem)] aspect-video rounded-lg" controls autoPlay onEnded={() => { setVideoEnded(true) }} src={currentVideo?.videoUrl}>

                </video>
                {videoEnded && <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] flex justify-center items-center gap-2">
                    <button disabled={loading} onClick={rewatchHandler}
                        className="px-4 text-xl py-1 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 rounded-lg transition-all duration-200 flex justify-center items-center gap-2"
                    >
                        <BsArrowRepeat className="text-2xl" />
                        <p>Rewatch</p>
                    </button>
                    <button
                        disabled={loading}
                        onClick={markAsCompletedHandler}
                        className="px-4 text-xl py-1 bg-yellow-50 hover:bg-yellow-100 text-richblack-900  rounded-lg transition-all duration-200 flex justify-center items-center gap-2"
                    >
                        <p>MarkAsCompleted</p>
                        <IoIosCheckmarkCircleOutline className="text-2xl" />
                    </button>
                </div>}
            </div>

            <div className="pl-16 flex flex-col gap-4 p-8 border-b-2 border-richblack-700">
                <h1 className="text-richblack-5 text-4xl">{currentVideo?.title}</h1>
                <h2 className="text-richblack-100 text-2xl">{currentVideo?.description}</h2>
            </div>

        </>
    );
};
export default LectureContent;
