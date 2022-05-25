const express = require('express')
const router = express.Router();
const User = require('../controllers/userController')
const Validates = require('../middlewares/validate')

router.post('/login', Validates('login'), User.loginUser);
router.post('/create', Validates('create'), User.createUser);
router.delete('/delete/:id', Validates('delete'), User.deleteUser);
router.put('/update', Validates('update'), User.updateUser);
router.get('/getUser/:page', Validates('getUser'), User.getallUser);
router.get('/getUserById/:id', Validates('getUserById'), User.getUserById);
router.put('/changepassword', Validates('changePassword'), User.changePassword);
router.put('/forgotpassword', Validates('forgotPassword'), User.forgotPassword);

module.exports = router;