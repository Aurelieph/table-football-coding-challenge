const router = require('express').Router();
const db = require('../db');
const { getPlayerStats } = require('../services/playerServices');

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

// GET /api/players/stats
router.get('/stats', async (req, res) => {
  try {
    const [overallPlayerStats, individualPlayerStats, teamPlayerStats] =
      await Promise.all([
        getPlayerStats(),
        getPlayerStats(false),
        getPlayerStats(true),
      ]);
    res.status(200).json({
      overall: overallPlayerStats,
      individual: individualPlayerStats,
      team: teamPlayerStats,
    });
  } catch (error) {
    console.error('Error retrieving players data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
