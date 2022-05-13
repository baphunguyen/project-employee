const express = require('express')
const router = express.Router();
const User = require('../controllers/userModel')

router.post('/create', User.createUser);
router.delete('/delete/:id', User.deleteUser);
router.put('/update', User.updateUser);
router.get('/getUser', User.getallUser);
router.get('/getUserById/:id', User.getUserById);

module.exports = router;