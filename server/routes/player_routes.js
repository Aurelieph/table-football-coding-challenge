const router = require('express').Router();
const db = require('../db');

// GET /api/players
router.get('/', async (req, res) => {
  try {
    const data = await db('players').select('*');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving players data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
