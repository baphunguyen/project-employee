const Joi = require('joi');
const connection = require('./db')
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
      const [rows] = await connection.execute("SELECT * FROM user WHERE email=?", [email]);
      return rows[0];
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
      await connection.query("INSERT INTO user SET ?", [user]);
      return true;
    } catch (e) {
      return e.message;
    }
  },
  update: async (user) => {
    try {
      const queryParams = [user.fullname, user.age, user.gender, user.dateofbirth, user.address, user.id];
      const sql = "UPDATE user SET fullname=?, age=?, gender=?, dateofbirth=?, address=? WHERE id=?"
      await connection.query(sql, queryParams);
      return true;
    } catch (e) {
      return e.message;
    }
  },
  getAll: async () => {
    try {
      const sql = 'SELECT * FROM user';
      const [rows] = await connection.execute(sql);
      return rows;
    } catch (e) {
      return e.message;
    }
  },
  getById: async (id) => {
    try {
      const sql = 'SELECT * FROM user WHERE id=?';
      const [rows] = await connection.execute(sql, [id]);
      return rows;
    } catch (e) {
      return e.message;
    }
  },
  remove: async (id) => {
    try {
      const sql = 'DELETE FROM user WHERE id=?';
      const [result] = await connection.execute(sql, [id]);
      if (result.affectedRows) {
        await connection.execute('UPDATE user SET id=id-1 WHERE id>?', [id]);
        return true;
      }
      else return false;
    } catch (e) {
      return e.message;
    }
  }
}

module.exports = userAPI;