import React, { useEffect, useState } from 'react'

import { fetchCourseDetails } from "../../services/operations/courseOperation";

import CourseAccordionator from "../../components/core/viewCourse/CourseAccordionator";
import LectureContent from '../../components/core/viewCourse/LectureContent';

import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setCompletedVideos, setEntireCourse, setEntireCourseSection, setTotalNoOfLectures } from "../../redux/feature/viewCourseSlice";
import CourseReviewModal from '../../components/core/viewCourse/CourseReviewModal';

const ViewCourse = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [reviewModal, setReviewModal] = useState(false);
    const {credentialData} = useSelector(state => state.auth);



    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response = await fetchCourseDetails({ courseId , userId : credentialData?._id });
                if (response) {
                    dispatch(setEntireCourse(response?.data));
                    dispatch(setEntireCourseSection(response?.data?.courseContent));
                    dispatch(setCompletedVideos(response?.completedLectures));
                    console.log("Completed.....",response?.completedLectures);
                    let lectures = 0
                    response?.data?.courseContent?.forEach((section) => {
                      lectures += section.subSection.length
                    })
                    dispatch(setTotalNoOfLectures(lectures))
                }

            } catch (error) {
                toast.error("Could not fetch Course")
                console.log("Could not fetch Course")
            }
            setLoading(false);
        })();
        console.log("EFFECT rendered main..........");
        // eslint-disable-next-line
    }, [courseId]);

    console.log("UI rendered main..........");

    return loading ? (<div className="w-screen min-h-[calc(100vh)] pt-[4rem] flex justify-center items-center">
        <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>)
        : (
            <div className='w-screen min-h-[calc(100vh)] pt-[4rem] flex justify-between items-start'>
                <CourseAccordionator setReviewModal={setReviewModal} />
                <div className='w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-richblack-800'>
                <LectureContent />
                </div>
                {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
            </div>
        )
}

export default ViewCourse