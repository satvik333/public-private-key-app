const jwt = require('jsonwebtoken');

async function userLogOut(req, res) {
  try {
    const userId = req.body.id;
    let storedData = req.store.sessions;

    for (const sessionID in storedData) {
      let sessionData = JSON.parse(storedData[sessionID]);

      if (sessionData[userId]) {
        delete storedData[sessionID];
        
        // Destroy the entire session data associated with the session ID
        req.store.destroy(sessionID);
        break;
      }
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = userLogOut;