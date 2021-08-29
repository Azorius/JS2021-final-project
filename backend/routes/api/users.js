const express = require('express');
const router = express.Router();
const { usersController: ctrl } = require('../../controllers');
const { 
  validateSignup,
  validateLogin,
} = require('../../validation/users');
const {
  auth
} = require('../../middlewares');

router.post('/signup', validateSignup, ctrl.signup);
router.post('/login', validateLogin, ctrl.login);
router.get('/current', auth, ctrl.getCurrent)

module.exports = { router };
