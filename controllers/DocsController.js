const Docs = require("../models/docsModels");
const User = require("../models/userModels");


// store the upload docs link in the database
exports.upload = async (req, res) => {

    try {
        const { docLink, docName, uploadedFor, uploadedBy, type, userId } = req.body;

        if (docLink == null || docLink == "") {
            return res.status(400).json({ msg: "Provide a Doc Link to upload the file" });
        }
        if (docName == null || docName == "") {
            return res.status(400).json({ msg: "Provide a Doc Name to upload the file" });
        }
        if (type == null || type == "") {
            return res.status(400).json({ msg: "Provide a type of the file like law/Doctor to upload the file" });
        }
        if (uploadedFor == null || uploadedFor == "") {
            return res.status(400).json({ msg: "Provide a uploadedFor to upload the file" });
        }
        if (uploadedBy == null || uploadedBy == "") {
            return res.status(400).json({ msg: "Provide uploadedBy to upload the file" });
        }

        const UploadedBy = await User.findById(uploadedBy);  
        // console.log(UploadedBy);
        if(UploadedBy == null ){
            return res.status(400).json({msg: "You cannot upload file! You are not a registered member "});
        }

        if(uploadedBy != uploadedFor && (UploadedBy.role == "user" ) ){
            res.status(403).json({msg: "You cannot upload for any other user as your role is of USER"});
        }


        let doc = new Docs({
            docLink: docLink,
            docName: docName,
            uploadedBy: uploadedBy,
            uploadedFor: uploadedFor,
            type: type,
            userId: uploadedFor
        });


        await doc.save();

        return res.status(200).json({msg: "Uploaded Successfully", data: doc });

    } catch (error) {
        return res.status(400).json({msg: error.message});
    }

}



// get all the docs of a particular user

exports.getAllDocOfUser = async (req,res) => {
    try {

        const { userId } = req.body

        // console.log(userId)
        const user = await User.findById(userId);
        // console.log(user);
        if(user == null){
            return res.status(200).json({msg: "User doen not exits in the database"})
        }

        const allDocs = await Docs.find({ uploadedFor: userId });
        // console.log(allDocs);

        if(allDocs == null){
            return res.status(200).json({msg: "User does not have any documents uploaded in the database"});
        }

        return res.status(200).json({msg: "Api Successfully", data: allDocs});
        
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


