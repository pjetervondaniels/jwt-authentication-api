const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const {registerValidation, loginValidation} = require('../Validation');

// rota de cadastro
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

})

// rota de login
router.post('/login', async (req, res) => {
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
})


module.exports = router;