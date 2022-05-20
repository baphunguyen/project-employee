const express = require('express')
const router = express.Router();
const User = require('../controllers/userController')

router.post('/login', User.loginUser);
router.post('/create', User.createUser);
router.delete('/delete/:id', User.deleteUser);
router.put('/update', User.updateUser);
router.get('/getUser/:page', User.getallUser);
router.get('/getUserById/:id', User.getUserById);
router.put('/changepassword', User.changePassword);
router.put('/forgotpassword', User.forgotPassword);

module.exports = router;