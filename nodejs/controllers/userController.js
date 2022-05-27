const models = require('../models')
const md5 = require('md5')

async function loginUser (req, res) {
  try {
    const user = req.body.user;
    const rowsEmail = await models.userModel.isEmail(user.email);
    if (rowsEmail === undefined) return res.status(200).send({message: 'Email is not available'})
    const hashPassword = md5(user.password);
    if (hashPassword === rowsEmail.password) return res.status(200).send({data: rowsEmail})
    else return res.status(200).send({message: 'Password is wrong'})
  } catch (e) {
    return res.send(e.message);
  }
}

async function createUser (req, res) {
  try {
    const user = req.body.user;
    const countData = await models.userModel.getAll();
    user.id = countData.length + 1;
    const isAddData = await models.userModel.create(user);
    if (isAddData) return res.status(200).send({message: 'Create Success'});
    else return res.status(200).send({message: 'Create UnSuccess'})
  } catch (e) {
    return res.send(e.message);
  }
}

async function updateUser (req, res) {
  try {
    const user = req.body.user;
    const update = await models.userModel.update(user);
    if (update) {
      return res.status(200).send({message: "Update Success"});
    } else {
      return res.status(200).send({message: "Update UnSuccess"});
    }
  } catch (e) {
    return res.send(e.message);
  }
}

async function deleteUser (req, res) {
  try {
    const isDeleted = await models.userModel.remove(req.params.id);
    if (isDeleted) return res.status(200).send({message: 'Delete Success'})
    else return res.status(404).send({message: 'Delete UnSuccess'});
  } catch (e) {
    return res.send(e.message);
  }
}

async function getallUser (req, res) {
  try {
    const page = req.params.page;
    const userList = await models.userModel.getAll();
    if (userList.length === 0) return res.status(200).send({message: 'Data ís empty'});
    const userPerPage = await models.userModel.getDataPerPage(page-1);
    return res.status(200).send({user: {
        totalData: userList.length,
        _limit: 10,
        _totalPage: userList.length%10 === 0? Math.floor(userList.length/10): Math.floor(userList.length/10)+1,
        _currentPage: page,
        data: userPerPage,
      }});
  } catch (e) {
    return res.send(e.message);
  }
}

async function changePassword (req, res) {
  try {
    const user = req.body.user;
    const isChange = await models.userModel.changePassword(user.id, user.password, user.new_password);
    if (isChange) return res.status(200).send({message: 'Change Password Success'});
    return res.status(200).send({message: 'Change Password UnSuccess'});
  } catch (e) {
    return res.send(e.message);
  }
}

async function forgotPassword (req, res) {
  try {
    const {email} = req.body.user;
    const isChange = await models.userModel.forgotPassword(email);
    if (isChange) return res.status(200).send({message: 'Update Password Success'});
    return res.status(200).send({message: 'Update Password UnSuccess'});
  } catch (e) {
    return res.send(e.message);
  }
}

async function getUserById (req, res) {
  try {
    const user = await models.userModel.getById(req.params.id);
    if (!user) return res.status(200).send({message: 'Data ís empty'});
    return res.status(200).send({data: user});
  } catch (e) {
    return res.send(e.message);
  }
}

const userController = {
  loginUser: loginUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getallUser: getallUser,
  getUserById: getUserById,
  changePassword: changePassword,
  forgotPassword: forgotPassword
}

module.exports = userController;