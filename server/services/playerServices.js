const db = require('../db');

const getPlayerStats = (isTeam) => {
  const playerStats = db
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
    .from(function () {
      this.select('p.id AS player_id', ' s.is_team')
        .countDistinct({ total_matches: 'm.id' })
        .sum({ total_goals_for: 's.goals_for' })
        .sum({ total_goals_against: 's.goals_against' })
        .count({ wins: db.raw('CASE WHEN s.is_winner THEN 1 END') })
        .count({ losses: db.raw('CASE WHEN NOT s.is_winner THEN 1 END') })
        .from('players AS p')
        .leftJoin('scores AS s', 'p.id', 's.player_id')
        .leftJoin('matches AS m', 's.match_id', 'm.id')
        .groupBy('p.id', 's.is_team')
        .as('pms');
    })
    .leftJoin('players AS p', 'p.id', 'pms.player_id')
    .where('pms.total_matches', '>', 0);

  if (isTeam === true) {
    playerStats.andWhere('pms.is_team', true);
  } else if (isTeam === false) {
    playerStats.andWhere('pms.is_team', false);
  }

  return playerStats
    .orderBy('win_ratio', 'desc')
    .orderBy('goals_difference', 'desc');
};
module.exports = { getPlayerStats };
