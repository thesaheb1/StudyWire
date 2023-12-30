// imports
const jwt = require('jsonwebtoken');
require('dotenv').config();

//***************************************************************************//
//                               Authentication                              //
//***************************************************************************//
const AuthN = async (req, res, next) => {
    // get token from cookie
    const token = req?.header('Authorization')?.replace("Bearer ", "") || req?.cookies?.token || req?.body;
  
    if(!token){
      return res.status(404).json({
          status:false,
          statuscode:404,
          message:"token is missing"
      })
    }
    
    try {
      // check token is valid or not
      const Decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

      
      // pass data into every request
      req.user = Decode;
      
      // call next middleware and pass decode as an argument
      next();
    } catch (error) {
      return res.json({
        status: false,
        statuscode:400,
        Message: error.message,
      });
    }
  };

  // exports
  module.exports = AuthN;