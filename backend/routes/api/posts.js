const express = require('express');
const router = express.Router();
const upload = require('../../helpers/multer');
const { postsController: ctrl } = require('../../controllers');
const {
  validateCreatePost,
  validateUpdatePost,
} = require('../../validation/posts');
const { auth } = require('../../middlewares');

router
  .get('/', ctrl.getAll)
  .get('/:postId', ctrl.getOne)
  .post('/', auth, upload.single('postImg'), validateCreatePost, ctrl.create)
  .patch('/:postId', auth, upload.single('postImg'), validateUpdatePost, ctrl.update)
  .delete('/:postId', auth, ctrl.remove);

module.exports = { router };
