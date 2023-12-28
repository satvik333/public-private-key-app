const nodemailer = require('nodemailer');

// Create a transporter using SMTP credentials
function emailSender(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'satvik.km@kapturecrm.com',
      pass: 'Naanu@3333',
    },
  });

  // Email options
  const mailOptions = {
    from: 'satvik.km@kapturecrm.com',
    to: email,
    subject: 'OTP for Kapture Selfserve-API-Configuration',
    text: `Hi, use ${otp} this OTP for login into the Kapture Selfserve-API-Configuration.`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error.message);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = emailSender;

