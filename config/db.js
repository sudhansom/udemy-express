const dotenv = require('dotenv');
const mongo = require('mongoose');

dotenv.config();

const connectDb = () => {
    try {
        mongo.connect(process.env.mongoDb || '');
        console.log('connected to mongodb...');
    }catch(err){
        console.log('error connecting mongoDB...');
    }
}

module.exports = connectDb;

