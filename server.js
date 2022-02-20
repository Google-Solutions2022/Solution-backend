const express = require('express');
require('dotenv').config();
require('./db');

const app = express();


app.get('/', ()=>{
    console.log("hi");
})

app.use('/api/auth', require('./routes/AuthRoute'))
app.use('/api/userInfo', require('./routes/UserInfo'))


const port = process.env.PORT || 5000;
app.listen(port , ()=>{
    console.log(`Server running on port: ${port}`);
});