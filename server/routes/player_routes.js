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

// GET /api/players/stats
router.get('/stats', async (req, res) => {
  try {
    const playerMatchStats = db('players AS p')
      .select('p.id AS player_id')
      .countDistinct({ total_matches: 'm.id' })
      .sum({ total_goals_for: 's.goals_for' })
      .sum({ total_goals_against: 's.goals_against' })
      .count({ wins: db.raw('CASE WHEN s.is_winner THEN 1 END') })
      .count({ losses: db.raw('CASE WHEN NOT s.is_winner THEN 1 END') })
      .leftJoin('scores AS s', 'p.id', 's.player_id')
      .leftJoin('matches AS m', 's.match_id', 'm.id')
      .groupBy('p.id')
      .as('pms');

    const allPlayerStats = await db('players AS p')
      .select(
        'p.id AS player_id',
        'p.name',
        'pms.total_matches',
        'pms.total_goals_for',
        'pms.total_goals_against',
        'pms.wins',
        'pms.losses',
        db.raw(
          'CASE WHEN pms.total_matches > 0 THEN pms.wins::numeric / pms.total_matches ELSE 0 END AS win_ratio'
        ),
        db.raw(
          'pms.total_goals_for - pms.total_goals_against AS goals_difference'
        )
      )
      .leftJoin(playerMatchStats, 'p.id', 'pms.player_id')
      .where('pms.total_matches', '>', 0)
      .orderBy('win_ratio', 'desc')
      .orderBy('goals_difference', 'desc');

    res.status(200).json(allPlayerStats);
  } catch (error) {
    console.error('Error retrieving players data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
