const express = require ('express');
const {
    registerUser,
    loginUser
} = require('../controllers/user.controller.js');
const {
    validateLogin,
    validateRegister
} = require('../validations/user.validations.js');

const router = express.Router();

router.post('/sign-up', validateRegister, registerUser );

router.post('/login', validateLogin, loginUser );

module.exports = router;