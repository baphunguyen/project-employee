const Joi = require('joi')

const loginSchema = Joi.object({
  email: Joi.string().email().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).required(),
  password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)).required()
})

const createSchema = Joi.object({
  fullname: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().valid('male', 'female'),
  dateofbirth: Joi.date().required(),
  email: Joi.string().email().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).required(),
  password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)).required(),
  confirm_password: Joi.ref('password'),
  address: Joi.string().required()
})

const deleteSchema = Joi.object({
  id: Joi.number().required()
})

const updateSchema = Joi.object({
  id: Joi.number().required(),
  fullname: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().valid('male', 'female'),
  dateofbirth: Joi.date().required(),
  address: Joi.string().required()
})

const getUserSchema = Joi.object({
  page: Joi.number().required()
})

const getUserByIdSchema = Joi.object({
  id: Joi.number().required()
})

const changePasswordSchema = Joi.object({
  id: Joi.number().required(),
  password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)).required(),
  new_password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)).required(),
  confirm_password: Joi.ref('new_password')
})

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().pattern(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)).required(),
})

module.exports = {
  login: loginSchema,
  create: createSchema,
  delete: deleteSchema,
  update: updateSchema,
  getUser: getUserSchema,
  getUserById: getUserByIdSchema,
  changePassword: changePasswordSchema,
  forgotPassword: forgotPasswordSchema
}
