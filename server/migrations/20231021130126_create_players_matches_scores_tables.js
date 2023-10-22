const PLAYERS_TABLE = 'players';
const MATCHES_TABLE = 'matches';
const SCORES_TABLE = 'scores';

const PLAYERS_DATA_SAMPLE = [
  { name: 'Alexandra P.' },
  { name: 'Alexandre B.' },
  { name: 'Albain D.' },
  { name: 'Andrea M.' },
  { name: 'Adrien J.' },
  { name: 'Axel K.' },
  { name: 'Cindy B.' },
  { name: 'Clement T.' },
  { name: 'Colin B.' },
  { name: 'Dany D.' },
  { name: 'Francois-Xavier B.' },
  { name: 'Ian K.' },
  { name: 'Krystel R.' },
  { name: 'Lily R.' },
  { name: 'Melissa C.' },
  { name: 'Mary M.' },
  { name: 'Maxence F.' },
  { name: 'Nicolas S.' },
  { name: 'Stephanie S.' },
  { name: 'Sarah H.' },
  { name: 'Tristan B.' },
  { name: 'Thiebaud M.' },
  { name: 'Xavier B.' },
  { name: 'Victor C.' },
  { name: 'Vlad M.' },
  { name: 'Vincenzo M.' },
  { name: 'Yoan M.' },
];
const MATCHES_DATA_SAMPLE = [
  { created_at: '2021-10-21 13:01:26', date: '2021-10-21' },
  { created_at: '2021-10-21 13:01:26', date: '2021-10-21' },
];
const SCORES_DATA_SAMPLE = [
  {
    player_id: 1,
    goals_for: 5,
    goals_against: 3,
    is_winner: true,
    match_id: 1,
    team_no: 2,
    is_team: false,
  },
  {
    player_id: 2,
    goals_for: 3,
    goals_against: 5,
    is_winner: false,
    match_id: 1,
    team_no: 1,
    is_team: false,
  },
  {
    player_id: 1,
    goals_for: 3,
    goals_against: 5,
    is_winner: false,
    match_id: 2,
    team_no: 2,
    is_team: false,
  },
  {
    player_id: 3,
    goals_for: 5,
    goals_against: 3,
    is_winner: true,
    match_id: 2,
    team_no: 1,
    is_team: false,
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(PLAYERS_TABLE, (t) => {
    t.bigIncrements('id').primary();
    t.string('name');
  });
  await knex.schema.createTable(MATCHES_TABLE, (t) => {
    t.bigIncrements('id').primary();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.date('date').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable(SCORES_TABLE, (t) => {
    t.bigIncrements('id').primary();
    t.integer('player_id').notNullable();
    t.integer('goals_for').notNullable().unsigned();
    t.integer('goals_against').notNullable().unsigned();
    t.boolean('is_winner').notNullable();
    t.integer('match_id').notNullable();
    t.integer('team_no').notNullable();
    t.boolean('is_team').notNullable();
  });

  await knex(PLAYERS_TABLE).insert(PLAYERS_DATA_SAMPLE);
  await knex(MATCHES_TABLE).insert(MATCHES_DATA_SAMPLE);
  await knex(SCORES_TABLE).insert(SCORES_DATA_SAMPLE);
  return;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists(SCORES_TABLE)
    .dropTableIfExists(MATCHES_TABLE)
    .dropTableIfExists(PLAYERS_TABLE);
};
