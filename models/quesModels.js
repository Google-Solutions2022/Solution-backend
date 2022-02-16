const mongoose = require('mongoose');
const { Schema } = mongoose;

const quesSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    for: {
        type: String,
        enum: ["law", "medical"]
    },
    isAnswered: {
        type: Boolean,
        default: false
    },
    answeredBy: {
        type: Array,
        default: []
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: users
    },
    answers: [
        new mongoose.Schema({
           answer: {
               type: String
           },
           uploadLink: {
               type: String
           },
           answeredBy: {
               type: mongoose.Schema.ObjectId,
               ref: users
           }
        }, {timestamps: true})
    ]
},
    { timestamps: true }
);

const Questions = new mongoose.Schema("users", quesSchema);
export default Questions;