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

// POST /api/matches
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
