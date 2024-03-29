//***************************************************************************//
//                                  Import                                   //
//***************************************************************************//
const express = require("express");
const router = express.Router();

//***************************************************************************//
//                            Import Controllers                             //
//***************************************************************************//

//-------------------------|Course Controller|--------------------------//
const {
  createCourse,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getAllCourses,
  getCourseDetails,
  getEnrolledCourses,
} = require("../controllers/course");

//-------------------------|Section Controller|--------------------------//
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section");

//-------------------------|Sub-Section Controller|--------------------------//
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/subSection");

//-------------------------|Rating And Review Controller|--------------------------//
const {
  createRatingAndReview,
  getAverageRating,
  getAllRatingAndReviewed,
} = require("../controllers/ratingAndReview");

//-------------------------|Category Controller|--------------------------//
const {
  createCategory,
  getAllCategory } = require("../controllers/category");

//-------------------------|Course Progress Controller|--------------------------//
const { updateCourseProgress } = require("../controllers/courseProgress");

//-------------------------|Authentication Controller|--------------------------//
const AuthN = require("../middlewares/authentication");

//-------------------------|Authorization Controller|--------------------------//
const {
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/authorization");

//***************************************************************************//
//                               Course Routes                               //
//***************************************************************************//

//-------------------------|Create Course (only Instructor)|--------------------------//
router.post("/create-course", AuthN, isInstructor, createCourse);

//-------------------------|Update Course (only Instructor)|--------------------------//
router.put("/edit-course", AuthN, isInstructor, editCourse);

//-------------------------|Get user's Enrolled Courses (Only LoggedIn User)|--------------------------//
router.get("/get-enrolled-courses", AuthN,isStudent, getEnrolledCourses);

//-------------------------|get Courses (only Instructor)|--------------------------//
router.get("/instructor-courses", AuthN, isInstructor, getInstructorCourses);

//-------------------------|Delete Course (only Instructor)|--------------------------//
router.delete("/delete-course", AuthN, isInstructor, deleteCourse);

//-------------------------|Show All courses (everyone)|--------------------------//
router.get("/get-all-courses", getAllCourses);

//-------------------------|Show course Details (everyone)|--------------------------//
router.post("/get-course-details", getCourseDetails);

//***************************************************************************//
//                               Section Routes                              //
//***************************************************************************//

//-------------------------|Create Section (only Instructor)|--------------------------//
router.post("/create-section", AuthN, isInstructor, createSection);

//-------------------------|Update Section (only Instructor)|--------------------------//
router.put("/update-section", AuthN, isInstructor, updateSection);

//-------------------------|Delete Section (only Instructor)|--------------------------//
router.delete("/delete-section", AuthN, isInstructor, deleteSection);

//***************************************************************************//
//                            Sub Section Routes                             //
//***************************************************************************//

//-------------------------|Create Sub Section (only Instructor)|--------------------------//
router.post("/create-sub-section", AuthN, isInstructor, createSubSection);

//-------------------------|Update Sub Section (only Instructor)|--------------------------//
router.put("/update-sub-section", AuthN, isInstructor, updateSubSection);

//-------------------------|Delete Sub Section (only Instructor)|--------------------------//
router.delete("/delete-sub-section", AuthN, isInstructor, deleteSubSection);

//***************************************************************************//
//                          Rating And Review Routes                         //
//***************************************************************************//

//-------------------------|Create Rating And Review (only Student)|--------------------------//
router.post(
  "/create-rating-and-review",
  AuthN,
  isStudent,
  createRatingAndReview
);

//***************************************************************************//
//                            Course Progress Routes                         //
//***************************************************************************//

//-------------------------|Update Course Progress (only Student)|--------------------------//
router.put(
  "/update-course-progress",
  AuthN,
  isStudent,
  updateCourseProgress
);

//-------------------------|Get Average Rating And Review (Everyone)|--------------------------//
router.post("/get-average-rating", getAverageRating);

//-------------------------|Get All Rating And Review (Everyone)|--------------------------//
router.get("/get-all-rating-and-review", getAllRatingAndReviewed);

//***************************************************************************//
//                                Category Routes                            //
//***************************************************************************//

//-------------------------|Create Category (only Admin)|--------------------------//
router.post("/create-category", AuthN, isAdmin, createCategory);

//-------------------------|Get all Category (Everyone)|--------------------------//
router.get("/get-all-category", getAllCategory);

//***************************************************************************//
//                              Export Router                                //
//***************************************************************************//
module.exports = router;
