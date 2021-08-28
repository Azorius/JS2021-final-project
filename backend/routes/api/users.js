const express = require('express');
const router = express.Router();
const { usersController: ctrl } = require('../../controllers');
const { 
  validateSignup,
  validateLogin,
} = require('../../validation/users');

router.post('/signup', validateSignup, ctrl.signup);
router.post('/login', validateLogin, ctrl.login);

module.exports = { router };
