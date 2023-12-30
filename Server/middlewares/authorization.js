//***************************************************************************//
//                               Authorization                               //
//***************************************************************************//

// Student Route
exports.isStudent = (req, res, next) => {
  if (req?.user?.accountType === "Student") {
    next();
    return;
  }

  return res.status(401).json({
    status:false,
    statusCode:401,
    message:"Unauthorized access only Student allowed"
  })
};

// Instructor Route
exports.isInstructor = (req, res, next) => {
  if (req?.user?.accountType === "Instructor") {
    next();
    return;
  }

  return res.status(401).json({
    status:false,
    statusCode:401,
    message:"Unauthorized access only Instructor allowed"
  })
};

// Admin Route
exports.isAdmin = (req, res, next) => {
  if (req?.user?.accountType === "Admin") {
    next();
    return;
  }

  return res.status(401).json({
    status:false,
    statusCode:401,
    message:"Unauthorized access only Admin allowed"
  })
};
