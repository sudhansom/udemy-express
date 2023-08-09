const Person = require('../models/users');
const HttpError = require('../models/http-errors');
const { validationResult } = require('express-validator');

const getAllUsers = async (req, res, next) => {
    let allUsers;
    try{
        allUsers = await Person.find({}, '-password');
    }catch(err){
        const error = new HttpError(
            'Failed to fetch allusers, try again later',
            500
        );
        return next(error);
    }
    res.json({Users: allUsers.map(user => user.toObject({getters: true}))});
}

const createUsers = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs passed...', 422)
        );
    }
    const { name, email, password, address} = req.body;

    let existingUser;
    try{
        existingUser = await Person.findOne({email: email});
    }catch(err){
        const error = new HttpError(
            'Creating new user failed',
            500
        );
        return next(error); // can do in one line: return next( new HttpError('', 500))
    }
    if(existingUser){
        return (new HttpError('user already exists', 422));
    }

    const newPerson = new Person({
        name,
        email,
        password,
        address
    });
    try {
        await newPerson.save();
    }catch(err){
        return next(new HttpError('failed to create new user', 500));
    }

    res.status(201).json({person: newPerson.toObject({getters: true})});
}

exports.getAllUsers = getAllUsers;
exports.createUsers = createUsers;