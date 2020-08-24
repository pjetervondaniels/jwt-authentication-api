const User = require('../model/User');
const router = require('express').Router();
const Joi = require('joi');
const {registerValidation} = require('../Validation');



router.post('/register',  async (req, res) =>{
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

    // cadastrando novo usuário
    let user =  new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const savedUser =  await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }

})

module.exports = router;