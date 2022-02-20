const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser"); // importing bodyParser
const cookieParser = require('cookie-parser');

const User = require('../models/userModels'); //importing schema

router.use(bodyParser.json()) //using body parser
router.use(cookieParser());

//accessing all the users using api: api/userInfo/users
router.get("/users", 
    async(req, res) => {
        console.log("Accessing all the users");

        //finding user in db
        User.find({ role: "user" })
        .then((user) => {

            //if user not found in db throw error
            if(user == null) {
                return res.status(403).json({msg: "users not found in db"})
            }

            //if users found in db
            res.status(200).json({ users: user})
        })
        .catch((err) => {
            //Send internal server error
            res.status(500).json({ msg: "Internal Server Error"})
        })
    }
)


// accessing all the doctors using api: api/userInfo/doctors
router.get("/doctors",
    async(req, res) => {
        console.log("Accessing data of all the doctors");
        
        //finding doctors in db
        User.find({ role: "doctor" })
        .then((doctors) => {
            if(doctors.length == 0) {
                //if doctors not found in db
                return res.status(404).json({ msg: "No doctors found in db" })
            } 
            
            //if doctors found in db
            res.status(200).json({doctors: doctors})
        })
        .catch((err) => {
            //Send internal server error
            res.status(500).json({ error: "Internal Server Error" })
        })
    }
)

// accessing all the lawyers using api: api/userInfo/lawyers
router.get("/lawyers",
    async(req, res) => {
        console.log("Accessing data of all the lawyers");
        
        //finding lawyers in db
        User.find({ role: "lawyer" })
        .then((lawyers) => {
            if(lawyers.length == 0) {
                //if doctors not found in db
                return res.status(404).json({ msg: "No lawyers found in db" })
            } 
            
            //if doctors found in db
            res.status(200).json({ lawyers: lawyers })
        })
        .catch((err) => {
            //Send internal server error
            res.status(500).json({ error: "Internal Server Error" })
        })
    }
)

//accessing a single user using cookie
router.get("/singleUser",
    async(req, res) => {
        console.log("Accessing single User");

        //fetching user data from cookie
        const userToken = req.cookies.userToken;

        console.log(`Accessing user using userToken: ` + userToken);

        //decoding the jwt starts
        try{
            //decoding the jwt using sync method
            const decoded = jwt.verify(userToken, "workingonGoogleSolutionChallenge");

            console.log("Trying to access info of userId: " + decoded.userId)

            //saving userId
            const userId = decoded.userId;
            
            //finding user from userId in db
            User.findOne({ _id: userId })
            .then((user) => {
                //if user is found in db
                console.log("User is found in DB");

                //return the response with user info
                return res.status(200).json({ user: user })
            })
            .catch((err) => {
                //if user is not found in db then throw error
                return res.status(400).json({error: "User not found in db"})
            })

        } catch(err) {
            //if not able to decode jwt return error
            console.log("Error in decoding jwt");

            return res.status(400).json({error: err})
        }
    }
)

module.exports = router