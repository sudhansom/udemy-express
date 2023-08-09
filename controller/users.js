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
        
        return next(new HttpError('user already exists', 422));
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

const updateUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs passed...', 422)
        );
    }

    let user;
    try{
        user = await Person.findById(req.params.id);
    }catch(err){
        const error = new HttpError('Could not find user', 500);
        return next(error);
    }
    user.name = req.body.name;
    user.password = req.body.password;
    user.address = req.body.address;
    user.email = req.body.email;
    if(!user){
        return next(new HttpError('no user found...', 404));
    }
    try{
        await user.save();
        // user = await Person.updateOne
        // (
        //     {id: req.params.id},
        //     {
        //         $set: {
        //             name: req.body.name,
        //             password: req.body.password,
        //             address: req.body.address,
        //             email: req.body.email,
        //         },
        //     }
        // );
    }catch(err){
        return next(new HttpError('Error updating user', 500));
    }
    res.status(200).send(user);
}

const getOneUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await Person.findById(id);
    }catch(err){
        return next(new HttpError('Error finding user', 500));
    }
    res.status(200).json({user: user});
}

const deleteOneUser = async (req, res, next) => {
    let user;
    try{
        user = await Person.findByIdAndDelete(req.params.id);
    }catch(err){
        return next(new HttpError('Error deleting, try again later', 500))
    }
    if(!user){
        return next(new HttpError('no user found...', 404));
    }
    res.status(200).json({user: user});
}

exports.getAllUsers = getAllUsers;
exports.createUsers = createUsers;
exports.updateUser = updateUser;
exports.getOneUser = getOneUser;
exports.deleteOneUser = deleteOneUser;