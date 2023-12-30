const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // compare both password
  if (currentPassword === newPassword) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Old Password and New Password must not be same.",
    });
  }

  try {
    const findAccount = await User.findById(req.user.id);
    //   compare password with old password
    const isPassMatched = await bcrypt.compare(
      currentPassword,
      findAccount.password
    );

    if (!isPassMatched) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Wrong Password",
      });
    }

    // hash password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(newPassword, 10);
    } catch (error) {
      return res.json({
        status: false,
        error: error,
        message: "Error in Password Hashing.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      password: hashPassword,
    });

    try {
        
      await mailSender(
        updatedUser?.email,
        "Password updated successfully",
        `<h1>Password updated successfully</h1>`
      );
      
      console.log("password updation mail sent successfully");

    } catch (error) {
      console.log("password updation mail send failed : ", error.message);
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      updatedUser,
      message: "Password updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      error: error,
      message: "Password updation Failed.",
    });
  }
};

module.exports = changePassword;
