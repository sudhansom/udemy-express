const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/api/users', (req, res, next)=>{
    res.json({message: "Users...."});
})


app.listen(5001, ()=>{
    console.log(`server running at 5000`);
})