const PLAYERS_TABLE = 'players';
const MATCHES_TABLE = 'matches';
const SCORES_TABLE = 'scores';

const PLAYERS_DATA_SAMPLE = [
  { id: 1, name: 'Alexandre B.' },
  { id: 2, name: 'Victor C.' },
  { id: 3, name: 'Melissa C.' },
  { id: 4, name: 'Xavier B.' },
  { id: 5, name: 'Francois-Xavier B.' },
  { id: 6, name: 'Clement T.' },
  { id: 7, name: 'Tristan B.' },
  { id: 8, name: 'Krystel R.' },
  { id: 9, name: 'Dany D.' },
  { id: 10, name: 'Mary M.' },
  { id: 11, name: 'Stephanie S.' },
  { id: 12, name: 'Sarah H.' },
  { id: 13, name: 'Alexandra P.' },
  { id: 14, name: 'Cindy B.' },
  { id: 15, name: 'Lily R.' },
];
const MATCHES_DATA_SAMPLE = [
  { id: 1, created_at: '2021-10-21 13:01:26', date: '2021-10-21' },
  { id: 2, created_at: '2021-10-21 13:01:26', date: '2021-10-21' },
];
const SCORES_DATA_SAMPLE = [
  {
    id: 1,
    player_id: 1,
    goals_for: 5,
    goals_against: 3,
    is_winner: true,
    match_id: 1,
    opponent_id: 2,
  },
  {
    id: 2,
    player_id: 2,
    goals_for: 3,
    goals_against: 5,
    is_winner: false,
    match_id: 1,
    opponent_id: 1,
  },
  {
    id: 3,
    player_id: 1,
    goals_for: 3,
    goals_against: 5,
    is_winner: false,
    match_id: 2,
    opponent_id: 3,
  },
  {
    id: 4,
    player_id: 3,
    goals_for: 5,
    goals_against: 3,
    is_winner: true,
    match_id: 2,
    opponent_id: 1,
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(PLAYERS_TABLE, (t) => {
    t.increments('id').primary();
    t.string('name');
  });
  await knex.schema.createTable(MATCHES_TABLE, (t) => {
    t.increments('id').primary();
    t.timestamp('created_at');
    t.date('date');
  });
  await knex.schema.createTable(SCORES_TABLE, (t) => {
    t.increments('id').primary();
    t.integer('player_id').notNullable();
    t.integer('goals_for').notNullable();
    t.integer('goals_against').notNullable();
    t.boolean('is_winner').notNullable();
    t.integer('match_id').notNullable();
    t.integer('opponent_id').notNullable();
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
