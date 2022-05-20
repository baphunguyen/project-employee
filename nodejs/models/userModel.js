const Joi = require('joi');
const knex = require('./db')
const md5 = require('md5')

const userValidation = (data) => {
  const userSchema = Joi.object({
    fullname: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().valid('male', 'female'),
    dateofbirth: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirm_password: Joi.ref('password'),
    address: Joi.string().required()
  })
  return userSchema.validate(data);
}

const userAPI = {
  isEmail: async (email) => {
    try {
      const data = await knex('user').select().where('email', email);
      return data[0];
    } catch (e) {
      return e.message;
    }
  },
  isUser: async (user) => {
    try {
      const userValidate = userValidation(user);
      if (userValidate.error) return userValidate.error.message;
      return false;
    } catch (e) {
      return e.message;
    }
  },
  create: async (user) => {
    try {
      delete user.confirm_password;
      user.password = md5(user.password);
      await knex('user').insert(user);
      return true;
    } catch (e) {
      return e.message;
    }
  },
  update: async (user) => {
    try {
      const updateData = await knex('user').where('id', user.id).update({
        fullname: user.fullname,
        age: user.age,
        gender: user.gender,
        dateofbirth: user.dateofbirth,
        address: user.address
      })
      if (updateData) return true;
      return false;
    } catch (e) {
      return e.message;
    }
  },
  changePassword: async (id, password, new_password) => {
    try {
      const user = await knex('user').select().where('id', id);
      if (!user[0]) return false;
      if (user[0].password !== md5(password)) return false;
      const changeData = await knex('user').where('id', id).update('password', md5(new_password));
      if (changeData) return true;
      return false;
    } catch (e) {
      return e.message;
    }
  },
  forgotPassword: async (email, password) => {
    try {
      const user = await knex('user').select().where('email', email);
      if (!user[0]) return false;
      const forgotPass = await knex('user').where('email', email).update('password', md5(password));
      if (forgotPass) return true;
      return false;
    } catch (e) {
      return e.message;
    }
  },
  getAll: async () => {
    try {
      const data = await knex('user').select();
      return data;
    } catch (e) {
      return e.message;
    }
  },
  getDataPerPage: async (page) => {
    try {
      const data = await knex('user').select().limit(10).offset(10*page);
      return data;
    } catch (e) {
      return e.message;
    }
  },
  getById: async (id) => {
    try {
      const data = await knex('user').select().where('id', id);
      return data[0];
    } catch (e) {
      return e.message;
    }
  },
  remove: async (id) => {
    try {
      const data = await knex('user').where('id', id).del();
      if (data) {
        const updateData = await knex('user').where('id', '>', id).update('id', knex.raw('id-1'));
        if (updateData >= 0) return true;
        return false;
      } else return false;
    } catch (e) {
      return e.message;
    }
  }
}

module.exports = userAPI;