const Section = require("../models/sectionModel");
const SubSection = require("../models/subSectionModel");
const {
  imageUploaderToCloudinary,
} = require("../utils/imageUploaderToCloudinary");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
  const { title, description, sectionId } = req?.body;
  const video = req?.files?.video;

  if (!title || !description || !video || !sectionId) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Mising fields Required",
    });
  }

  try {
    let videoUrl;
    try {
      videoUrl = await imageUploaderToCloudinary(
        video,
        process.env.CLOUDINARY_FOLDER_NAME
      );
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        error: error.message,
        message: "Video Upload Failed, Try Again Later",
      });
    }

    const newSubSection = await SubSection.create({
      title,
      description,
      timeDuration: videoUrl.duration,
      videoUrl: videoUrl.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: newSubSection._id } },
      { new: true }
    )
      .populate("subSection")
      .exec();

    if (!updatedSection) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Section Not Updated",
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
      message: "SubSection Creation failed, try again later",
    });
  }
};

exports.updateSubSection = async (req, res) => {
  const { title, description, subSectionId, sectionId } = req?.body;


  try {
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "SubSection not found"
      })
    }
    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description;
    }


    if (req?.files && req?.files?.video !== undefined) {
      let video = req?.files?.video;

      try {
        const videoUrl = await imageUploaderToCloudinary(
          video,
          process.env.CLOUDINARY_FOLDER_NAME
        );
        subSection.videoUrl = videoUrl?.secure_url;
        subSection.timeDuration = videoUrl?.duration;
      } catch (error) {
        return res.status(500).json({
          status: false,
          statusCode: 500,
          error: error.message,
          message: "Video Upload Failed, Try Again Later",
        });
      }
    }

    await subSection?.save();

    console.log("UploadSection ....... : ", title, description, subSectionId, sectionId);

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    if (!updatedSection) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "SubSection Not Updated",
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: updatedSection,
      message: "SubSection Updated Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "SubSection Updation failed, try again later",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  const { subSectionId, sectionId } = req.body;

  if (!subSectionId || !sectionId) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Unprocessable request",
    });
  }

  try {
    await SubSection.findByIdAndDelete(subSectionId);

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSection: subSectionId },
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: updatedSection,
      message: "SubSection deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      statusCode: 500,
      error: error.message,
      message: "SubSection deletion Failed",
    });
  }
};
