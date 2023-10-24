const router = require('express').Router();
const db = require('../db');
const { getPlayerStats } = require('../services/playerServices');

/***
 * @swagger
 * /api/players:
 *   get:
 *     description: Get all players
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            example:
 *              id: 1
 *              name: John Doe
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  try {
    const data = await db('players').select('*');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving players data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/***
 * @swagger
 * /api/players/stats:
 *  get:
 *    description: Get all players stats by type of match (overall, individual, team)
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            example:
*               overall:
*                 - player_id: 1
*                   name: John Doe
*                   total_matches: 1
*                   total_goals_for: 10
*                   total_goals_against: 5
*                   wins: 1
*                   losses: 0
*                   win_ratio: 1.00
*                   goals_difference: 5

 *      500:
 *       description: Internal server error
 */
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
