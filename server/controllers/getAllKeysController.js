const connection = require('../databaseConnection');

async function getAllKeys(req, res) {
  try {
    const [results] = await connection.execute('SELECT * FROM public_private_keys');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching keys', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = getAllKeys;