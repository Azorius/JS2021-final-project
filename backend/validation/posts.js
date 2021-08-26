const Joi = require('joi');

const schemaCreatePost = Joi.object({
  title: Joi.string().max(50).required(),
  text: Joi.string().required(),
  description: Joi.string().max(280).required(),
  postImg: Joi.binary(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message,
      data: 'Bad request',
    });
  }
  next();
};

module.exports.validateCreatePost = (req, _, next) => {
  return validate(schemaCreatePost, req.body, next);
};
