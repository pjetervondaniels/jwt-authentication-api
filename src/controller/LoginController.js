const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const {loginValidation} = require('./Validation');

module.exports = {
    async login(req, res){
        const {error} = loginValidation(req.body);
    
        if(error){
            return res.send(error.details[0].message);
        }
        // verificando se o email não existe no DB
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).send("Email or password is wrong!");
        }
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass){
            return res.status(400).send("Email or password is wrong!");
        }else{
            // criando token
            const TOKEN_SECRET = 'skjhfdjsdhfkkjwer';
            const token = jwt.sign({_id: user._id}, TOKEN_SECRET);
            res.header('auth-token', token).send(token);
        }
    }
}