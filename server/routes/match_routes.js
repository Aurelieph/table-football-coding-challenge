const router = require('express').Router();
const db = require('../db');

// GET /api/matches
router.get('/', async (req, res) => {
  try {
    const data = await db('matches').select('*');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving matches data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
