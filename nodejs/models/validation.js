const Joi = require('joi')

module.exports = {
  loginValidate: (req, res, next) => {
    const loginSchema = Joi.object({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(6).required()
    })
    const result = loginSchema.validate(req.body.user);
    if (!result.error) next();
    else res.send({message: result.error.message});
  },
  createValidate: (req, res, next) => {
    const registerSchema = Joi.object({
      fullname: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().valid('male', 'female'),
      dateofbirth: Joi.date().required(),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(6).required(),
      confirm_password: Joi.ref('password'),
      address: Joi.string().required()
    })
    const result = registerSchema.validate(req.body.user);
    if (!result.error) next();
    else res.send({message: result.error.message});
  },
  deleteValidate: (req, res, next) => {
    const deleteSchema = Joi.object({
      id: Joi.number().required()
    })
    const result = deleteSchema.validate({id: req.params.id});
    if (!result.error) next();
    else res.send({message: result.error.message});
  },
  updateValidate: (req, res, next) => {
    const updateSchema = Joi.object({
      id: Joi.number().required(),
      fullname: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().valid('male', 'female'),
      dateofbirth: Joi.date().required(),
      address: Joi.string().required()
    })
    const result = updateSchema.validate(req.body.user);
    if (!result.error) next();
    else res.send({message: result.error.message});
  },
  getUserValidate: (req, res, next) => {
    const getUserSchema = Joi.object({
      page: Joi.number().required()
    })
    const result = getUserSchema.validate({page: req.params.page});
    if (!result.error) next();
    else res.send({message: result.error.message});
  },
  getUserByIdValidate: (req, res, next) => {
    const getUserByIdSchema = Joi.object({
      id: Joi.number().required()
    })
    const result = getUserByIdSchema.validate({id: req.params.id});
    if (!result.error) next();
    else res.send({message: result.error.message});
  },
  changePasswordValidate: (req, res, next) => {
    const changePasswordSchema = Joi.object({
      id: Joi.number().required(),
      password: Joi.string().min(6).required(),
      new_password: Joi.string().min(6).required(),
      confirm_password: Joi.ref('new_password')
    })
    const result = changePasswordSchema.validate(req.body.user);
    if (!result.error) next();
    else res.send({message: result.error.message});
  },
  forgotPasswordValidate: (req, res, next) => {
    const forgotPasswordSchema = Joi.object({
      email: Joi.string().email().required(),
      new_password: Joi.string().min(6).required(),
      confirm_password: Joi.ref('new_password')
    })
    const result = forgotPasswordSchema.validate(req.body.user);
    if (!result.error) next();
    else res.send({message: result.error.message});
  },
}
