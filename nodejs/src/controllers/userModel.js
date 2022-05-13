const connection = require('../models/db')

async function createUser (req, res) {
  try {
    const user = req.body.user;
    if (!user) {
      return res.status(400).send({message: "Emty User"});
    }
    await connection.query("SELECT * FROM user WHERE email=?", user.email, async (error, rows) => {
      if (error) throw error;
      if (rows.length != 0) {
        res.send({message: "Email is used"});
      } else {
        await connection.query("SELECT * FROM user", async (error, rows) => {
          user.id = rows.length + 1;
          await connection.query("INSERT INTO user SET ?", user, (error) => {
            if (error) throw error;
            return res.send({
              message: "Create Success",
            })
          })
        })
      }
    });
  } catch (e) {
    return res.send(e.message);
  }
}

async function updateUser (req, res) {
  try {
    const user = req.body.user;
    if (!user) res.send({message: 'User is null'});
    const queryParams = [user.fullname, user.age, user.gender, user.dateofbirth, user.address,"baphunguyen99@gmail.com" ,user.id];
    const sql = "UPDATE user SET fullname=?, age=?, gender=?, dateofbirth=?, address=?, email=? WHERE id=?"
    await connection.query(sql, queryParams, (error) => {
      if (error) throw error;
      res.send({message: "Update Success"})
      })
  } catch (e) {
    return res.send(e.message);
  }
}

async function deleteUser (req, res) {
  try {
    const userId = req.params.id;
    if (!userId) res.send({message: 'Id is required'});
    await connection.query("DELETE FROM user WHERE id=?", userId, async (error) => {
      if (error) throw error;
      await connection.query("UPDATE user SET id=id-1 WHERE id>?", userId, (error) => {
        if (error) throw error;
        res.send({message: 'Delete Success'});
      })
    })
  } catch (e) {
    return res.send(e.message);
  }
}

async function getallUser (req, res) {
  try {
    await connection.query("SELECT * FROM user", async (error, rows) => {
      if (error) throw error;
      res.send({data: rows});
    })
  } catch (e) {
    return res.send(e.message);
  }
}

async function getUserById (req, res) {
  try {
    await connection.query("SELECT * FROM user WHERE id=?", req.params.id, async (error, rows) => {
      if (error) throw error;
      res.send({data: rows});
    })
  } catch (e) {
    return res.send(e.message);
  }
}

const userModel = {
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getallUser: getallUser,
  getUserById: getUserById
}

module.exports = userModel;