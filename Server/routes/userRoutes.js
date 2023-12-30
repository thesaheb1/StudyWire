//***************************************************************************//
//                                  Import                                   //
//***************************************************************************//
const express = require("express");
const router = express.Router();

//***************************************************************************//
//                            Import Controllers                             //
//***************************************************************************//

//-------------------------|Login & Signup Controllers|--------------------------//
const signUp = require("../controllers/signUp");
const logIn = require("../controllers/logIn");

//-------------------------|Send Otp Controller|--------------------------//
const sendOtp = require("../controllers/sendOtp");

//-------------------------|Change Pasword Controller|--------------------------//
const changePassword = require("../controllers/changePassword");

//-------------------------|Generate Reset Pasword Link Controller|--------------------------//
const {
  generateResetPasswordLink,
  resetPassword,
} = require("../controllers/resetPassword");

//-------------------------|Authentication Controller|--------------------------//
const AuthN = require("../middlewares/authentication");

//***************************************************************************//
//                            Authentication Routes                          //
//***************************************************************************//

//-------------------------|Login & Signup|--------------------------//
router.post("/signup", signUp);
router.post("/login", logIn);

//-------------------------|Send otp verification while signing up|--------------------------//
router.post("/send-otp", sendOtp);

//***************************************************************************//
//                        Change & Reset Password Routes                     //
//***************************************************************************//

//-------------------------|Change Pasword (Only LoggedIn User)|--------------------------//
router.post("/change-password", AuthN, changePassword);

//-------------------------|Generate token for resetting the password|--------------------------//
router.post("/reset-password-token", generateResetPasswordLink);

//-------------------------|Reset the password|--------------------------//
router.post("/reset-password", resetPassword);

//***************************************************************************//
//                              Export Router                                //
//***************************************************************************//
module.exports = router;
