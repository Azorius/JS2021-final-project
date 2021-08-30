const express = require('express');
const router = express.Router();
const upload = require('../../helpers/multer');
const { postsController: ctrl } = require('../../controllers');
const { validateCreatePost } = require('../../validation/posts');
const { auth } = require('../../middlewares');

router
  .get('/', ctrl.getAll)
  .get('/:postId', ctrl.getOne)
  .post('/', upload.single('postImg'), auth, validateCreatePost, ctrl.create);

module.exports = { router };
