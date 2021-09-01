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
router.post('/login', validateLogin, ctrl.login)
  .post('/refresh-tokens', auth, ctrl.refreshTokens);

router.get('/current', auth, ctrl.getCurrent);
router.post('/logout', auth, ctrl.logout);

module.exports = { router };
