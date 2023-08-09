const express = require('express');
const userController = require('../controller/users')

const route = express.Router();

route.post('/', userController.createUsers);
route.get('/', userController.getAllUsers);

module.exports = route;