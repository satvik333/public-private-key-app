const jwt = require('jsonwebtoken');
const configParams = require('../configuration');
const connection = require('../databaseConnection');

async function userLogin(req, res) {
  try {
    const otp = req.body.otp;
    let storedData = req.store.sessions;
    let userId = req.body.user.id;
    let user = req.body.user;
    let userDetails;
    let sessionOTP;

    for (const sessionID in storedData) {
      const sessionData = JSON.parse(storedData[sessionID]);

      // Check if the session data contains userDetails
      if (sessionData.userDetails) {
        userDetails = sessionData.userDetails;
        if (userDetails.userId === userId) sessionOTP = userDetails.verifiedOTP;
        break; 
      }
    }

    if (otp === sessionOTP) {
      const token = jwt.sign({
        userId: user._id,
        email: user.email
      }, configParams.jwtSecret, {
        expiresIn: '1h',
      });

      return res.send({
        message: 'LoggedIn Successful',
        user,
        token
      });
    } else {
      res.json({ error: 'Invalid otp' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = userLogin;