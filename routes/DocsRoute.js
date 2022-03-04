const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const docsController = require("../controllers/DocsController");



router.use(bodyParser.json())


// store the upload docs link in the database
router.post('/upload', docsController.upload );


// get all the law docs of a particular user
router.get('/getAllDocOfUser', docsController.getAllDocOfUser);








module.exports = router;

