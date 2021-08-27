const express = require('express');
const router = express.Router();
const { usersController: ctrl } = require('../../controllers');

router.post('/signup', ctrl.signup);

module.exports = { router };
