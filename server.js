const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/users');
const PlaceRoute = require('./routes/place');
const connectDb = require('./config/db');
const HttpError = require('./models/http-errors');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', UserRoute);
app.use('/api/places', PlaceRoute);

app.use((req, res, next)=>{
    const error = new HttpError('Could not find this route', 404);
    throw error;                  // return next(error);
})

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred.'});
})


app.listen(5001, ()=>{
    console.log(`server running at 5000`);
    connectDb();
})