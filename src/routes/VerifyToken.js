const jwt = require('jsonwebtoken');
const { func } = require('joi');
const TOKEN_SECRET = 'skjhfdjsdhfkkjwer';

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send('Acess Denied');
    }
    try{
        const verified = jwt.verify(token, TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.status(400).status('Invalid Token')
    }
}