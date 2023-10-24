require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const api = require('./routes/routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Table Football API',
      description: 'API for tracking and scoring table football matches',
      version: '1.0.0',
    },
  },
  apis: [
    './routes/player_routes.js',
    './routes/score_routes.js',
    './routes/match_routes.js',
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', api);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
