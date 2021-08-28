require('dotenv').config();
const jwt = require('jsonwebtoken');
const { usersRepository } = require('../repositories');

class usersController {
  async signup(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const user = await usersRepository.getOne({ email });
      if (user) {
        return next({
          status: 409,
          message: 'Email in use',
        });
      }

      await usersRepository.create({ name, email, password });
      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          user: {
            email,
          },
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await usersRepository.authenticateLogin( email, password );
      if (!user) {
        return next({
          status: 400,
          message: 'Wrong email or password',
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: '30m',
      });
      await usersRepository.updateById(user.id, { token });
      res.json({
        status: 'success',
        code: 200,
        data: {
          token,
          user: {
            email,
          }
        }
      })
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new usersController();
