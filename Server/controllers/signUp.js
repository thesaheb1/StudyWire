// imports
const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const bcrypt = require('bcrypt');

//***************************************************************************//
//                                   SignUp                                  //
//***************************************************************************//
const signUp = async (req, res) => {
    // get data from client
    const {
      firstName,
      lastName = "",
      email,
      password,
      accountType,
      otp
    } = req.body;
  
    // validate data
    if (!firstName || !email || !password || !accountType || !otp) {
      return res.status(422).json({
        status: false,
        statusCode: 422,
        message: "Missing required fields.",
      });
    }
  
    try {
        // check user is already exists or not
      const isUserExists = await User.findOne({ email });

      if (isUserExists) {
        return res.status(409).json({
          status: false,
          statusCode: 409,
          message: "User is Already Registered.",
        });
      }

        // otp verification
        const userOtp = await Otp.findOne({email});

        if (userOtp?.otpExpires < Date.now()) {
          return res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Otp is Expired, Please Regenerate Your otp",
          });
        }
    

        if(otp !== userOtp.otp){
          return res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Please Enter Correct OTP.",
          })
        }

        // password Hashing
      let hashPassword;
      try {
        hashPassword = await bcrypt.hash(password, 10);
      } catch (error) {
        return res.json({
          status: false,
          error: error,
          message: "Error in Password Hashing.",
        });
      }
    
      // create user's profile
      const userProfile = await Profile.create({
        about: null,
        dateOfBirth: null,
        gender: null,
        phoneNumber: null,
      });
  
      // create user's entry into the database
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password:hashPassword,
        accountType,
        additionalDetails: userProfile._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
      });
  
      // send data as response
      return res.status(201).json({
        status: true,
        statusCode: 201,
        data: newUser,
        message: "Account Created Successfully.",
      });
    } catch (error) {
        console.log(error);
      return res.status(500).json({
        status: false,
        statusCode: 500,
        error:error,
        message: "Account Can not be created, Try Again Later.",
      });
    }
  };

  // exports
  module.exports = signUp;