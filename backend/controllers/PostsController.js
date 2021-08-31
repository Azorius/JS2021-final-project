const { 
  postsRepository,
  usersRepository,
} = require('../repositories');
const MOMENT = require('moment');

class PostsController {
  async getAll(req, res, next) {
    try {
      const posts = await postsRepository.getAll({ query: req.query });
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
          message: 'Post not found',
        });
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
    const { id: userId, name } = req.user;
    try {
      let date = MOMENT().format('YYYY-MM-DD  HH:mm:ss.000');
      const post = await postsRepository.create({
        ...req.body,
        date,
        pathFile: req.file ? req.file.path : null,
        owner: userId,
        ownersName: name,
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

  async update(req, res, next) {
    const { postId } = req.params;
    const { id: userId } = req.user;
    try {
      const [post] = await postsRepository.getAll({filter: { id_posts: postId }});
      if (post.owner.id !== userId) {
        return next({
          status: 401,
          message: 'Unauthorized',
        })
      }

      const postUpdate = await postsRepository.update(postId, {
        ...req.body,
        pathFile: req.file ? req.file.path : null,
      });
      res.json({
        status: 'success',
        code: 200,
        data: {
          ...postUpdate,
        }
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PostsController();
