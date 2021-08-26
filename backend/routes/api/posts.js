const express = require('express');
const router = express.Router();
const upload = require('../../helpers/multer');
const { postsController: ctrl } = require('../../controllers');

router
  .get('/', ctrl.getAll)
  .post('/', upload.single('postImg'), ctrl.create);

module.exports = { router };
