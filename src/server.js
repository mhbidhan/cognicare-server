const http = require('http');
const app = require('./app');
const { PORT } = require('./config');
const { connectWithDatabase } = require('./db');

const server = http.createServer(app);

async function startServer() {
  await connectWithDatabase();
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

startServer();
