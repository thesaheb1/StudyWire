const Otp = require("../models/otpModel");
const User = require("../models/userModel");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");

const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "E-mail is required",
    });
  }

  try {
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(409).json({
        status: false,
        statusCode: 409,
        message: "User is Already Registered.",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let isOtpExists = await Otp.findOne({ otp });

    while (isOtpExists) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      isOtpExists = await Otp.findOne({ otp });
    }
    
    const isOtpEmailExists = await Otp.findOne({ email });

    if (isOtpEmailExists) {
      const otpData = await Otp.findOneAndUpdate(
        { email },
        { otp, otpExpires: Date.now() + 5 * 60 * 1000 }, {new :true}
      );

      //  send mail
      try {
        const mailResponse = await mailSender(
          otpData?.email,
          "Verification E-Mail",
          `<h1>Your OTP : ${otpData?.otp}</h1>`
        );
        console.log("Email sent successfully: ", mailResponse.response);
      } catch (error) {
        console.log("Error occurred while sending email: ", error);
      }

      return res.status(200).json({
        status: true,
        statusCode: 200,
        otpData,
        message: "Otp sent Successfully",
      });
    }

    const otpData = await Otp.create({
      email,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000,
    });

    try {
      const mailResponse = await mailSender(
        otpData?.email,
        "Verification E-Mail",
        `<h1>Your OTP : ${otpData?.otp}</h1>`
      );
      console.log("Email sent successfully: ", mailResponse.response);
    } catch (error) {
      console.log("Error occurred while sending email: ", error);
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      otpData,
      message: "Otp sent Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      error: error.message,
      message: "Otp can not be sent, Please try again Later",
    });
  }
};

module.exports = sendOtp;
