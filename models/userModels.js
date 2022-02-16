const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: number,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "lawyer", "doctor"]
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    doc: {
        type: Array,
        default: []
    },
    question: {
        type: Array,
        default: []
    },
    answered: {
        type: Array,
        default: [] 
    }
},
    { timestamps: true }
);

const User = new mongoose.Schema("users", userSchema);
export default User;