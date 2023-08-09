const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/users');
const PlaceRoute = require('./routes/place');
const connectDb = require('./config/db')

const app = express();

app.use('/api/users', UserRoute);
app.use('/api/places', PlaceRoute);


app.listen(5001, ()=>{
    console.log(`server running at 5000`);
    connectDb();
})