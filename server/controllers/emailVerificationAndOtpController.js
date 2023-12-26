const connection = require('../databaseConnection');
const emailSender = require('./emailController');

async function verifyEmailAndSendOtp(req, res) {
  try {
    const email = req.body.email;
    // Define the regex pattern to find the email should end with either '@kapturecx.com' or '@kapturecrm.com'.
    const emailRegex = /^[\w-]+(\.[\w-]+)*@kapture(cx|crm)\.com$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      res.status(401).json({ error: 'Invalid email address. Please use an email ending with @kapturecx.com or @kapturecrm.com' });
    }
    
    const [results] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = results[0];

    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      req.session.userDetails = {
        verifiedOTP: otp,
        userId: user.id
      };

      emailSender(email, otp);
      return res.send({message: 'OTP sent successfully', user});
    } else {
      res.status(401).json({ error: 'Invalid user email' });
    }
  } catch (error) {
    console.error('Error during email verification', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = verifyEmailAndSendOtp;
