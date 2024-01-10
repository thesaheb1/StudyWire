const Category = require("../models/categoryModel");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
const Section = require("../models/sectionModel");
const SubSection = require("../models/subSectionModel")
const {
  imageUploaderToCloudinary,
} = require("../utils/imageUploaderToCloudinary");

require("dotenv").config();

exports.createCourse = async (req, res) => {
  let {
    courseName,
    courseDescription,
    price,
    tags: _tags,
    category,
    status,
    courseLanguage,
    whatYouWillLearn,
    instructions: _instructions,
  } = req.body;
  const thumbnail = req.files.thumbnail;
  const userId = req.user.id;

  // Convert the tag and instructions from stringified Array to Array
  const tags = JSON.parse(_tags);
  const instructions = JSON.parse(_instructions);

  if (
    !courseName ||
    !courseDescription ||
    !price ||
    !tags?.length ||
    !category ||
    !courseLanguage ||
    !whatYouWillLearn ||
    !thumbnail ||
    !_instructions?.length
  ) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Missing required Fiels",
    });
  }

  if (!status || status === undefined) {
    status = "Draft";
  }

  try {
    let uploadedImage;
    try {
      uploadedImage = await imageUploaderToCloudinary(
        thumbnail,
        process.env.CLOUDINARY_FOLDER_NAME
      );
      console.log("Course thumbnail uploaded Successfully");
    } catch (error) {
      return res.json({
        status: false,
        error: error,
        message: "Thumbnail Upload Failed, Try Again Later",
      });
    }

    const createdCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      tags,
      category,
      courseLanguage,
      whatYouWillLearn,
      instructor: userId,
      thumbnail: uploadedImage.secure_url,
      status,
      instructions,
    });

    try {
      await Category.findByIdAndUpdate(category, {
        $push: { courses: createdCourse._id },
      });
    } catch (error) {
      return res.json({
        status: false,
        error: error,
        message: "Failed to update category, Try Again Later",
      });
    }

    try {
      await User.findByIdAndUpdate(userId, {
        $push: { courses: createdCourse._id },
      });
    } catch (error) {
      return res.json({
        status: false,
        error: error,
        message:
          "Failed to update course details in instructor Account, Try Again Later",
      });
    }
    return res.status(201).json({
      status: true,
      statusCode: 201,
      data: createdCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      error: error,
      message: "Failed to Create Course, Try Again Later",
    });
  }
};

// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Course not found",
      });
    }

    // If Thumbnail Image is found, update it
    if (req?.files) {
      const thumbnail = req?.files?.thumbnailImage;
      let uploadedImage;
      try {
        uploadedImage = await imageUploaderToCloudinary(
          thumbnail,
          process.env.CLOUDINARY_FOLDER_NAME
        );
        console.log("Course thumbnail updated Successfully");
      } catch (error) {
        return res.json({
          status: false,
          error: error,
          message: "Thumbnail update Failed, Try Again Later",
        });
      }
      course.thumbnail = uploadedImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tags" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(201).json({
      status: true,
      statusCode: 200,
      data: updatedCourse,
      message: "Course Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error,
      message: "Failed to Update Course, Try Again Later",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {status:"Published"},
      {
        courseName: true,
        price: true,
        tags: true,
        thumbnail: true,
        ratingAndReview: true,
        instructor: true,
        category:true,
        createdAt:true,
        courseLanguage: true,
        courseContent:true,
      }
    ).populate("ratingAndReview").populate("category").populate("instructor").exec();
    if (!allCourses) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Courses Not Found",
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: allCourses,
      message: "Courses Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      statusCode: 500,
      error: error.message,
      message: "Failed to fetch Courses",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req?.body;

    const selectedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndReview")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!selectedCourse) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: selectedCourse,
      message: "Course Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      statusCode: 500,
      error: error.message,
      message: "Failed to fetch Course",
    });
  }
};
exports.getInstructorCourses = async (req, res) => {
  const instructorId = req?.user?.id;

  try {
    const instructorCourses = await Course.find({
      instructor: instructorId
    }).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
      .exec();

    if (!instructorCourses) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: instructorCourses,
      message: "Course Fetched Successfully",
    });
    
  } catch (error) {
    return res.status(500).json({
      status: true,
      statusCode: 500,
      error: error.message,
      message: "Failed to fetch Course",
    });
  }
};



exports.deleteCourse = async (req, res) => {
  const { courseId } = req?.body;
  try {

    console.log("Deleting Course......", courseId);

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Course not found",
      })
    }


    // Unenrolled students from this Course
    const AllenrolledStudent = course?.enrolledStudent;
    for (const studentId of AllenrolledStudent) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId }
      })
    }

    // Delete Section and subSection of this course

    const Allsection = course?.courseContent;

    for (const sectionId of Allsection) {
      const section = await Section.findById(sectionId);
      if (section) {
        const AllsubSection = section?.subSection;
        for (const subSectionId of AllsubSection) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }


      await Section.findByIdAndDelete(sectionId);
    }
    //  delete course
    await Course.findByIdAndDelete(courseId);

    // remove from course creaters data's also
    await User.findByIdAndUpdate(req?.user?.id, {
      $pull:{courses : courseId}
    })

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Course has been deleted"
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Course deletion failed"
    })
  }
}