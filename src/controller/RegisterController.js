const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Joi = require('joi');
const {registerValidation} = require('./Validation');

module.exports = {
    async register(req, res){
        // verificando erros no registro
        const {error} = registerValidation(req.body);
    
        if(error){
            return res.send(error.details[0].message);
        }
    
        // verificando se o usuário já está cadastrado
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist){
            return res.status(400).send('Email already exists!');
        }
    
        // encriptando a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        // cadastrando novo usuário
        let user =  new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
    
        try{
            const savedUser =  await user.save();
            res.send({user: user._id});
        }catch(err){
            res.status(400).send(err);
        }
    }
}