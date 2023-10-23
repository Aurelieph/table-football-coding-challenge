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
    matches.forEach(async (match) => {
      const newMatchID = await db('matches')
        .insert({ date: match.date })
        .returning('id');
      match.team1.ids.forEach(async (id) => {
        const data = {
          player_id: id,
          goals_for: match.team1.score,
          goals_against: match.team2.score,
          is_winner: match.team1.score > match.team2.score,
          match_id: newMatchID[0].id,
          team_no: 1,
          is_team: match.team1.is_team,
        };
        players.push(data);
      });
      match.team2.ids.forEach(async (id) => {
        const data = {
          player_id: id,
          goals_for: match.team2.score,
          goals_against: match.team1.score,
          is_winner: match.team2.score > match.team1.score,
          match_id: newMatchID[0].id,
          team_no: 2,
          is_team: match.team2.is_team,
        };
        players.push(data);
      });
    });
    const data = await db('scores').insert(players).returning('*');
    res.status(201).json(data);
  } catch (error) {
    console.error('Error adding scores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
