const router = require('express').Router();
const db = require('../db');

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         ids:
 *           type: array
 *           example: []
 *         score:
 *           type: integer
 *         is_team:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * /api/matches:
 *   post:
 *     description: Create multiple matches and add scores for them
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matches:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date
 *                     team1:
 *                       $ref: '#/components/schemas/Team'
 *                     team2:
 *                       $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *         description: Matches created successfully
 *       400:
 *         description: No players selected in one of the team
 *       500:
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
  const { matches } = req.body;
  try {
    const players = [];
    await db.transaction(async (trx) => {
      for (const match of matches) {
        const newMatchID = (
          await trx('matches').insert({ date: match.date }).returning('id')
        )[0];

        for (const team of [match.team1, match.team2]) {
          team.ids.forEach((id) => {
            const data = {
              player_id: id,
              goals_for: team.score,
              goals_against:
                team === match.team1 ? match.team2.score : match.team1.score,
              is_winner:
                team.score >
                (team === match.team1 ? match.team2.score : match.team1.score),
              match_id: newMatchID.id,
              team_no: team === match.team1 ? 1 : 2,
              is_team: team.is_team,
            };
            players.push(data);
          });
        }
      }
    });
    await db('scores').insert(players);

    res.status(201).json({ message: 'Matches created successfully' });
  } catch (error) {
    console.error('Error adding scores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
