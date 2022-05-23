const express = require('express')
const router = express.Router();
const User = require('../controllers/userController')
const Validate = require('../models/validation')

router.post('/login', Validate.loginValidate, User.loginUser);
router.post('/create', Validate.createValidate, User.createUser);
router.delete('/delete/:id', Validate.deleteValidate, User.deleteUser);
router.put('/update', Validate.updateValidate, User.updateUser);
router.get('/getUser/:page', Validate.getUserValidate, User.getallUser);
router.get('/getUserById/:id', Validate.getUserByIdValidate, User.getUserById);
router.put('/changepassword', Validate.changePasswordValidate, User.changePassword);
router.put('/forgotpassword', Validate.forgotPasswordValidate, User.forgotPassword);

module.exports = router;