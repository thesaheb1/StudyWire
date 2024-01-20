const User = require("../models/userModel");
const Otp = require("../models/otpModel");
const Profile = require("../models/profileModel");
const Course = require("../models/courseModel");
const RatingAndReview = require("../models/ratingAndReviewModel");
const CourseProgress = require("../models/courseProgressModel");
const {
  imageUploaderToCloudinary,
} = require("../utils/imageUploaderToCloudinary");
require("dotenv").config();


// profile updation
exports.updateProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    about = "",
    dateOfBirth = "",
    gender,
    phoneNumber,
    country
  } = req.body;

  if (!req?.user?.id) {
    console.log("user : ", req.user);
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "Profile not Found",
    });
  }

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req?.user?.additionalDetails,
      {
        about,
        dateOfBirth,
        gender,
        phoneNumber,
        country
      },
      { new: true }
    );

    if (!updatedProfile) {
      console.log("user : ", req.user);
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Profile Not Updated",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(req?.user?.id, {
      firstName,
      lastName,
    }, { new: true }).populate("additionalDetails")
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    if (!updatedUser) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "User Not Updated",
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: updatedUser,
      message: "User's Profile Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Profile Updation failed",
    });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  const userId = req?.user?.id;

  if (!userId) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Unprocessable request",
    });
  }

  try {

    // find the account
    const userDetails = await User.findById(userId);
    // delete the Otp in the account
    await Otp.findOneAndDelete(userDetails?.email);
    // delete user profile
    await Profile.findByIdAndDelete(userDetails.additionalDetails);



    // unenrolled from courses
    const unenrollCourse = await Course.find({ enrolledStudent: userId })
    if (unenrollCourse) {
      for (const course of unenrollCourse) {
        await Course.findByIdAndUpdate(course?._id, { $pull: { enrolledStudent: userId } })
      }
    }

    // delete review and ratings
    const deleteReview = await RatingAndReview.find({ user: userId })

    for (const review of deleteReview) {
      await RatingAndReview.findByIdAndDelete(review?._id)
      if (unenrollCourse) {
        for (const course of unenrollCourse) {
          await Course.findByIdAndUpdate(course?._id, { $pull: { ratingAndReview: review?._id } })
        }
      }
    }



    // delete courses progress
    const deleteCourseProgress = await CourseProgress.find({ userId: userId })
    if (deleteCourseProgress) {
      for (const progress of deleteCourseProgress) {
        await CourseProgress.findByIdAndDelete(progress?._id)
      }
    }

    // finally delete the user account
    const deletedUser = await User.findByIdAndDelete(userDetails._id);

    if (!deletedUser) {
      return res.status(400).json({
        status: false,
        statusCode: 422,
        message: "Something Went Wrong",
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: deletedUser,
      message: "Account Deleted Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Account Deletion Failed",
    });
  }
};

// ShowUserDetails

exports.getUserDetails = async (req, res) => {
  const userId = req?.user?.id;
  try {
    const userDatails = await User.findById(userId, {
      _id: true,
      firstName: true,
      lastName: true,
      email: true,
      accountType: true,
      image: true,
      token: true,
      additionalDetails: true,
      courses: true,
    })
      .populate("additionalDetails")
      .exec();
    if (!userDatails) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User Data Not Found",
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: userDatails,
      message: "User Data Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Failed to fetch user Data",
    });
  }
};

// Update Display Picture
exports.updateDisplayPicture = async (req, res) => {
  const userId = req?.user?.id;
  const DP = req?.files?.image;

  console.log("Display Picture Data....", DP);

  if (!DP) {
    return res.status(400).json({
      status: false,
      statusCode: 422,
      message: "image not found",
    });
  }

  try {
    let DpUrl;
    try {
      DpUrl = await imageUploaderToCloudinary(
        DP,
        process.env.CLOUDINARY_FOLDER_NAME,
        500,
        500
      );
      console.log("Dp uploaded on cloud Successfully");
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        error: error?.message,
        message: "Image Upload Failed, Try Again Later",
      });
    }
    const updatedDp = await User.findByIdAndUpdate(
      userId,
      { image: DpUrl.secure_url },
      { new: true }
    );
    if (!updatedDp) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Dp cannot be updated, try again Later",
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: updatedDp,
      message: "Dp Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Something went wrong While updating DP",
    });
  }
};


exports.getInstructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req?.user?.id })

    const courseData = courseDetails?.map((course) => {
      const totalStudentsEnrolled = course?.enrolledStudent?.length
      const totalAmountGenerated = totalStudentsEnrolled * course?.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course?._id,
        courseName: course?.courseName,
        courseDescription: course?.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: courseData,
      message: "Data Fetched successfully"
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error"
    })
  }
}
