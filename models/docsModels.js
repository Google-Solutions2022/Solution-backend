const mongoose = require('mongoose');
const { Schema } = mongoose;

const docsSchema = new Schema({
    userId: {
        type:mongoose.Schema.ObjectId,
        ref: users
    },
    for: {
        type: String,
        enum: ["law", "medical"]
    },
    docLink: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: String,
        required: true
    },
    uploadedFor: {
        type: String,
        required: true
    },
    docName: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const Docs = new mongoose.Schema("docs", docsSchema);
export default Docs;