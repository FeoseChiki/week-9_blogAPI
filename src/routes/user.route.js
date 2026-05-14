const express = require ('express');

const multer = require('multer');

const {
    registerUser,
    loginUser
} = require('../controllers/user.controller.js');
const {
    validateLogin,
    validateRegister
} = require('../validations/user.validations.js');

const upload = require('../middlewares/upload.js');

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {

    const fileURL = req.file.path;
    const fileName = req.file.filename;

    console.log(fileName);
    console.log(fileURL);

res.send('Hello, from Upload');
});

router.post('/sign-up', validateRegister, registerUser );

router.post('/login', validateLogin, loginUser );

module.exports = router;