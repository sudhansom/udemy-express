const express = require('express');
// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-errors');
const Place = require('../models/place');


const getAllPlaces = async (req, res, next) => {

    let places;
    try{
        places = await Place.find();
    }catch(err){
        return next(new HttpError('Internal server error...', 500))
    }
    res.status(200).json(places);
}

const getPlaceById = async (req, res, next) => {
    let place;
    try{
        place = await Place.findById(req.params.id);
    }catch(err){
        return next(new HttpError('Internal server error...', 500))
    }
    if(!place){
        return next(new HttpError('could not find the place for the given id.', 404))
    }
    res.status(200).json(place);
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return next(
            new HttpError('Invalid inputs provided, please check inputs.', 422)
        );
    }
    const { title, description, address, creator } = req.body;
    const place = new Place({
        title,
        description,
        address,
        creator
    })
    try{
        await place.save();
    }catch(err){
        return next(new HttpError(`Internal server error... ${err}`, 500))
    }
    res.status(200).json({message: "created a place"});
}

exports.createPlace = createPlace;
exports.getAllPlaces = getAllPlaces;
exports.getPlaceById = getPlaceById;