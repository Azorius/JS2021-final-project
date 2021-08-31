const Joi = require('joi');

const schemaCreatePost = Joi.object({
  title: Joi.string().max(50).required(),
  text: Joi.string().max(4000).required(),
  description: Joi.string().max(280).required(),
  postImg: Joi.binary(),
});

const schemaUpdatePost = Joi.object({
  title: Joi.string().max(50),
  text: Joi.string().max(4000),
  description: Joi.string().max(280),
  postImg: Joi.binary(),
})

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

module.exports.validateUpdatePost = (req, _, next) => {
  return validate(schemaUpdatePost, req.body, next);
};