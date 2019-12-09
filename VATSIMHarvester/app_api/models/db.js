const mongoose = require('mongoose');
const dbURL = process.env.MONGODB_ATLAS_URL;
const readLine = require('readline');

const connect = () => {

  const connectionOptions = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };
  setTimeout(() => mongoose.connect('mongodb+srv://bngerlich:EZ9F8WbOVJWPYxJE@cluster0-yrfse.mongodb.net/final?retryWrites=true&w=majority', connectionOptions)
                           .catch(err => console.log(err)), 1000);
}

mongoose.connection.on('connected', () => {
  console.log('connected');
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit("SIGINT");
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

connect();

require('./weather');