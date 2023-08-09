const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/users');

const app = express();

app.use('/api/users', UserRoute);


app.listen(5001, ()=>{
    console.log(`server running at 5000`);
})