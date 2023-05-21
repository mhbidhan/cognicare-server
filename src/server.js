const http = require('http');
const app = require('./app');
const { PORT } = require('./config');
const { connectWithDatabase } = require('./db');
const cron = require('node-cron');
const { Server } = require('socket.io');
const sendTaskNotificationToPatient = require('./utils/patient-notification');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const connectedUsers = {};

io.on('connection', (socket) => {
  const { userId } = socket.handshake.query;
  connectedUsers[userId] = socket.id;

  console.log('user connected', socket.id);

  socket.once('disconnect', () => delete connectedUsers[userId]);
});

async function startServer() {
  cron.schedule('*/1 * * * *', async () => {
    const users = Object.keys(connectedUsers);

    if (users.length) {
      sendTaskNotificationToPatient(connectedUsers, io);
    }
  });

  await connectWithDatabase();
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

startServer();
