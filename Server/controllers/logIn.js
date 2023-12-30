// imports
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//***************************************************************************//
//                                   LogIn                                   //
//***************************************************************************//
const logIn = async (req, res) => {
  // get data form client
  const { email, password } = req.body;

  // validate data
  if (!email || !password) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Missing required fields.",
    });
  }

  try {
    // check user is exists or not
    const isUserExists = await User.findOne({ email })
      .populate("additionalDetails")
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

    if (!isUserExists) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User is not Registered.",
      });
    }

    // check password is correct or incorrect
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExists.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Invalid password.",
      });
    }

    // create token and pass into cookie
    const token = jwt.sign(
      {
        id: isUserExists._id,
        email: isUserExists.email,
        accountType: isUserExists.accountType,
        additionalDetails: isUserExists.additionalDetails,
      },
      process.env.JWT_SECRET_KEY
    );

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      status: true,
      statusCode: 200,
      data: isUserExists,
      token: token,
      message: "account LogIn Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Can not be LogIn, Try Again Later.",
    });
  }
};

// exports
module.exports = logIn;
