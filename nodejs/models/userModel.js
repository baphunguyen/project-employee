const Joi = require('joi');
const knex = require('./db')
const md5 = require('md5')

const userAPI = {
  isEmail: async (email) => {
    const data = await knex('user').select().where('email', email);
    return data[0];
  },
  create: async (user) => {
    delete user.confirm_password;
    user.password = md5(user.password);
    await knex('user').insert(user);
    return true;
  },
  update: async (user) => {
    const updateData = await knex('user').where('id', user.id).update({
      fullname: user.fullname,
      age: user.age,
      gender: user.gender,
      dateofbirth: user.dateofbirth,
      address: user.address
    })
    if (updateData) return true;
    return false;
  },
  changePassword: async (id, password, new_password) => {
    const user = await knex('user').select().where('id', id);
    if (!user[0]) return false;
    if (user[0].password !== md5(password)) return false;
    const changeData = await knex('user').where('id', id).update('password', md5(new_password));
    if (changeData) return true;
    return false;
  },
  forgotPassword: async (email, password) => {
    const user = await knex('user').select().where('email', email);
    if (!user[0]) return false;
    const forgotPass = await knex('user').where('email', email).update('password', md5(password));
    if (forgotPass) return true;
    return false;
  },
  getAll: async () => {
    return knex('user').select();
  },
  getDataPerPage: async (page) => {
    return knex('user').select().limit(10).offset(10*page);
  },
  getById: async (id) => {
    const data = await knex('user').select().where('id', id);
    return data[0];
  },
  remove: async (id) => {
    const data = await knex('user').where('id', id).del();
    if (data) {
      const updateData = await knex('user').where('id', '>', id).update('id', knex.raw('id-1'));
      if (updateData >= 0) return true;
      return false;
    } else return false;
  }
}

module.exports = userAPI;