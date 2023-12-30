const User = require("../models/userModel");
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

//***************************************************************************//
//                        Generate-ResetPassword-Link                        //
//***************************************************************************//
exports.generateResetPasswordLink = async (req, res) => {
  // get email form client
  const { email } = req.body;
  // check if email is empty or not
  if (!email) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Please Enter Your Email",
    });
  }
  
  try {
    // check account already exists or not
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User is not found",
      });
    }

    // generate token
    const token = crypto.randomBytes(64).toString("hex");
    // update token into the databse
    await User.findOneAndUpdate({email}, {
      token,
      resetPasswordExpires: Date.now() + 5 * 60 * 1000,
    });
  
    // generate reset-password url
    const url = `http://localhost:3000/update-password/${token}`;

    // send url to user via email
    try {await mailSender(
      email,
      "Password Reset Link",
      `<h1>Reset your password</h1> <br/> <h3>LINK: ${url}</h3>`
    );
    console.log("password reset url sent successfully on your email");
  }catch(error){
    console.log("password reset url failed to sent on your email : ", error.message);
    }

    // return success response
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    // return failure response
    return res.json({
      status: false,
      error: error.message,
      message: `Some Error in Sending the Reset Link`,
    });
  }
};
//***************************************************************************//
//                                ResetPassword                              //
//***************************************************************************//

exports.resetPassword = async (req, res) => {
    // get data from client
  const { password, confirmPassword, token } = req.body;
    // check if password fields are empty or not
  if (!password || !confirmPassword) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Missing required fields.",
    });
  }
    // check if token is empty or not
  if (!token) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Missing Token.",
    });
  }
    // check both password are same or not
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Password and Confirm Password must be same.",
    });
  }

  try {
    // check provided token is valid or not
    const isTokenValid = await User.findOne({ token });

    if (!isTokenValid) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Token is inValid",
      });
    }

    // check if reset token expires or not
    if (isTokenValid.resetPasswordExpires < Date.now()) {
      
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Token is Expired, Please Regenerate Your Token",
      });
    }

    // everything is okay now we can update the password

    // hash the password before updating into DB
    let hashPassword;
    try {
        hashPassword = await bcrypt.hash(password, 10);
        
    } catch (error) {
        return res.json({
            status:false,
            error:error,
            message:"Error in Password hashing"
        })
    }

    // update password into DB
    const userUpdated = await User.findOneAndUpdate({token}, {password:hashPassword}, {new:true});

    // send message to user after successfull updation via email
    try {
      await mailSender(userUpdated.email, "Password Reset Successfully", `You have reset your password successfully.`)
      
      console.log("reset password mail sent successfully");
    }catch(error){
      console.log("reset password mail failed to send");
    }

    // return successfull response
    return res.status(200).json({
        status:true,
        statusCode:200,
        message:"Password Reset Successfully"
    })



  } catch (error) {
    // return failure response
    return res.json({
        status:false,
        error:error,
        message:"Some Error in Reseting the Password, Try again later"
    })
  }
};
