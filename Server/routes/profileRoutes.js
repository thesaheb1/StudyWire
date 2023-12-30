//***************************************************************************//
//                                  Import                                   //
//***************************************************************************//
const express = require("express");
const router = express.Router();

//***************************************************************************//
//                            Import Controllers                             //
//***************************************************************************//

//-------------------------|Profile Controllers|--------------------------//
const {
  updateProfile,
  deleteAccount,
  getUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/profile");

//-------------------------|Authentication Controller|--------------------------//
const AuthN = require("../middlewares/authentication");

//***************************************************************************//
//                               Profile Routes                               //
//***************************************************************************//

//-------------------------|Update Profile (Only LoggedIn User)|--------------------------//
router.put("/update-profile", AuthN, updateProfile);

//-------------------------|Delete Profile (Only LoggedIn User)|--------------------------//
router.delete("/delete-account", AuthN, deleteAccount);

//-------------------------|Get user's Details (Only LoggedIn User)|--------------------------//
router.get("/get-user-details", AuthN, getUserDetails);

//-------------------------|Update Display Picture (Only LoggedIn User)|--------------------------//
router.put("/update-dp", AuthN, updateDisplayPicture);

//-------------------------|Get user's Enrolled Courses (Only LoggedIn User)|--------------------------//
router.get("/get-enrolled-courses", AuthN, getEnrolledCourses);

//***************************************************************************//
//                              Export Router                                //
//***************************************************************************//
module.exports = router;
