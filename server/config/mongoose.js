import mongoose from 'mongoose';

// make bluebird default Promise
Promise = require('bluebird'); 

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;


// connect to mongo db
const mongoUri = process.env.MONGO_URL;
mongoose.connect(mongoUri,{ useNewUrlParser: true,useUnifiedTopology: true });

mongoose.connection.on('error', () => {
  console.log(`unable to connect to database: ${mongoUri}`);
});

mongoose.connection.on('connected', () => {
  console.log(`connected to mongodb database: ${mongoUri}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(`connection disconnected database: ${mongoUri}`);
});

