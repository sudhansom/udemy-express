const express = require('express');
// const uuid = require('uuid/v4');
const { check } = require('express-validator');
const { HttpError } = require('../models/http-errors');
const Place = require('../models/place');

const {getAllPlaces, createPlace, getPlaceById} = require('../controller/place')


const route = express.Router();

route.get('/', getAllPlaces);
route.get('/:id', getPlaceById);
route.post(
    '/', 
    [
        check('title')
            .not()
            .isEmpty(),
        check('description').isLength({min: 5}),
        check('address')
            .not()
            .isEmpty()
    ],
    createPlace);

module.exports = route;