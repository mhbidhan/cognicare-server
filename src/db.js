const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

mongoose.connection
  .on('open', () => console.log('Conneced with database'))
  .on('error', (error) => {
    console.log(error);
  });

async function connectWithDatabase(database = 'development') {
  const uri = MONGO_URI + database + '?retryWrites=true&w=majority';

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectWithDatabase,
  disconnectFromDatabase,
};
