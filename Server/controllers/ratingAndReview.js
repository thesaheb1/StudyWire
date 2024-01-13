const RatingAndReview = require("../models/ratingAndReviewModel");
const Course = require("../models/courseModel");
const mongoose = require("mongoose");

exports.createRatingAndReview = async (req, res) => {
  const { rating, review, courseId } = req.body;
  const userId = req.user.id;

  if (!rating || !review || !courseId) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      Message: "Missing required Fields",
    });
  }

  try {
    // check user has purchased this course or not
    // const isUserPurchased = await Course.findOne({
    //   _id: courseId,
    //   enrolledStudent: { $elemMatch: { userId } },
    // });
    const isUserPurchased = await Course.findById(courseId);

    if (
      !isUserPurchased ||
      !isUserPurchased.enrolledStudent.includes(
        new mongoose.Types.ObjectId(userId)
      )
    ) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User is not registered with this Course",
      });
    }

    // check if user has already reviewed or not
    const isUserReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (isUserReviewed) {
      return res.status(409).json({
        status: false,
        statusCode: 409,
        message: "User has already Reviewed This Course",
      });
    }

    // create rating and review

    const createdRatingAndReviewed = await RatingAndReview.create({
      rating,
      review,
      user: userId,
      course: courseId,
    });

    const UpdatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      { $push: { ratingAndReview: createdRatingAndReviewed._id } },
      { new: true }
    )
      .populate("ratingAndReview")
      .exec();

    return res.status(201).json({
      status: true,
      statusCode: 201,
      data: UpdatedCourseDetails,
      message: "Thanks For Rating and Review",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Something Went Wrong, Try Again Later",
    });
  }
};

exports.getAverageRating = async (req, res) => {
  const { courseId } = req.body;

  try {
    const averageRatingResult = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    //return rating
    if (averageRatingResult.length > 0) {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        averageRating: averageRatingResult[0].averageRating,
        message: "Average Rating fetched Successfully",
      });
    }

    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "0 Rating",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Something Went Wrong",
    });
  }
};

exports.getAllRatingAndReviewed = async (req, res) => {
  try {
    const allRating = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: ["firstName", "lastName", "email", "image"],
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    if (!allRating) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "there is no rating and review",
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: allRating,
      message: "Review fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Something Went Wrong",
    });
  }
};
