const express = require('express');

const router = express.Router();

const check = require('../middleware/CurrentUser')

const {
    register,
    Login,
    Applicant
} = require('../controller/Signup');


router.post('/register', register);
router.post('/login', Login);
router.get('/curentUser', Applicant);

module.exports = router;