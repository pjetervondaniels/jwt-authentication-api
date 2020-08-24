const router = require('express').Router();

const registerController = require('./controller/RegisterController');
const loginController = require('./controller/LoginController');
const PageController = require('./controller/PageController');
const verify = require('./controller/VerifyToken');

router.get('/post', verify, PageController.view);
router.post('/register', registerController.register);
router.post('/login', loginController.login);

module.exports = router;