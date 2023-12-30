const instance = require("../config/razorpay");
const User = require("../models/userModel");
const crypto = require("crypto");
const Course = require("../models/courseModel");
const mailSender = require("../utils/mailSender");
const CourseProgress = require("../models/courseProgressModel");
const mongoose = require("mongoose");
require('dotenv').config();

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req?.body
  const userId = req?.user?.id

  if (courses?.length === 0) {
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "Course ID Not Found"
    })
  }

  let total_amount = 0

  console.log("Courses : " + courses);
  for (const course_id of courses) {
    let course
    console.log("Course_id : " + course_id);
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(404)
          .json({
            status: false,
            statusCode: 404,
            message: "Could not find the course"
          })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course?.enrolledStudent?.includes(uid)) {
        return res
          .status(409)
          .json({
            status: false,
            statusCode: 409,
            message: "Student is already Enrolled in course"
          })
      }

      // Add the price of the course to the total amount
      total_amount += course.price

    } catch (error) {

      console.log(error)
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: error.message
      })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {

    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    if (!paymentResponse) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        data: paymentResponse,
        message:"Failed to create order"
      })
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: paymentResponse,
      message: "Order created successfully"
    })

  } catch (error) {
    console.log(error)
    return res.status(402).json({
      status: false,
      statusCode: 402,
      message: "Could not initiate order."
    })
  }

}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req?.body?.razorpay_order_id
  const razorpay_payment_id = req?.body?.razorpay_payment_id
  const razorpay_signature = req?.body?.razorpay_signature
  const courses = req?.body?.courses

  const userId = req?.user?.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Unprocessable entity"
    })
  }

  try {
    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex")

    if (expectedSignature === razorpay_signature) {

      await enrollStudents(courses, userId, res)
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Payment Verified"
      })

    }

    return res.status(402).json({
      status: false,
      statusCode: 402,
      message: "Payment Failed"
    })

  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "internal server error"
    })
  }
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req?.body

  const userId = req?.user?.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(422)
      .json({
        status: false,
        statusCode: 422,
        message: "Payment mail send failed"
      })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      `<div>
        <p>Name : ${enrolledStudent.firstName} ${enrolledStudent.lastName}</p>
        <p>Amount: ${amount / 100}</p>
        <p>OrderId : ${orderId}</p>
        <p>PaymentId : ${paymentId}</p>
      </div>`

    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(500)
      .json({
        status: false,
        statusCode: 500,
        message: "Could not send email"
      })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {

  if (!courses || !userId) {
    return res
      .status(422)
      .json({
        status: false,
        statusCode: 422,
        message: "Please Provide Course ID and User ID"
      })
  }

  try {
    for (const courseId of courses) {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { enrolledStudent: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(404)
          .json({
            status: false,
            statusCode: 404,
            message: "Course not found"
          })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      })

      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress?._id,
          },
        },
        { new: true }
      )

      if (!enrolledStudent) {
        return res
          .status(404)
          .json({
            status: false,
            statusCode: 404,
            message: "User not found"
          })
      }
      console.log("Enrolled student: ", enrolledStudent)


      // Send an email notification to the enrolled student
      try {
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          `{<div>
            <p>Name : ${enrolledStudent.firstName + " " + enrolledStudent.lastName}</p>
            <p>Course Name: ${enrolledCourse.courseName}</p>
          </div>}`,
        )
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(503).json({
          status: false,
          statusCode: 503,
          message: "Failed to sent Email"
        })
      }

    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Course could not enrolled"
    })
  }
}