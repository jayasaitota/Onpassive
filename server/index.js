process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 
process.env.SERVER_PORT = process.env.SERVER_PORT || '4001';
process.env.MONGO_URL = 'mongodb://localhost/onPassive';

process
.on('uncaughtException',(err,origin = '')=>{
  console.log(`${err} UnCaught Exception Occured : ${origin}`)
})
.on('unhandledRejection', (err,origin='') => {
  console.log(`${err} Unhandled Rejection Occured : ${origin}`)
})

require('babel-polyfill');
require('babel-register');
require('./server');