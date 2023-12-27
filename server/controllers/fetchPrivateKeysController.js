const connection = require('../databaseConnection');

async function getPrivateKeys(req, res) {
  try {
    const publicKey = req.query.publicKey;
    console.log('Public Key:', publicKey);
    const [results] = await connection.execute('SELECT private_key FROM public_private_keys WHERE public_key = ?', [publicKey]);
    let privateKey = results[0];
    if (privateKey) res.status(200).json(privateKey);
    else res.json({ message: 'No Private key found for this Public Key' });
  } catch (error) {
    console.error('Error fetching private key:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = getPrivateKeys;