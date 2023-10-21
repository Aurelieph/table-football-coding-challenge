const express = require('express');
const router = express.Router();

const playersRoutes = require('./player_routes');
// const scoresRoutes = require('./score_routes');
// const matchesRoutes = require('./match_routes');

router.use('/players', playersRoutes);
// app.use('/api/scores', scoresRoutes);
// app.use('/api/matches', matchesRoutes);

module.exports = router;
