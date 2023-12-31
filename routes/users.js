const express = require('express');
const { check } = require('express-validator');

const userController = require('../controller/users')


const route = express.Router();

route.post(
    '/signup', 
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail() // Test@test.com => test@test.com
            .isEmail(),
        check('password').isLength({ min: 6})
    ],
    userController.createUsers);

    
route.get('/', userController.getAllUsers);
route.get('/:id', userController.getOneUser);
route.delete('/:id', userController.deleteOneUser);

route.put(
    '/:id',
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail() // Test@test.com => test@test.com
            .isEmail(),
        check('password').isLength({ min: 6})
    ],
     userController.updateUser);



module.exports = route;