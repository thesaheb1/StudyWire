const SubSection = require("../models/Subsection")
const CourseProgress = require("../models/CourseProgress")

exports.updateCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req?.body
    const userId = req?.user?.id

    // Check if any of the required fields are missing
    if (
        !courseId ||
        !subSectionId ||
        !userId
    ) {
        return res.status(400).json({
            status: false,
            statusCode: 400,
            message: "All Fields are Mandatory",
        })
    }

    try {
        // Check if the subsection is valid
        const subSection = await SubSection.findById(subSectionId)
        if (!subSection) {
            return res.status(404).json({
                status: false,
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
                status: false,
                statusCode: 404,
                message: "Course progress Does Not Exist",
            })
        } else {
            // If course progress exists, check if the subsection is already completed
            if (courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(409).json({
                    status: false,
                    statusCode: 409,
                    message: "Lecture already mark as Watched",
                })
            }

            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push(subSectionId)
        }

        // Save the updated course progress
        await courseProgress.save()

        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Lecture marked as Watched",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: "Internal Server Error",
        })
    }
}