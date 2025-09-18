const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.post('/signup/request-otp', auth.requestSignupOTP);
router.post('/signup/verify-otp', auth.verifySignupOTP);

router.post('/login/request-otp', auth.requestLoginOTP);
router.post('/login/verify-otp', auth.verifyLoginOTP);

router.post('/forgot-password/request-otp', auth.requestForgotPasswordOTP);
router.post('/forgot-password/reset', auth.resetPasswordWithOTP);

module.exports = router;
