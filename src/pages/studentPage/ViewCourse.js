import React, { useEffect, useState } from 'react'

import { fetchCourseDetails } from "../../services/operations/courseOperation";

import CourseAccordionator from "../../components/core/viewCourse/CourseAccordionator";
import LectureContent from '../../components/core/viewCourse/LectureContent';

import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setEntireCourse, setEntireCourseSection } from "../../redux/feature/viewCourseSlice";

const ViewCourse = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response = await fetchCourseDetails({ courseId });
                if (response) {
                    dispatch(setEntireCourse(response));
                    dispatch(setEntireCourseSection(response?.courseContent));
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
                <CourseAccordionator />
                <div className='w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-richblack-800'>
                <LectureContent />
                </div>
            </div>
        )
}

export default ViewCourse