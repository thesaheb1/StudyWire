const Section = require("../models/sectionModel");
const Course = require("../models/courseModel");

exports.createSection = async (req, res) => {
  const { sectionName, courseId } = req.body;

  if (!sectionName || !courseId) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Missing Fields Required",
    });
  }

  try {
    const newSection = await Section.create({ sectionName });

    const courseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Course Section Not Updated",
      });
    }

    return res.status(201).json({
      status: true,
      statusCode: 201,
      data: courseDetails,
      message: "Section Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Section Creation failed, try again later",
    });
  }
};

exports.updateSection = async (req, res) => {
  const { sectionName, sectionId } = req.body;

  if (!sectionName || !sectionId) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Missing Fields Required",
    });
  }

  try {
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Section Updation Failed",
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: updatedSection,
      message: "Section Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Section Updation failed, try again later",
    });
  }
};

exports.deleteSection = async (req, res) => {
  const { sectionId, courseId } = req.body;

  if (!sectionId || !courseId) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Unprocessable request",
    });
  }
  try {
    await Section.findByIdAndDelete(sectionId);
    const courseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { courseContent: sectionId },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: courseDetails,
      message: "Section deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      statusCode: 500,
      error: error.message,
      message: "Section deletion Failed",
    });
  }
};
