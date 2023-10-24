const router = require('express').Router();
const db = require('../db');

/**
 * @swagger
 * /api/scores:
 *   post:
 *     description: Create a new match and add scores for it
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team1:
 *                 $ref: '#/components/schemas/Team'
 *               team2:
 *                 $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *          description: Scores added successfully
 *       400:
 *          description: No players selected
 *       500:
 *          description: Internal server error
 */

router.post('/', async (req, res) => {
  const { team1, team2 } = req.body;
  try {
    const players = [];
    const newMatchID = await db('matches').insert({}).returning('id');

    if (team1.ids.length === 0 || team2.ids.length === 0) {
      return res.status(400).json({ error: 'No players selected' });
    }

    team1.ids.forEach(async (id) => {
      const data = {
        player_id: id,
        goals_for: team1.score,
        goals_against: team2.score,
        is_winner: team1.score > team2.score,
        match_id: newMatchID[0].id,
        team_no: 1,
        is_team: team2.is_team,
      };
      players.push(data);
    });
    team2.ids.forEach(async (id) => {
      const data = {
        player_id: id,
        goals_for: team2.score,
        goals_against: team1.score,
        is_winner: team2.score > team1.score,
        match_id: newMatchID[0].id,
        team_no: 2,
        is_team: team2.is_team,
      };
      players.push(data);
    });
    const data = await db('scores').insert(players).returning('id');
    res.status(201).json(data);
  } catch (error) {
    console.error('Error adding scores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
