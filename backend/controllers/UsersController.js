const { usersRepository } = require('../repositories');

class usersController {
  async signup(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const user = await usersRepository.getOne({ email });
      if (user) {
        next({
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
}

module.exports = new usersController();
