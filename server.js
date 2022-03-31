const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('./db');

const app = express();

app.use(cors());
// app.use(express.json());


app.get('/', ()=>{
    console.log("hi");
})

app.use('/api/auth', require('./routes/AuthRoute'));
app.use('/api/userInfo', require('./routes/UserInfo'));
app.use('/api/docs', require("./routes/DocsRoute"));


const port = process.env.PORT || 5001;
app.listen(port , ()=>{
    console.log(`Server running on port: ${port}`);
});