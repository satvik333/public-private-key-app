const express = require('express');
const router = express.Router();
const cors = require('cors');
const userLogin = require('../controllers/loginController');
const getPrivateKeys = require('../controllers/fetchPrivateKeysController');
const authenticateToken = require('../controllers/jwtAuthController');
const verifyEmailAndSendOtp = require('../controllers/emailVerificationAndOtpController')

router.use(cors());
router.use(express.json());

router.post('/get-keys', authenticateToken, async (req, res) => { //pass authenticateToken as a middleware whenever authentication is required.
  return await getPrivateKeys(req, res);
});

router.post('/login', async (req, res) => {
  return await userLogin(req, res);
});

router.post('/verify-email', async (req, res) => {
  return await verifyEmailAndSendOtp(req, res);
});

module.exports = router;
