const models = require('../models')
const md5 = require('md5')

async function loginUser (req, res) {
  try {
    const user = req.body.user;
    if (!user) return res.status(204).send({message: 'User is required'});
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
    if (!user) {
      return res.status(400).send({message: "Emty User"});
    }
    const rowsEmail = await models.userModel.isEmail(user.email);
    if (rowsEmail !== undefined) return res.status(200).send({message: 'Email is used'})
    else {
      const userErrorValidate = await models.userModel.isUser(user);
      if (!userErrorValidate) {
        const countData = await models.userModel.getAll();
        user.id = countData.length + 1;
        const isAddData = await models.userModel.create(user);
        if (isAddData) return res.status(200).send({message: 'Create Success'});
        else return res.status(200).send({message: 'Create UnSuccess'})
      } else {
        return res.status(200).send({message: userErrorValidate});
      }
    }
  } catch (e) {
    return res.send(e.message);
  }
}

async function updateUser (req, res) {
  try {
    const user = req.body.user;
    if (!user) return res.status(200).send({message: 'User is null'});
    const update = await models.userModel.update(user);
    if (update === true) {
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
    if (!req.params.id) return res.status(204).send({message: 'Params Id is required'});
    const isDeleted = await models.userModel.remove(req.params.id);
    if (isDeleted) return res.status(200).send({message: 'Delete Success'})
    else return res.status(404).send({message: 'Delete UnSuccess'});
  } catch (e) {
    return res.send(e.message);
  }
}

async function getallUser (req, res) {
  try {
    const user = await models.userModel.getAll();
    if (!user) return res.status(200).send({message: 'Data ís empty'});
    return res.status(200).send({data: user});
  } catch (e) {
    return res.send(e.message);
  }
}

async function getUserById (req, res) {
  try {
    if (!req.params.id) return res.status(204).send({message: 'Params Id is required'})
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
  getUserById: getUserById
}

module.exports = userController;