//***************************************************************************//
//                                  Import                                   //
//***************************************************************************//
const express = require("express");
const router = express.Router();

//***************************************************************************//
//                            Import Controllers                             //
//***************************************************************************//

//-------------------------|Payment Controller|--------------------------//
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/payments");

//-------------------------|Authentication Controller|--------------------------//
const AuthN = require("../middlewares/authentication");

//-------------------------|Authorization Controller|--------------------------//
const { isStudent } = require("../middlewares/authorization");

//***************************************************************************//
//                               Payment Routes                               //
//***************************************************************************//

//-------------------------|Capture Course (only Instructor)|--------------------------//
router.post("/capture-payment", AuthN, isStudent, capturePayment);

//-------------------------|Verify Payment (only Instructor)|--------------------------//
router.post("/verify-payment", AuthN, isStudent, verifyPayment);

//-------------------------|Send Payment Success Email (only Instructor)|--------------------------//
router.post("/send-payment-success-email", AuthN, isStudent, sendPaymentSuccessEmail);

//***************************************************************************//
//                              Export Router                                //
//***************************************************************************//
module.exports = router;
