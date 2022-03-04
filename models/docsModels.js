const mongoose = require('mongoose');
const { Schema } = mongoose;

const docsSchema = new Schema({
    userId: {
        type: String,
        // ref: "user",
        required: true,
        
    },
    type: {
        type: String,
        default: "user",
        enum: ["user", "law", "medical"],
        required: true,

    },
    docLink: {
        type: String,
        required: true
    },
    uploadedBy: {
        // type: mongoose.Schema.ObjectId,
        type: String,
        // ref: 'user',
        required: true
    },
    uploadedFor: {
        // type: mongoose.Schema.ObjectId,
        type: String,
        // ref: 'user',
        required: true
    },
    docName: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const Docs = mongoose.model('docs', docsSchema);
module.exports = Docs;