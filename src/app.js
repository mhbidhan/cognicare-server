const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(
  express.json({
    limit: '10mb',
  })
);

// Routers
app.get('/', (req, res) => res.send('Cognicare'));

module.exports = app;
