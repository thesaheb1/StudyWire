const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/Subsection")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")

exports.updateCourseProgress = async (req, res) => {
    const { courseId, subsectionId } = req.body
    const userId = req.user.id

    // Check if any of the required fields are missing
    if (
        !courseId ||
        !subsectionId ||
        !userId
    ) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "All Fields are Mandatory",
        })
    }

    try {
        // Check if the subsection is valid
        const subsection = await SubSection.findById(subsectionId)
        if (!subsection) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Invalid Subsection",
            })
        }

        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        if (!courseProgress) {
            // If course progress doesn't exist, create a new one
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Course progress Does Not Exist",
            })
        } else {
            // If course progress exists, check if the subsection is already completed
            if (courseProgress.completedVideos.includes(subsectionId)) {
                return res.status(409).json({
                    success: false,
                    statusCode: 409,
                    message: "Lecture already mark as Watched",
                })
            }

            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push(subsectionId)
        }

        // Save the updated course progress
        await courseProgress.save()

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Lecture marked as Watched",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error",
        })
    }
}