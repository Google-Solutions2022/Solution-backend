const mongoose = require('mongoose');
const { Schema } = mongoose;

const liveSchema = new Schema({
    userId: {
        type:mongoose.Schema.ObjectId,
        ref: users
    },
    for: {
        type: String,
        enum: ["law", "medical"]
    },
    forId: {
        type: String,
        required: true
    },
    chat: [
        new mongoose.Schema({
            msg: {
                type: String,
                required: true
            },
            sendBy: {
                type: String,
                required: true
            }
        }, {timestamps: true})
    ]
},
    { timestamps: true }
);

const Live = new mongoose.Schema("live", liveSchema);
export default Live;