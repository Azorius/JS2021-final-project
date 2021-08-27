const express = require('express');
const router = express.Router();
const { usersController: ctrl } = require('../../controllers');
const { validateSignup } = require('../../validation/users');

router.post('/signup', validateSignup, ctrl.signup);

module.exports = { router };
