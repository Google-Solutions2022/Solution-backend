const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,()=>{
    
});

const db = mongoose.connection;

db.on("error", console.log.bind(console, "Connection ERROR"));
db.once("open",()=>{
    console.log("Successfully Connected to MongoDB");
});