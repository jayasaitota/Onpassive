
require ('./config/mongoose');

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';

import {removeAndUpdateBodyFields} from './utils/service.utils'

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json({type:"application/json"}))
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// remove unwanted req.body fields
app.use(removeAndUpdateBodyFields);

app.use('/api',routes);

app.get('', (req, res) => {
  return res.send("Server is up and running")
});

const server = app.listen(SERVER_PORT,()=>{
  console.log(`Server Started and running on port  ${SERVER_PORT}`)
})

export default server;