const User = require("../models/userModel");
const Otp = require("../models/otpModel");
const Profile = require("../models/profileModel");
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
    const userDetails = await User.findById(userId);
    await Otp.findOneAndDelete(userDetails?.email);
    await Profile.findByIdAndDelete(userDetails.additionalDetails);
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
    const userDatails = await User.findById(userId).populate("additionalDetails")
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
    
      console.log("cloud name : ", process.env.CLOUDINARY_CLOUD_NAME)
      console.log("api key name : ", process.env.CLOUDINARY_API_KEY)
      console.log("api secret name : ", process.env.CLOUDINARY_API_SECRET)

      console.log("Img Error : ",error);
      console.log("Img Error msg : ",error.message);
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

// Show Enrolled Courses
exports.getEnrolledCourses = async (req, res) => {
  const userId = req?.user?.id;

  try {
    const userEnrolledCourses = User.findById(userId)
      .populate("courses")
      .exec();
    if (!userEnrolledCourses) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User Courses Not Found",
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: userEnrolledCourses,
      message: "User Courses Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Failed to fetch user Courses",
    });
  }
};
