const jwt = require('jsonwebtoken');

async function userLogOut(req, res) {
  try {
    const userId = req.body.id;
    let storedData = req.store.sessions;
    let userDetails;

    for (const sessionID in storedData) {
      const sessionData = JSON.parse(storedData[sessionID]);

      if (sessionData[userId]) {
        userDetails = sessionData[userId];
        if (userDetails.userId === userId) {
          console.log(req.session[userId],'logouttttttttttttttttttt')
          delete req.session[userId];
        }
        break;
      }
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = userLogOut;