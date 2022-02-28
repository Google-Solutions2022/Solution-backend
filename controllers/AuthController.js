const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/userModels'); //importing schema


exports.protect = async (req, res, next ) => {
    const token = req.header("x-auth-token");
  
    if ( !token ) {
      return res.status(401).json({ msg: "Authorization denied" });
    }
  
    try {
      const decoded = jwt.verify(token, "workingonGoogleSolutionChallenge" );
      req.user = decoded.id;
      next();
    } catch (err) {
      console.log(err.message);
      res.status(401).json({ msg: err.message });
    }
  };


  exports.getUserFromToken = async (req, res) => {
    try {
      const user = await User.findById(req.user).select("-password");
      res.json({ status: "success", data: { user } });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ status: "fail", msg: "Server Error" });
    }
  };