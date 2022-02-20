const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser"); // importing bodyParser
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const User = require('../models/userModels'); //importing schema

router.use(bodyParser.json()) //using body parser
router.use(cookieParser());

//creating user register api: /api/auth/register
router.post("/register",
    // email must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        console.log("Incoming Request");

        //checking for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //sorting data from body
        const { name, email, password, phoneNumber, role, gender, dob } = req.body;
        if (!(name && email && password && gender && role && dob)) {
            //checking all the required items in json
            return res.status(400).json({ msg: "plz fill all required information!" })
        }

        User.findOne({ email: email })
            .then((user) => {
                //finding user in db
                if (user !== null) {
                    return res.status(403).json({ Eror: "Email id already exsists" })
                }

                // check phone number
                if (phoneNumber && phoneNumber.length !== 10) {
                    return res.status(403).json({ Error: "Please enter valid phone number" })
                }

                // console.log(req.body);
                const hashPassword = bcrypt.hashSync(password, salt);
                User.create({
                    email: email,
                    name: name,
                    password: hashPassword,
                    phoneNumber: phoneNumber,
                    role: role,
                    gender: gender,
                    dob: dob

                }).then((user) => {

                    //creating jwt Token
                    const userToken = jwt.sign({ userId: user._id }, "workingonGoogleSolutionChallenge");

                    //cerating cookie named userToken
                    res.cookie("userToken", userToken, {
                        httpOnly: true,
                    });

                    //sending response success
                    res.status(200).json({ token: userToken })

                }).catch((err) => {
                    //sending response error
                    res.status(400).json({ msg: err.message })
                })
            })
            .catch((err) => {
                //sending response Internal server error
                res.status(500).json({ msg: "Internal Server Error" });
            })
    })

//creating user register api: /api/auth/login
router.post("/login",
    //checking email
    body('email').isEmail(), 
    //checking password length
    body('password').isLength({ min: 6 })
    , async (req, res) => {
        console.log("Incoming Login Request");
        //checkingg for request error
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({err: errors.array()});
        }

        //sorting data from body
        const {email, password} = req.body;
        if(!(email && password)) {
            return res.status(400).json({err: "Please enter all the required credentials"});
        }

        //finding email in db
        User.findOne({email: email})
        .then((user) => {
            //finding user in db
            if (user === null) {
                return res.status(403).json({ Eror: "Invalid Credentails: Email not found" })
            }

            //comparing password 
            const comPass = bcrypt.compareSync(password, user.password);
            
            if(!comPass) {
                return res.status(400).json({err: "Invalid Credentails"})
            }

            //creating jwt token
            const userToken = jwt.sign({ userId: user._id }, "workingonGoogleSolutionChallenge");

            //creating cookie named userToken
            res.cookie("userToken", userToken, {
                httpOnly: true,
            });

            //sending response sucess
            res.status(200).json({userToken: userToken})
            
        }).catch((err) => {
            //sending response error
            res.status(500).json({ msg: "Internal Server Error" })
        })
    })

module.exports = router