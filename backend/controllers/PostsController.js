const { postsRepository } = require('../repositories');
const MOMENT = require('moment');

class PostsController {
  async getAll(_, res, next) {
    try {
      const posts = await postsRepository.getAll();
      res.json({
        status: 'success',
        code: 200,
        data: {
          posts,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    const { postId } = req.params;

    try {
      const post = await postsRepository.getById(postId);
      if (!post) {
        return next({
          status: 404,
          message: 'Post not found'
        })
      }

      res.json({
        status: 'success',
        code: 200,
        data: {
          post,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let date = MOMENT().format('YYYY-MM-DD  HH:mm:ss.000');
      const post = await postsRepository.create({
        ...req.body,
        date,
        pathFile: req.file ? req.file.path : null,
        owner: req.user.id,
      });

      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          post,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PostsController();
