//use this function whenever authentication is required while using the routes.
const jwt = require('jsonwebtoken');
const configParams = require('../configuration');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  console.log(token,'tknnnnnnnnn',authHeader)

  jwt.verify(token, configParams.jwtSecret, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.json({ error: 'Token Expiered' });;
    }
    req.user = user;
    next();
  })
}

module.exports = authenticateToken;