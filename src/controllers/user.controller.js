require('dotenv').config();
const Joi = require ('joi');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require ('../models/user.model.js');
const { hashPassword } = require('../utils/bycrypt.js');

const registerUser = async (req, res, next) =>{
     try {
        
        const {email, password, name} = req.body;

        const existingUser = await userModel.findOne({email: email})

        if(existingUser) {
            return res.status(400).json({
                message: 'User already exists!'
            });
            }

    await hashPassword(password);   

     const user = new userModel({
        email: email,
        password: hashed,
        name: name
     });

     await user.save();

     return res.status(200).json({
        message: 'User registered successfully'
     });

     } catch (error) {
        next (error);
     }
};

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

    const user = await userModel.findOne({email: email});

    if(!user) {
        return res.status(404).json({
            message:'User does not exist!'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
        throw new Error ('Invalid credentials');

    const token = jwt.sign(
        {userId: user._id, name: user.name},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );

    const resUser = {
        _id: user._id,
        email: user.email,
        name: user.name,
    };

    return res.status(200).json({
        message: "Login Successful",
        user: resUser,
        token
    });
    } catch (error) {
        next (error);
    }
};

module.exports = {loginUser, registerUser};

