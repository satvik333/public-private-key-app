//use this function whenever authentication is required while using the routes.
const jwt = require('jsonwebtoken');
const configParams = require('../configuration');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];
  console.log(token,'tknnnnnnnnnnnnnnnnnnn')
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, configParams.jwtSecret, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}

module.exports = authenticateToken;