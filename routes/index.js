const express = require('express');
const router = express.Router();

const UserRoutes=require('./userRoutes');
const AdminRoutes=require('./adminRoutes');
const JwtDecode=require('../controllers/jwtDecode');
const Login = require('../controllers/login');


const SignUp = require('../controllers/signUp');



router.post('/signUp', SignUp);
router.post('/login', Login);
router.use('/admin',AdminRoutes);
router.use(JwtDecode);
router.use('/user',UserRoutes);








module.exports = router;